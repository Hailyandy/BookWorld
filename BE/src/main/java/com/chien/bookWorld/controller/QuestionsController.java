package com.chien.bookWorld.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.chien.bookWorld.dto.QuestionsCreationDto;
import com.chien.bookWorld.dto.ScoringCreation;
import com.chien.bookWorld.payload.request.QuestionsRequest;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.service.QuestionsService;

@RestController
@RequestMapping("/api/questions")
 
public class QuestionsController {

    @Autowired
    private QuestionsService questionsService;

    @PostMapping
    @PreAuthorize("hasRole('AUTHOR')")
    public ResponseEntity<Map<String, Object>> create(
            @RequestBody QuestionsCreationDto creationDto) {
        return ResponseEntity.status(200).body(questionsService.create(creationDto));
    }

    @GetMapping("")
    public ResponseEntity<SuccessResponse> getQuestionsByBook(
            @RequestParam Long idBook) {
        return ResponseEntity.ok(questionsService.getQuestionsByBook(idBook));
    }

    @PutMapping
    public ResponseEntity<SuccessResponse> checkQuestion(
            @RequestBody ScoringCreation scoringCreation) {
        return ResponseEntity.status(200)
                .body(questionsService.checkQuestion(scoringCreation));
    }
}
