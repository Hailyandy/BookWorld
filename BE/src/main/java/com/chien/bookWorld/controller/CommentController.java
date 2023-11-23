package com.chien.bookWorld.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chien.bookWorld.dto.CommentCreationDto;
import com.chien.bookWorld.payload.request.CommentRequest;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.service.CommentService;

@RestController
@RequestMapping("/api/comment")
@CrossOrigin(origins = "https://hailyandy.github.io/BookWorld/", maxAge = 3600)
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createComment(
            @RequestBody CommentCreationDto commentCreationDto) {
        return ResponseEntity.ok(commentService.create(commentCreationDto));
    }

    @GetMapping
    public ResponseEntity<SuccessResponse> getCommentByPost(
            @RequestBody CommentRequest commentRequest, Pageable pageable) {
        return ResponseEntity.status(200).body(commentService.getCommentByPost(commentRequest.getPostId(), pageable));
    }

}
