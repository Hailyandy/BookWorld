package com.chien.bookWorld;

import com.chien.bookWorld.entity.ERole;
import com.chien.bookWorld.entity.Role;
import com.chien.bookWorld.entity.User;
import com.chien.bookWorld.payload.request.LoginRequest;
import com.chien.bookWorld.repository.UserRepository;
import com.chien.bookWorld.service.AuthService;
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
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AuthServiceTest {

  @MockBean
  UserRepository userRepository;

  @Autowired
  private AuthService authService;

  @Before
  public void setUp() {
    User user = new User("chien9pm@gmail.com",
        "$2a$10$ARkmaPdM6EPc8EDqXcG5o.sUewbeUlNrrW0/vCdMcHrvE7EjIK/o6");
    user.setEnabled(true);
    Set<Role> roles = new HashSet<>();
    Role role = new Role();
    role.setId(1L);
    role.setName(ERole.ROLE_USER);
    roles.add(role);
    user.setRoles(roles);
    Mockito.when(userRepository.findByUsername("chien9pm@gmail.com"))
        .thenReturn(Optional.of(user));
  }

  @Test
  public void testCount() {
    Long code = authService.authenticateUser(new LoginRequest("chien9pm@gmail.com", "12345678"))
        .getCode();
    Long expect = 0L;
    Assert.assertEquals(expect, code
    );
  }
}
