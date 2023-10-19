package com.chien.bookWorld.service;

import com.chien.bookWorld.dto.BookCreationDto;
import com.chien.bookWorld.dto.BookDto;
import com.chien.bookWorld.entity.Book;
import com.chien.bookWorld.payload.response.SuccessResponse;

public interface BookService extends
    GeneralService<BookDto, BookCreationDto, Book> {
  SuccessResponse findByTitleOrAuthor(String name);
  SuccessResponse findByTitleOrAuthorAndGenre(String name, Long genreId);
}
