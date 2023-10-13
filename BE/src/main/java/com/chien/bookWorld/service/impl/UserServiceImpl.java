package com.chien.bookWorld.service.impl;

import com.chien.bookWorld.dto.UserCreationDto;
import com.chien.bookWorld.dto.UserDto;
import com.chien.bookWorld.dto.UserUpdateDto;
import com.chien.bookWorld.entity.User;
import com.chien.bookWorld.entity.UserDetailsImpl;
import com.chien.bookWorld.exception.AppException;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.repository.UserRepository;
import com.chien.bookWorld.service.UserService;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserRepository userRepository;
  @Autowired
  private ModelMapper mapper;

  @Override
  public UserDto create(UserCreationDto userCreationDto) {
    return mapper.map(userRepository.save(mapper.map(userCreationDto, User.class)),
        UserDto.class);
  }

  @Override
  public SuccessResponse findById(Long id) {
    User user = userRepository.findById(id).orElse(null);
    if (user == null) {
      throw new AppException(404, 44, "Error: Does not exist! User not found!");
    } else {
      return new SuccessResponse(mapper.map(user, UserDto.class));
    }
  }

  @Override
  public SuccessResponse findByName(String name) {
    List<User> userList = userRepository.findByName("%" + name + "%");
    if (userList.isEmpty()) {
      throw new AppException(404, 44,
          "Error: Does not exist! User not found with name '" + name + "'!");
    }
    return new SuccessResponse(userList.stream()
        .map(user -> mapper.map(user, UserDto.class)).collect(
            Collectors.toList()));
  }

  @Override
  public SuccessResponse findByPhone(String phone) {
    List<User> userList = userRepository.findByPhone("%" + phone + "%");
    if (userList.isEmpty()) {
      throw new AppException(404, 44,
          "Error: Does not exist! User not found with phone '" + phone + "'!");
    }
    return new SuccessResponse(userList.stream()
        .map(user -> mapper.map(user, UserDto.class)).collect(
            Collectors.toList()));
  }

  @Override
  public SuccessResponse findByEnabled(Boolean enabled) {
    List<User> userList = userRepository.findByEnabled(enabled);
    if (userList.isEmpty()) {
      throw new AppException(200, 8,
          "There are no accounts in need of approval!");
    }
    return new SuccessResponse(userList.stream()
        .map(user -> mapper.map(user, UserDto.class)).collect(
            Collectors.toList()));
  }

  @Override
  public SuccessResponse update(UserUpdateDto userUpdateDto) {
    UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
        .getAuthentication().getPrincipal();
    User thisUser = userRepository.findById(userDetails.getId())
        .orElseThrow(() -> new AppException(404, 44, "Error: Does not exist! User not found!"));

    User fromDB = userRepository.findById(userUpdateDto.getId())
        .orElseThrow(() -> new AppException(404, 44, "Error: Does not exist! User not found!"));

    List<String> roles = userDetails.getAuthorities().stream()
        .map(GrantedAuthority::getAuthority).toList();
    boolean isUser = false;
    boolean isLib = false;
    for (String role : roles) {
      if (Objects.equals(role, "ROLE_USER")) {
        isUser = true;
      } else if (Objects.equals(role, "ROLE_LIBRARIAN")) {
        isLib = true;
      }
    }
    if (!isLib && isUser) {
      if (!Objects.equals(userUpdateDto.getId(), userDetails.getId())) {
        throw new AppException(403, 43,
            "Forbidden! Your account only has permission to edit your own account information!");
      }
    }

//    fromDB.setEmail(userUpdateDto.getEmail());
    fromDB.setName(userUpdateDto.getName());
    fromDB.setPhone(userUpdateDto.getPhone());
//    fromDB.setAddress(userUpdateDto.getAddress());
    return new SuccessResponse(mapper.map(userRepository.save(fromDB), UserDto.class));
  }

  @Override
  public Map<String, Object> delete(Long id) {
    UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
        .getAuthentication().getPrincipal();
    User thisUser = userRepository.findById(userDetails.getId())
        .orElseThrow(() -> new AppException(404, 44, "Error: Does not exist! User not found!"));

    List<String> roles = userDetails.getAuthorities().stream()
        .map(GrantedAuthority::getAuthority).toList();
    boolean isUser = false;
    boolean isLib = false;
    for (String role : roles) {
      if (Objects.equals(role, "ROLE_USER")) {
        isUser = true;
      } else if (Objects.equals(role, "ROLE_LIBRARIAN")) {
        isLib = true;
      }
    }
    if (!isLib && isUser) {
      if (!Objects.equals(id, userDetails.getId())) {
        throw new AppException(403, 43,
            "Forbidden! Your account only has permission to delete your own account!");
      }
    }

    User fromDB = userRepository.findById(id).orElse(null);
    if (fromDB == null) {
      throw new AppException(404, 44, "Error: Does not exist! User not found!");
    }
    userRepository.deleteById(id);
    final Map<String, Object> body = new HashMap<>();
    body.put("code", 0);
    body.put("message", "Successfully deleted!");
    return body;
  }

  @Override
  public Map<String, Object> acceptAccount(Collection<Long> ids) {
    List<User> userList = userRepository.findAllById(ids);
    if (userList.isEmpty()) {
      throw new AppException(404,
          44, "Error: Does not exist! User not found with id list: " + ids.toString() + "!");
    } else if (userList.size() != ids.size()) {
      throw new AppException(404,
          44,
          "Error: Does not exist! Not enough user accounts found with id list: " + ids.toString()
              + "!");
    }
    for (User user : userList) {
      if (user.getEnabled()) {
        throw new AppException(400, 6,
            "You can only accept accounts that have not been accepted yet!");
      }
    }

    Integer rowCount = userRepository.updateEnabledById(ids, true)
        .orElseThrow(() -> new AppException(404, 44, "Error: Does not exist! User not found!"));
    final Map<String, Object> body = new HashMap<>();
    body.put("code", 0);
    body.put("message", "Successfully accepted " + rowCount + " accounts!");
    return body;
  }

  @Override
  public Map<String, Object> rejectAccount(Collection<Long> ids) {
    List<User> userList = userRepository.findAllById(ids);
    if (userList.isEmpty()) {
      throw new AppException(404,
          44, "Error: Does not exist! User not found with id list: " + ids.toString() + "!");
    } else if (userList.size() != ids.size()) {
      throw new AppException(404,
          44,
          "Error: Does not exist! Not enough user accounts found with id list: " + ids.toString()
              + "!");
    }
    for (User user : userList) {
      if (user.getEnabled()) {
        throw new AppException(400, 5,
            "You can only reject accounts that have not been accepted yet!");
      }
    }
    userRepository.deleteAllByIdInBatch(ids);
    final Map<String, Object> body = new HashMap<>();
    body.put("code", 0);
    body.put("message", "Successfully deleted!");
    return body;
  }

  @Override
  public SuccessResponse findAll() {
    List<User> userList = userRepository.findAll();
    if (userList.isEmpty()) {
      throw new AppException(404, 44, "Error: Does not exist! No user has been created yet!");
    }
    return new SuccessResponse(userList.stream()
        .map(user -> mapper.map(user, UserDto.class)).collect(
            Collectors.toList()));
  }

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByUsername(username)
        .orElseThrow(
            () -> new UsernameNotFoundException("User Not Found with username: " + username));

    return UserDetailsImpl.build(user);
  }
}
