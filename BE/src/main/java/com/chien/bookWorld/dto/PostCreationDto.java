package com.chien.bookWorld.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Collection;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PostCreationDto {

  private Long bookId;
  private Long pdfId;
  @NotNull(message = "Thiếu điểm đánh giá!")
  private Long scoring;
  @NotEmpty(message = "Thiếu nội dung!")
  private String content;
}
