package com.chien.bookWorld.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import com.chien.bookWorld.dto.UserAndFriendshipDto;
import org.modelmapper.ModelMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.chien.bookWorld.dto.UserDto;
import com.chien.bookWorld.entity.Friendship;
import com.chien.bookWorld.entity.FriendshipStatus;
import com.chien.bookWorld.entity.User;
import com.chien.bookWorld.entity.UserDetailsImpl;
import com.chien.bookWorld.exception.AppException;
import com.chien.bookWorld.payload.request.AddFriendRequest;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.repository.FriendshipRepository;
import com.chien.bookWorld.repository.UserRepository;
import com.chien.bookWorld.service.FriendService;

@Service
public class FriendServiceImpl implements FriendService {
    private static final Logger logger = Logger.getLogger(FriendServiceImpl.class.getName());

    @Autowired
    private FriendshipRepository rFriendshipRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper mapper;

    @Override
    public Map<String, Object> acceptFriendRequest(Long senderId) {
        // TODO Auto-generated method stub

        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).toList();

        boolean isUser = roles.contains("ROLE_USER");
        boolean isAuthor = roles.contains("ROLE_AUTHOR");

        if (!isUser && !isAuthor) {
            throw new AppException(403, 43, "Forbidden! You don't have permission to add friends.");
        }

        if (isUser && (senderId == userDetails.getId())) {
            throw new AppException(403, 43, "Forbidden! You can only accept yourself as a friend.");
        }

        Friendship friendship = rFriendshipRepository.findFriendRequestsByUsers(senderId, userDetails.getId());

