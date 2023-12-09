package com.chien.bookWorld.service.impl;

import com.chien.bookWorld.dto.*;
import com.chien.bookWorld.entity.Friendship;
import com.chien.bookWorld.entity.FriendshipStatus;
import com.chien.bookWorld.entity.Role;
import com.chien.bookWorld.entity.User;
import com.chien.bookWorld.entity.UserDetailsImpl;
import com.chien.bookWorld.exception.AppException;
import com.chien.bookWorld.payload.response.PageResponse;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.repository.FriendshipRepository;
import com.chien.bookWorld.repository.UserRepository;
import com.chien.bookWorld.service.UserService;
import jakarta.transaction.Transactional;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
  private FriendshipRepository friendshipRepository;
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
    User fromDB = userRepository.findById(userUpdateDto.getId())
        .orElseThrow(() -> new AppException(404, 44, "Error: Does not exist! User not found!"));
    if (userDetails.getId() != userUpdateDto.getId()) {
      throw new AppException(404, 44, "id user sai!");
    }
    fromDB.setIntroducing(userUpdateDto.getIntroducing());
    fromDB.setNativePlace(userUpdateDto.getNativePlace());
    fromDB.setUrlAvatar(userUpdateDto.getUrlAvatar());
    fromDB.setPhone(userUpdateDto.getPhone());
    fromDB.setBirthDate(userUpdateDto.getBirthDate());
    fromDB.setName(userUpdateDto.getName());
    User user = userRepository.save(fromDB);
    return new SuccessResponse(mapper.map(user, UserDto.class));
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

  @Override
  public SuccessResponse findByUsersByName(String name) {
    UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
        .getAuthentication().getPrincipal();
    List<User> users = userRepository.findByNameAndNotRoleAdmin("%" + name + "%", userDetails.getId());

    if (users.isEmpty()) {
      return new SuccessResponse(new ArrayList<User>());
    } else {
      List<UserAndFriendshipDto> userDtos = new ArrayList<>();
      for (User user : users) {
        UserAndFriendshipDto userDto = mapper.map(user, UserAndFriendshipDto.class);

        Friendship friendship = friendshipRepository.findBySenderIdAndReceiverId(userDetails.getId(), user.getId());
        if (friendship == null) {
          Friendship friendshipReceiver = friendshipRepository.findBySenderIdAndReceiverId(user.getId(),
              userDetails.getId());
          if (friendshipReceiver != null) {
            if (friendshipReceiver.getStatus() == FriendshipStatus.PENDING) {
              userDto.setFriendship(FriendshipStatus.ACCEPT.toString());
            } else {
              userDto.setFriendship(friendshipReceiver.getStatus().toString());
            }

          } else {
            userDto.setFriendship("null");
          }
        } else {
          userDto.setFriendship(friendship.getStatus().toString());
        }

        userDtos.add(userDto);
      }
      ;
      return new SuccessResponse(userDtos);
    }
  }

  @Override
  public SuccessResponse getNewRegistrationsByMonth(int year) {


    List<Object[]> result = userRepository.countNewUserRegistrationsByMonth(year);

    return new SuccessResponse(result.stream().map(row -> new MonthlyRegistrationStatsDto(
            (Integer) row[0],
            year,
            (long) row [1]
    )).collect(Collectors.toList()));
  }

  @Override
  public PageResponse getUserAuthorEneble(Pageable pageable) {
    UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();
    Page<User> users = userRepository.getUserAuthorNoEnable(pageable);
    int totalPages = users.getTotalPages();
    int numberPage = users.getNumber();
    long totalRecord = users.getTotalElements();
    int pageSize = users.getSize();
    List<String> roles = userDetails.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority).toList();
    boolean isAdmin = roles.contains("ROLE_ADMIN");
    if (!isAdmin) {
      throw new AppException(401, 41, "Error: Không phải role admin!");
    }

    List<UserDto> getAuthors = users.stream().map(user -> {
        UserDto userDto = mapper.map(user, UserDto.class);
        return userDto;
    }).collect(Collectors.toList());
    return new PageResponse(totalPages, pageSize, totalRecord, numberPage, getAuthors);
  }

  @Override
  public Map<String, Object> acceptEnable(Long id) {
    UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();
    List<String> roles = userDetails.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority).toList();
    boolean isAdmin = roles.contains("ROLE_ADMIN");
    if (!isAdmin) {
      throw new AppException(401, 41, "Error: Không phải role admin!");
    }

    User user = userRepository.findById(id).orElseThrow(
            () -> new AppException(404, 44, "Error: Không tìm thấy user!")
    );

    user.setEnabled(true);
    userRepository.save(user);
    final Map<String, Object> body = new HashMap<>();
    body.put("code", 0);
    body.put("message", "Enable Successful!");
    return body;
  }
}
