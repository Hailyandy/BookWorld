package com.chien.bookWorld.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chien.bookWorld.dto.QuestionsCreationDto;
import com.chien.bookWorld.dto.ScoringCreation;
import com.chien.bookWorld.payload.request.QuestionsRequest;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.service.QuestionsService;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
public class QuestionsController {

    @Autowired
    private QuestionsService questionsService;

    @PostMapping
    @PreAuthorize("hasRole('AUTHOR')")
    public ResponseEntity<Map<String, Object>> create(
            @RequestBody QuestionsCreationDto creationDto) {
        return ResponseEntity.status(200).body(questionsService.create(creationDto));
    }

    @GetMapping
    public ResponseEntity<SuccessResponse> getQuestionsByBook(
            @RequestBody QuestionsRequest qRequest) {
        return ResponseEntity.ok(questionsService.getQuestionsByBook(qRequest.getIdBook()));
    }

    @PutMapping
    public ResponseEntity<Map<String, Object>> checkQuestion(
            @RequestBody ScoringCreation scoringCreation) {
        return ResponseEntity.status(200)
                .body(questionsService.checkQuestion(
                        scoringCreation.getIdBook(),
                        scoringCreation.getScore(),
                        scoringCreation.getIdAnswer(),
                        scoringCreation.getQuestionId()));
    }
}
