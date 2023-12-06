package com.chien.bookWorld.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class ScoringCreation {

    private Long idBook;
    private List<AnswerCheckDto> listAnswer;
}
