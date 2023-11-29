package com.chien.bookWorld.controller;

import java.util.Map;

import com.chien.bookWorld.payload.response.PageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
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

    @PostMapping
    public ResponseEntity<Map<String, Object>> createComment(
            @RequestBody CommentCreationDto commentCreationDto) {
        return ResponseEntity.ok(commentService.create(commentCreationDto));
    }

    @GetMapping
    public ResponseEntity<PageResponse> getCommentByPost(
            @RequestParam Long postId, Pageable pageable) {
        return ResponseEntity.status(200).body(commentService.getCommentByPost(postId, pageable));
    }
}
