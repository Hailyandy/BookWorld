package com.chien.bookWorld.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
public class BookDetailDto {
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
    private List<PdfDto> pdfs;
    private String statusWithUser;
}
