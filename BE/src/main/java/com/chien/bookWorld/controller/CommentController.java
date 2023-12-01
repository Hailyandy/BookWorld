package com.chien.bookWorld.controller;

import java.util.Map;

import com.chien.bookWorld.payload.response.PageResponse;
import com.chien.bookWorld.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import com.chien.bookWorld.dto.CommentCreationDto;
import com.chien.bookWorld.payload.request.CommentRequest;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.service.CommentService;

@RestController
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private  SimpMessagingTemplate messagingTemplate;

    @PostMapping("")
    public ResponseEntity<Map<String, Object>> createComment(
            @RequestBody CommentCreationDto commentCreationDto) {
        Map<String, Object> result = commentService.create(commentCreationDto);

        messagingTemplate.convertAndSend("/topic/posts/" + commentCreationDto.getPostId() + "/comment", result);
        return ResponseEntity.ok(result);
    }

    @MessageMapping("/chat.createComment")
    @SendTo("/topic/public")
    public String chatTest(
            @Payload String a
    ) {
        return a;
    }

    @GetMapping
    public ResponseEntity<PageResponse> getCommentByPost(
            @RequestParam Long postId, Pageable pageable) {
        return ResponseEntity.status(200).body(commentService.getCommentByPost(postId, pageable));
    }
}
