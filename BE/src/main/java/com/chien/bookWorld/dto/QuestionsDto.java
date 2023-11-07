package com.chien.bookWorld.dto;

import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionsDto {

    private Long idBook;
    private String questionsText;
    private Map<String, Integer> optionText;
    private Integer scoring;
}
