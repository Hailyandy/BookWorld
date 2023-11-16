package com.chien.bookWorld.service;

import org.springframework.data.domain.Pageable;

import com.chien.bookWorld.dto.BookCreationDto;
import com.chien.bookWorld.dto.BookDto;
import com.chien.bookWorld.entity.Book;
import com.chien.bookWorld.payload.response.SuccessResponse;

public interface BookService extends
    GeneralService<BookDto, BookCreationDto, Book> {

  SuccessResponse findByTitleOrAuthor(String name, Pageable pageable);

  SuccessResponse findByTitleOrAuthorAndGenre(String name, Long genreId, Pageable pageable);

  SuccessResponse bookRecommendations(Pageable pageable);

  void updateBookScoring();

  SuccessResponse findTopBook();

  SuccessResponse getBookList(Pageable pageable);
}
