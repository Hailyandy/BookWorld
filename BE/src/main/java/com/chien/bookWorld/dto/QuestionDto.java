package com.chien.bookWorld.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class QuestionDto {

    @NotBlank(message = "Thiếu câu hỏi")
    private String questionsText;
    @NotEmpty(message = "Thiếu câu trả lời")
    private Map<String, Integer> optionText;
    @NotEmpty(message = "Thiếu điểm")
    private Integer scoring;

}
