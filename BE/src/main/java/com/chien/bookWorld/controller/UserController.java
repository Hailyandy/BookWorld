package com.chien.bookWorld.controller;

import com.chien.bookWorld.dto.UserUpdateDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.service.UserService;

@RestController
@RequestMapping("/api/users")
 
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/search")
    public ResponseEntity<SuccessResponse> searchUserByName(@RequestParam String name) {
        return ResponseEntity.status(200).body(userService.findByUsersByName(name));
    }

    @PatchMapping("/update/{userId}")
    public ResponseEntity<Object> updateUser(
            @PathVariable Long userId, @RequestBody UserUpdateDto userUpdateDto
            ) {
        return ResponseEntity.status(200).body(userService.update(userUpdateDto));
    }

    @GetMapping("/{idUser}")
    public ResponseEntity<SuccessResponse> getInfoUser(@PathVariable Long idUser) {
        return ResponseEntity.status(200).body(userService.findById(idUser));
    }



}
