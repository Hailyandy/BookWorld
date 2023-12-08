package com.chien.bookWorld.controller;

import java.util.Map;
import java.util.UUID;

import com.chien.bookWorld.dto.CommentUpdateDto;
import com.chien.bookWorld.entity.Comment;
import com.chien.bookWorld.payload.response.PageResponse;
import com.chien.bookWorld.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<SuccessResponse> createComment(
            @RequestBody CommentCreationDto commentCreationDto) {
        SuccessResponse result = commentService.createComment(commentCreationDto);

        messagingTemplate.convertAndSend("/topic/posts/" + commentCreationDto.getPostId() + "/comment", result);
        return ResponseEntity.ok(result);
    }

    @GetMapping
    public ResponseEntity<PageResponse> getCommentByPost(
            @RequestParam Long postId, Pageable pageable) {
        return ResponseEntity.status(200).body(commentService.getCommentByPost(postId, pageable));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable UUID id, @RequestParam Long postId) {
        boolean result = commentService.deleteComment(id, postId);
        if (result == true) {
            messagingTemplate.convertAndSend("/topic/" + postId + "/comment/delete", "Delete success");
            return ResponseEntity.ok("Comment deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete comment");
    }


    @PatchMapping("")
    public ResponseEntity<SuccessResponse> updateComment(@RequestBody CommentUpdateDto commentUpdateDto, @RequestParam Long postId) {
        SuccessResponse result = commentService.updateComment(commentUpdateDto);
        messagingTemplate.convertAndSend("/topic/"+ postId + "/comment/update", result);
        return ResponseEntity.status(200).body(result);
    }



}
