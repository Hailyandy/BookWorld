package com.chien.bookWorld.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class CommentUpdateDto {
    private UUID id;
    private String content;
}
