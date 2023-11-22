package com.chien.bookWorld;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.chien.bookWorld.entity.ERole;
import com.chien.bookWorld.entity.Role;
import com.chien.bookWorld.entity.User;
import com.chien.bookWorld.entity.UserDetailsImpl;
import com.chien.bookWorld.jwt.JwtUtils;
import com.chien.bookWorld.payload.request.LoginRequest;
import com.chien.bookWorld.repository.RoleRepository;
import com.chien.bookWorld.repository.UserRepository;
import com.chien.bookWorld.service.AuthService;
import com.chien.bookWorld.service.EmailService;
import com.chien.bookWorld.service.impl.AuthServiceImpl;
import com.chien.bookWorld.service.impl.UserServiceImpl;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AuthServiceTest {

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
  @Sql(scripts = "classpath:login_data.sql")
  public void testCount() {
    Long code = authService.authenticateUser(new LoginRequest("chien9pm@gmail.com", "12345678"))
        .getCode();
    Long expect = 0L;
    Assert.assertEquals(expect, code
    );
  }
}
