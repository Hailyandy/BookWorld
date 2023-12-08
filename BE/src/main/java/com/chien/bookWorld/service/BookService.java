package com.chien.bookWorld.service;

import com.chien.bookWorld.payload.response.PageResponse;
import org.springframework.data.domain.Pageable;

import com.chien.bookWorld.dto.BookCreationDto;
import com.chien.bookWorld.dto.BookDto;
import com.chien.bookWorld.entity.Book;
import com.chien.bookWorld.payload.response.SuccessResponse;

import java.util.Map;

public interface BookService extends
    GeneralService<BookDto, BookCreationDto, Book> {

  PageResponse findByTitleOrAuthor(String name, Pageable pageable);

  PageResponse findByTitleOrAuthorAndGenre(String name, Long genreId, Pageable pageable);

  PageResponse bookRecommendations(Pageable pageable);

  void updateBookScoring();

  SuccessResponse findTopBook();

  PageResponse getBookList(Pageable pageable);

  SuccessResponse updateBook(Long idBook, Map<Object, Object> filed);


}
