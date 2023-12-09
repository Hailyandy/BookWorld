package com.chien.bookWorld.controller;

import java.util.Map;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.chien.bookWorld.entity.Friendship;
import com.chien.bookWorld.payload.request.AcceptFriendRequest;
import com.chien.bookWorld.payload.request.AddFriendRequest;
import com.chien.bookWorld.payload.request.RejectFriendRequest;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.service.FriendService;
import com.chien.bookWorld.service.impl.FriendServiceImpl;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/friend")
 
public class FriendController {

    private static final Logger logger = Logger.getLogger(FriendController.class.getName());
    @Autowired
    private FriendService friendService;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;


    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addFriend(
            @RequestBody AddFriendRequest friendRequest) {

        Map<String, Object> result = friendService.addFriend(friendRequest);
        SuccessResponse getUserSender = friendService.getUserSender();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/request")
    public ResponseEntity<SuccessResponse> getFriendRequestOfUser(Pageable pageable) {
        return ResponseEntity.status(200).body(
                friendService.getFriendRequestsOfUser(pageable));
    }

    @PutMapping("/accept")
    public ResponseEntity<Map<String, Object>> acceptFriendRequest(
            @RequestBody AcceptFriendRequest friendRequest) {
        Map<String, Object> result = friendService.acceptFriendRequest(friendRequest.getSenderId());
        return ResponseEntity.ok(result);
    }

    @GetMapping("/list")
    public ResponseEntity<SuccessResponse> getFriends(Pageable pageable) {
        return ResponseEntity.ok(friendService.getFriendsOfUser(pageable));
    }

    @PutMapping("/reject")
    public ResponseEntity<Map<String, Object>> rejectFriendRequest(
            @RequestBody RejectFriendRequest friendRequest) {
        Map<String, Object> result = friendService.rejectFriendRequest(friendRequest.getSenderId());
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/unfriend")
    public ResponseEntity<Map<String, Object>> removeFriend(
            @RequestBody RejectFriendRequest friendRequest) {
        Map<String, Object> result = friendService.removeFriend(friendRequest.getSenderId());
        SuccessResponse getUserSender = friendService.getUserSender();
        simpMessagingTemplate.convertAndSendToUser(friendRequest.getSenderId().toString(), "/queue/friend/cancel", getUserSender);
        return ResponseEntity.ok(result);
    }


}
