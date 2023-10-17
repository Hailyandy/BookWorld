package com.chien.bookWorld.service;

import com.chien.bookWorld.entity.Book;
import com.chien.bookWorld.payload.response.SuccessResponse;

public interface BookService extends
    GeneralService<Book, Book, Book> {
  SuccessResponse findByTitleOrAuthor(String name);

  SuccessResponse findByTitleOrAuthorAndGenre(String name, Long genreId);

  void updateBookScoring();

  SuccessResponse findTopBook();
}
