package com.chien.bookWorld.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Collection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BookCreationDto {
  @NotEmpty(message = "Thiếu tên sách!")
  private String name;
  @NotNull(message = "Thiếu số lượng trang!")
  private Long numberPages;
  @NotEmpty(message = "Thiếu nhà xuất bản!")
  private String publisher;
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private LocalDateTime publishDate;
  @NotEmpty(message = "Thiếu giới thiệu sách!")
  private String introducing;
  @NotEmpty(message = "Thiếu đường dẫn áp phích!")
  private String urlPoster;
  @NotNull(message = "Thiếu ID tác giả!")
  private Long authorId;
  @NotEmpty(message = "Thiếu ID thể loại!")
  private Collection<Long> genreIds;
}
