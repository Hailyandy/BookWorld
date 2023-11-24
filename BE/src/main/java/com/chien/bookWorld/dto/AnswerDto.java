package com.chien.bookWorld.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AnswerDto {
    private Integer score;
    private List<OptionDto> optionDtos;
}
