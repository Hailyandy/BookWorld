package com.chien.bookWorld.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.service.GenreService;

@RestController
@RequestMapping("/api/genres")
@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
public class GenreController {

    @Autowired()
    private GenreService genreService;

    @GetMapping("")
    public ResponseEntity<SuccessResponse> getAllGenre() {
        return ResponseEntity.status(200).body(
                genreService.findAll());
    }

}
