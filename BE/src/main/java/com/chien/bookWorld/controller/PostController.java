package com.chien.bookWorld.controller;

import com.chien.bookWorld.dto.BookCreationDto;
import com.chien.bookWorld.dto.PostCreationDto;
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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RequestMapping("/api/post")
@SecurityRequirement(name = "javainuseapi")
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
  public ResponseEntity<SuccessResponse> getPostByState(
      @RequestParam String state, Pageable pageable) {
    return ResponseEntity.status(200).body(postService.getPostBySate(state, pageable));
  }

}
