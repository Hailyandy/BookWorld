package com.chien.bookWorld.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "https://hailyandy.github.io/BookWorld/", maxAge = 3600)
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/search")
    public ResponseEntity<SuccessResponse> searchUserByName(@RequestParam String name) {
        return ResponseEntity.status(200).body(userService.findByUsersByName(name));
    }

}
