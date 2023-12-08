package com.chien.bookWorld.service;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.chien.bookWorld.payload.request.AddFriendRequest;
import com.chien.bookWorld.payload.response.SuccessResponse;
import java.util.Map;

public interface FriendService extends GeneralService {

    SuccessResponse getFriendsOfUser(Pageable pageable);

    Map<String, Object> acceptFriendRequest(Long friendId);

    Map<String, Object> rejectFriendRequest(Long friendId);

    SuccessResponse getFriendRequestsOfUser(Pageable pageable);

    Map<String, Object> addFriend(AddFriendRequest addFriendRequest);

    Map<String, Object> removeFriend(Long friendId);

    SuccessResponse getTotalFriendRequest(Long id);

    SuccessResponse getUserSender();

}
