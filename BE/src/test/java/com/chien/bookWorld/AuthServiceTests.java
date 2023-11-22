package com.chien.bookWorld;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;

import com.chien.bookWorld.payload.request.LoginRequest;
import com.chien.bookWorld.repository.UserRepository;
import com.chien.bookWorld.service.AuthService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
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
  @Sql(scripts = "classpath:login_data.sql")
  public void testCount() {
    Long code = authService.authenticateUser(new LoginRequest("chien9pm@gmail.com", "12345678"))
        .getCode();
    Long expect = 0L;
    Assert.assertEquals(expect, code
    );
  }
}
