package com.chien.bookWorld.service;

import java.util.Map;
import java.util.UUID;

import com.chien.bookWorld.dto.QuestionsCreationDto;
import com.chien.bookWorld.dto.ScoringCreation;
import com.chien.bookWorld.entity.Questions;
import com.chien.bookWorld.payload.response.PageResponse;
import com.chien.bookWorld.payload.response.SuccessResponse;
import org.springframework.data.domain.Pageable;

public interface QuestionsService extends
                GeneralService<Map<String, Object>, QuestionsCreationDto, Questions> {
        SuccessResponse getQuestionsByBook(Long idBook);

        SuccessResponse checkQuestion(ScoringCreation scoringCreation);

        PageResponse getScoringTopByBook(Pageable pageable, Long idBook);
}