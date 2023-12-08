package com.chien.bookWorld.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BookBasketUpdateDto {

  @NotNull(message = "Thiếu ID sách!")
  private Long bookId;

  @NotEmpty(message = "Thiếu trạng thái!")
  private String status;
}
