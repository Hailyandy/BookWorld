package com.chien.bookWorld.dto;

import com.chien.bookWorld.entity.Genre;
import java.time.LocalDateTime;
import java.util.Collection;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BookDto {

  private Long id;

  private String name;
  private Long numberPages;
  private String publisher;
  private LocalDateTime publishDate;
  private String introducing;
  private String urlPoster;
  private Double scoring;
  private Long authorId;
  private String authorName;
  private Collection<GenreDto> genres;
}
