package com.chien.bookWorld.dto;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.Builder.Default;

@Getter
@Setter
public class CommentCreationDto {
    @NotBlank(message = "Content null")
    private String content;
    private UUID parentId;
    @NotBlank(message = "Post id null")
    private Long postId;
}
