package com.chien.bookWorld.dto;

import java.util.List;
import java.util.Map;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionsCreationDto {

    @NotBlank(message = "Thiếu book id")
    private Long idBook;

    @NotBlank(message = "Thiếu câu hỏi")
    private String questionsText;

    @NotEmpty(message = "Thiếu câu trả lời")
    private Map<String, Integer> optionText;

    @NotEmpty(message = "Thiếu điểm")
    private Integer scoring;
}
