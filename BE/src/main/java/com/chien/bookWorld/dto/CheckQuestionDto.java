package com.chien.bookWorld.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class CheckQuestionDto {
    private UUID questionId;
    private String user_answer;
    private Long user_answerId;
    private String correct_answer;
    private Long correct_answerId;
    private String status;
}
