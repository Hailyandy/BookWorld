package com.chien.bookWorld;

import com.chien.bookWorld.exception.AppException;
import com.chien.bookWorld.payload.request.LoginRequest;
import com.chien.bookWorld.repository.UserRepository;
import com.chien.bookWorld.service.AuthService;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
class AuthServiceTests {

  //  @TestConfiguration
//  public static class AuthServiceTestConfiguration{
//    @Bean
//    AuthService authService(){
//      return new AuthServiceImpl();
//    }
//  }
//
  @Autowired
  UserRepository userRepository;
  //  @MockBean
//  RoleRepository roleRepository;
//
////  @MockBean
////  AuthenticationManager authenticationManager;
//  @Autowired
//  private AuthenticationManager authenticationManager;
//  @MockBean
//  JwtUtils jwtUtils;
//  @MockBean
//  PasswordEncoder encoder;
//  @MockBean
//  EmailService emailService;
//  @MockBean
//  UserServiceImpl userService;
  @Autowired
  private AuthService authService;

  @Before
  public void setUp() {
//    User user = new User("chien9pm@gmail.com",
//        "$2a$10$ARkmaPdM6EPc8EDqXcG5o.sUewbeUlNrrW0/vCdMcHrvE7EjIK/o6");
//    user.setEnabled(true);
//    Set<Role> roles = new HashSet<>();
//    Role role = new Role();
//    role.setId(1L);
//    role.setName(ERole.ROLE_USER);
//    roles.add(role);
//    user.setRoles(roles);

//    when(userRepository.findByUsername("chien9pm@gmail.com"))
//        .thenReturn(user);
//    Authentication authentication = mock(Authentication.class);
//    authentication.setAuthenticated(true);
//    when(authentication.isAuthenticated()).thenReturn(true);

//    when(authenticationManager.authenticate(any())).thenReturn(authentication);
//    when(authentication.getPrincipal()).thenReturn(
//        UserDetailsImpl.build(user));
  }

  @Test
  public void testLoginUsernameNotFound() {
    Exception exception = Assert.assertThrows(AppException.class, () -> {
      authService.authenticateUser(new LoginRequest("chien5pm@gmail.com", "12345678"));
    });

    String expectedMessage = "Lỗi: Không tồn tại! Không tìm thấy tài khoản có tên '";
    String actualMessage = exception.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }

  @Test
  public void testLoginNotEnabled() {
    Exception exception = Assert.assertThrows(AppException.class, () -> {
      authService.authenticateUser(new LoginRequest("chien9pmt@gmail.com", "12345678"));
    });

    String expectedMessage = "Tài khoản của bạn chưa được quản trị viên phê duyệt, vui lòng đợi!";
    String actualMessage = exception.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }

  @Test
  public void testLoginIncorrectPassword() {
    Exception exception = Assert.assertThrows(BadCredentialsException.class, () -> {
      authService.authenticateUser(new LoginRequest("chien9pm@gmail.com", "123456789"));
    });

    String expectedMessage = "Bad credentials";
    String actualMessage = exception.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }

  @Test
//  @Sql(scripts = "classpath:login_data.sql")
  public void testLoginSuccess() {
    Long code = authService.authenticateUser(new LoginRequest("chien9pm@gmail.com", "12345678"))
        .getCode();
    Long expect = 0L;
    Assert.assertEquals(expect, code
    );
  }
  @After
  @Sql(scripts = "classpath:drop.sql")
  public void drop() {
    System.out.println("dropped");
  }
}
