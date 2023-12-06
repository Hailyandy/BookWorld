package com.chien.bookWorld.controller;

import com.chien.bookWorld.dto.BookCreationDto;
import com.chien.bookWorld.dto.PostCreationDto;
import com.chien.bookWorld.dto.PostDto;
import com.chien.bookWorld.dto.StatePost;
import com.chien.bookWorld.entity.Post;
import com.chien.bookWorld.payload.response.PageResponse;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.service.BookService;
import com.chien.bookWorld.service.PostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
 
@RequestMapping("/api/post")
public class PostController {

  @Autowired
  private PostService postService;

  @PreAuthorize("hasRole('USER')")
  @PostMapping
  public ResponseEntity<Map<String, Object>> create(
      @RequestBody @Validated PostCreationDto postCreationDto) {
    return ResponseEntity.status(200).body(postService.create(postCreationDto));
  }

  @GetMapping
  public ResponseEntity<PageResponse> getPostByState(
      @RequestParam String state, Pageable pageable) {
    return ResponseEntity.status(200).body(postService.getPostBySate(state, pageable));
  }

  @GetMapping("/current")
  public ResponseEntity<PageResponse> getPostByUser(
          Pageable pageable
  ) {
    return ResponseEntity.status(200).body(postService.getPostByUserCurrent(pageable));
  }

  @GetMapping("/{userId}")
  public ResponseEntity<PageResponse> getPostByUserId(
          @PathVariable Long userId, Pageable pageable
  ) {
      return  ResponseEntity.status(200).body(postService.getPostByUser(userId, pageable));
  }

  @PatchMapping("/{postId}")
  public ResponseEntity<PostDto> updateContentPost(
          @PathVariable Long postId, @RequestBody Post post
  ) {
    return ResponseEntity.status(200).body(postService.updatePost(postId, post));
  }

  @DeleteMapping("/{postId}")
  public ResponseEntity<Map<String, Object>> deletePost(
          @PathVariable Long postId
  ) {
    return ResponseEntity.status(200).body(postService.delete(postId));
  }

}
