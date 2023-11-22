package com.chien.bookWorld.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chien.bookWorld.entity.User;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.service.AuthorService;
import com.chien.bookWorld.service.UserService;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RestController
@RequestMapping("/api/author")
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('AUTHOR') or hasRole('USER')")
    public ResponseEntity<SuccessResponse> getAuthorById(@PathVariable Long id) {
        return ResponseEntity.status(200).body(authorService.findById(id));
    }

    // @PostMapping
    // public ResponseEntity<User> createInfoAuthor(@RequestBody User user) {

    // }

    @GetMapping
    public ResponseEntity<SuccessResponse> getAllAuthor() {
        return ResponseEntity.status(200).body(authorService.findAll());
    }

}
