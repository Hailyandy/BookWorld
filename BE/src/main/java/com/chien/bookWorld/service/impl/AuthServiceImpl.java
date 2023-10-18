package com.chien.bookWorld.service.impl;

import com.chien.bookWorld.dto.OTPDto;
import com.chien.bookWorld.dto.OTPVerificationDto;
import com.chien.bookWorld.entity.ERole;
import com.chien.bookWorld.entity.Role;
import com.chien.bookWorld.entity.User;
import com.chien.bookWorld.entity.UserDetailsImpl;
import com.chien.bookWorld.exception.AppException;
import com.chien.bookWorld.jwt.JwtUtils;
import com.chien.bookWorld.payload.request.LoginRequest;
import com.chien.bookWorld.payload.request.SignupRequest;
import com.chien.bookWorld.payload.response.JwtResponse;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.repository.RoleRepository;
import com.chien.bookWorld.repository.UserRepository;
import com.chien.bookWorld.service.AuthService;
import com.chien.bookWorld.service.EmailService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

  @Autowired
  private UserRepository userRepository;
  @Autowired
  private AuthenticationManager authenticationManager;
  @Autowired
  private JwtUtils jwtUtils;
  @Autowired
  private PasswordEncoder encoder;
  @Autowired
  private RoleRepository roleRepository;
  @Autowired
  private EmailService emailService;
  @Value("${app.jwtSecret}")
  private String jwtSecret;


  @Override
  public SuccessResponse authenticateUser(LoginRequest loginRequest) {
    User fromDB = userRepository.findByUsername(loginRequest.getUsername()).orElse(null);
    if (fromDB == null) {
      throw new AppException(404, 44,
          "Lỗi: Không tồn tại! Không tìm thấy tài khoản có tên '" + loginRequest.getUsername()
              + "'!");
    } else if (!fromDB.getEnabled()) {
      throw new AppException(403, 43,
          "Tài khoản của bạn chưa được quản trị viên phê duyệt, vui lòng đợi!");
    }

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
            loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    List<Map<String, Object>> roles = userDetails.getAuthorities().stream()
        .map(grantedAuthority -> {
          final Map<String, Object> body = new HashMap<>();
          body.put("name", grantedAuthority.getAuthority());
          return body;
        })
        .collect(Collectors.toList());
    return new SuccessResponse(new JwtResponse(jwt,
        userDetails.getId(),
        userDetails.getUsername(),
        roles));
  }

  @Override
  public Map<String, Object> registerUser(SignupRequest signUpRequest) {
    if (userRepository.findByUsername(signUpRequest.getUsername()).isPresent()) {
      throw new AppException(400, 40, "Lỗi: Email này đã được đăng ký trước đó!");
    }

    User user = new User(signUpRequest.getUsername(),
        encoder.encode(signUpRequest.getPassword()));

    Set<String> strRoles = signUpRequest.getRole();
    Set<Role> roles = new HashSet<>();

    if (strRoles == null) {
      Role userRole = roleRepository.findByName(ERole.ROLE_USER)
          .orElseThrow(() -> new RuntimeException("Lỗi: Không tìm thấy vai trò người dùng!"));
      roles.add(userRole);
    } else {
      strRoles.forEach(role -> {
        if ("author".equals(role)) {
          Role libRole = roleRepository.findByName(ERole.ROLE_AUTHOR)
              .orElseThrow(() -> new RuntimeException("Lỗi: Không tìm thấy vai trò tác giả!"));
          roles.add(libRole);
        } else if ("admin".equals(role)) {
          Role userRole = roleRepository.findByName(ERole.ROLE_ADMIN)
              .orElseThrow(
                  () -> new RuntimeException("Lỗi: Không tìm thấy vai trò quản trị viên!"));
          roles.add(userRole);
        } else {
          Role userRole = roleRepository.findByName(ERole.ROLE_USER)
              .orElseThrow(() -> new RuntimeException("Lỗi: Không tìm thấy vai trò người dùng!"));
          roles.add(userRole);
        }
      });
    }

    user.setRoles(roles);
    userRepository.save(user);

    return sendOTP(new OTPDto(signUpRequest.getUsername()));
  }

  @Override
  public Map<String, Object> sendOTP(OTPDto otpDto) {
    int code = (int) Math.floor(((Math.random() * 899999) + 100000));
    String jwt = Jwts.builder()
        .setSubject(String.valueOf(code))
        .setIssuedAt(new Date())
        .setExpiration(new Date((new Date()).getTime() + 60000))
        .signWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret)), SignatureAlgorithm.HS256)
        .compact();

    Integer rowCount = userRepository.updateVerificationCodeByUserName(otpDto.getUsername(), jwt);
    if (rowCount == 0) {
      throw new AppException(404, 44,
          "Không tìm thấy tài khoản với username '" + otpDto.getUsername() + "'!");
    }

    emailService.sendEmail(otpDto.getUsername(), "Xác minh tài khoản Book World của bạn",
        "Mã của bạn: " + String.valueOf(code));

    final Map<String, Object> body = new HashMap<>();
    body.put("code", 0);
    body.put("message", "Hãy kiểm tra mã trong mail '" + otpDto.getUsername() + "'!");
    return body;
  }

  @Override
  public Map<String, Object> otpVerification(OTPVerificationDto otpVerificationDto) {
    User user = userRepository.findByUsername(otpVerificationDto.getUsername())
        .orElseThrow(() -> new AppException(404, 44,
            "Không tìm thấy tài khoản với username '" + otpVerificationDto.getUsername() + "'!"));
    if (user.getVerificationCode() != null && jwtUtils.validateJwtToken(
        user.getVerificationCode())) {
      String otpDb = jwtUtils.getUserNameFromJwtToken(user.getVerificationCode());
      if (otpDb.equals(otpVerificationDto.getOtp())) {
        user.setVerificationCode("Verified");
        if (user.getRoles().size() == 1 && ((Role) user.getRoles().toArray()[0]).getName()
            .equals(ERole.ROLE_USER)) {
          user.setEnabled(true);
        }
        userRepository.save(user);
        final Map<String, Object> body = new HashMap<>();
        body.put("code", 0);
        body.put("message", user.getEnabled() ? "Tài khoản đã được đăng ký thành công!"
            : "Tài khoản đã được đăng ký thành công! Vui lòng đợi quản trị viên phê duyệt tài khoản của bạn!");
        return body;
      } else {
        throw new AppException(400, 40,
            "Mã OTP không phải là '" + otpVerificationDto.getOtp() + "'!");
      }
    }
    throw new AppException(400, 40,
        "OTP '" + otpVerificationDto.getOtp()
            + "' của bạn đã hết hạn hoặc không tồn tại! Vui lòng tạo lại OTP!");
  }
}
