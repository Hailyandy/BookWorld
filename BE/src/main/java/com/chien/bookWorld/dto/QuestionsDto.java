package com.chien.bookWorld.dto;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionsDto {

    private UUID id;
    private Long idBook;
    private String questionsText;
    private List<OptionDto> optionDtos;
    private Integer scoring;
}
