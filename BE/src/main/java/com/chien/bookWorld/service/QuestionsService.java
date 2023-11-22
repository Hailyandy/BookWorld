package com.chien.bookWorld.service;

import java.util.Map;
import java.util.UUID;

import com.chien.bookWorld.dto.QuestionsCreationDto;
import com.chien.bookWorld.entity.Questions;
import com.chien.bookWorld.payload.response.SuccessResponse;

public interface QuestionsService extends
                GeneralService<Map<String, Object>, QuestionsCreationDto, Questions> {
        SuccessResponse getQuestionsByBook(Long idBook);

        Map<String, Object> checkQuestion(Long idBook, Integer scoring,Long idAnswer, UUID idQuestion);
}