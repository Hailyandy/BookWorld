package com.chien.bookWorld.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class AnswerCheckDto {
    private Integer score;
    private UUID questionId;
    private Long idAnswer;
    private String answer;
}
