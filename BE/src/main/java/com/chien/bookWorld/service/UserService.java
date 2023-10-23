package com.chien.bookWorld.service;

import com.chien.bookWorld.dto.UserCreationDto;
import com.chien.bookWorld.dto.UserDto;
import com.chien.bookWorld.dto.UserUpdateDto;
import com.chien.bookWorld.payload.response.SuccessResponse;
import java.util.Collection;
import java.util.Map;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends
    GeneralService<UserDto, UserCreationDto, UserUpdateDto>,
    UserDetailsService {
  SuccessResponse findByName(String name);

  SuccessResponse findByPhone(String phone);

  SuccessResponse findByEnabled(Boolean enabled);

  Map<String, Object> acceptAccount(Collection<Long> ids);

  Map<String, Object> rejectAccount(Collection<Long> ids);

  SuccessResponse findByUsersByName(String name);
}