        friendship.setStatus(FriendshipStatus.ACCEPTED);
        rFriendshipRepository.save(friendship);
        final Map<String, Object> body = new HashMap<>();
        body.put("code", 0);
        body.put("message", "Friend accept!");
        return body;
    }

    @Override
    public Map<String, Object> addFriend(AddFriendRequest addFriendRequest) {
        Long friendId = addFriendRequest.getReceiverId();

        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        // Kiểm tra xem người dùng hiện tại có quyền thực hiện thao tác thêm bạn bè
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).toList();

        boolean isUser = roles.contains("ROLE_USER");
        boolean isAuthor = roles.contains("ROLE_AUTHOR");

        if (!isUser && !isAuthor) {
            throw new AppException(403, 43, "Forbidden! You don't have permission to add friends.");
        }

        if (isUser && (friendId == userDetails.getId())) {
            throw new AppException(403, 40, "Forbidden! You can only add yourself as a friend.");
        }

        Long id = userDetails.getId();
        User sender = userRepository.findById(id)
                .orElseThrow(() -> new AppException(404, 44, "Error: Sender does not exist!"));

        User receiver = userRepository.findById(friendId)
                .orElseThrow(() -> new AppException(404, 44, "Error: Receiver does not exist!"));

        Friendship existingFriendship = rFriendshipRepository.findBySenderIdAndReceiverId(userDetails.getId(),
                friendId);

        if (existingFriendship != null) {
            throw new AppException(409, 40, "Error: You have already sent a friend request!");
        }

        // Tạo mối quan hệ bạn bè mới
        Friendship newFriendship = new Friendship();
        newFriendship.setSender(sender);
        newFriendship.setReceiver(receiver);
        newFriendship.setStatus(FriendshipStatus.PENDING);

        // Save
        rFriendshipRepository.save(newFriendship);
        final Map<String, Object> body = new HashMap<>();
        body.put("code", 0);
        body.put("message", "Friend request sent!");
        return body;
    }

    @Override
    public SuccessResponse getFriendRequestsOfUser(Pageable pageable) {
        // TODO Auto-generated method stub
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        Long userId = userDetails.getId();

        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).toList();

        boolean isUser = roles.contains("ROLE_USER");
        boolean isAuthor = roles.contains("ROLE_AUTHOR");

        if (!isUser && !isAuthor) {
            throw new AppException(403, 43, "Forbidden! You don't have permission to add friends.");
        }

        List<Friendship> friendRequests = rFriendshipRepository.findByReceiverIdAndStatus(userId,
                FriendshipStatus.PENDING);

        if (friendRequests.isEmpty()) {
            return new SuccessResponse(null);
        }

        List<User> requestSenders = new ArrayList<>();
        for (Friendship request : friendRequests) {
            User sender = request.getSender();
            requestSenders.add(sender);
        }

        if (requestSenders.isEmpty()) {
            return new SuccessResponse(null);
        }
        return new SuccessResponse(requestSenders.stream()
                .map(user -> {
                    UserAndFriendshipDto userAndFriendshipDto = mapper.map(user, UserAndFriendshipDto.class);
                    userAndFriendshipDto.setFriendship("ACCEPT");
                    return userAndFriendshipDto;
                }).collect(
                        Collectors.toList()));
    }

    @Override
    public SuccessResponse getFriendsOfUser(Pageable pageable) {

        // TODO Auto-generated method stub
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        Long userId = userDetails.getId();

        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).toList();

        boolean isUser = roles.contains("ROLE_USER");
        boolean isAuthor = roles.contains("ROLE_AUTHOR");

        if (!isUser && !isAuthor) {
            throw new AppException(403, 43, "Forbidden! You don't have permission to add friends.");
        }

        List<Friendship> friendRequests = rFriendshipRepository.findByStatusAndSenderIdOrReceiverId(userId, userId);
        logger.info("test get friend request: " + friendRequests.toString());
        if (friendRequests.isEmpty()) {
            return new SuccessResponse(null);
        }

        List<User> listFriend = new ArrayList<>();
        for (Friendship request : friendRequests) {
            User sender = request.getSender();
            listFriend.add(sender);
        }

        if (listFriend.isEmpty()) {
            return new SuccessResponse(null);
        }

        return new SuccessResponse(listFriend.stream()
                .map(user -> {
                    UserAndFriendshipDto userAndFriendshipDto = mapper.map(user, UserAndFriendshipDto.class);
                    userAndFriendshipDto.setFriendship("ACCEPTED");
                    return userAndFriendshipDto;
                } ).collect(Collectors.toList()));

    }

    @Override
    public Map<String, Object> rejectFriendRequest(Long senderId) {
        // TODO Auto-generated method stub

        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).toList();

        boolean isUser = roles.contains("ROLE_USER");
        boolean isAuthor = roles.contains("ROLE_AUTHOR");

        if (!isUser && !isAuthor) {
            throw new AppException(403, 43, "Forbidden! You don't have permission to add friends.");
        }

        if (isUser && (senderId == userDetails.getId())) {
            throw new AppException(403, 40, "Forbidden! You can only accept yourself as a friend.");
        }

        Friendship friendship = rFriendshipRepository.findFriendRequestsByUsers(senderId, userDetails.getId());

        rFriendshipRepository.delete(friendship);
        final Map<String, Object> body = new HashMap<>();
        body.put("code", 0);
        body.put("message", "Friend reject success!");
        return body;
    }

    @Override
    public Map<String, Object> removeFriend(Long senderId) {
        // TODO Auto-generated method stub
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).toList();

        boolean isUser = roles.contains("ROLE_USER");
        boolean isAuthor = roles.contains("ROLE_AUTHOR");

        if (!isUser && !isAuthor) {
            throw new AppException(403, 43, "Forbidden! You don't have permission to add friends.");
        }

        if (isUser && (senderId == userDetails.getId())) {
            throw new AppException(403, 43, "Forbidden! You can only accept yourself as a friend.");
        }

        Friendship friendship = rFriendshipRepository.findBySenderIdAndReceiverId(senderId,
                userDetails.getId());
        Friendship friendship2 = rFriendshipRepository.findBySenderIdAndReceiverId(userDetails.getId(),
                senderId);

        if (friendship == null && friendship2 == null) {
            throw new AppException(404, 44, "Error: Does not exist! No friend request has been created yet!");
        }

        if (friendship != null) {
            rFriendshipRepository.delete(friendship);
        }

        if (friendship2 != null) {
            rFriendshipRepository.delete(friendship2);
        }

        final Map<String, Object> body = new HashMap<>();
        body.put("code", 0);
        body.put("message", "Friend delete!");
        return body;

    }

    @Override
    public SuccessResponse getTotalFriendRequest() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        Long count = rFriendshipRepository.countPendingInvitation(userDetails.getId());
        return new SuccessResponse(count);
    }

    @Override
    public SuccessResponse getUserSender() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        User sender = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new AppException(404, 44, "Error: Sender does not exist!"));
//
//        UserAndFriendshipDto userAndFriendshipDto = mapper.map(sender, )
        return null;
    }

    @Override
    public Object create(Object c) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Map delete(Long id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public SuccessResponse findAll() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public SuccessResponse findById(Long id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public SuccessResponse update(Object u) {
        // TODO Auto-generated method stub
        return null;
    }

}
