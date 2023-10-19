package com.chien.bookWorld.service.impl;

import com.chien.bookWorld.dto.BookCreationDto;
import com.chien.bookWorld.dto.BookDto;
import com.chien.bookWorld.dto.GenreDto;
import com.chien.bookWorld.entity.Book;
import com.chien.bookWorld.entity.User;
import com.chien.bookWorld.entity.UserDetailsImpl;
import com.chien.bookWorld.exception.AppException;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.repository.BookRepository;
import com.chien.bookWorld.repository.GenreRepository;
import com.chien.bookWorld.repository.UserRepository;
import com.chien.bookWorld.service.BookService;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class BookServiceImpl implements BookService {

  @Autowired
  private BookRepository bookRepository;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private GenreRepository genreRepository;
  @Autowired
  private ModelMapper mapper;

  @Override
  public BookDto create(BookCreationDto bookCreationDto) {
    Book book = new Book(bookCreationDto);
    book.setUser(userRepository.findById(bookCreationDto.getAuthorId())
        .orElseThrow(() -> new AppException(404, 44,
            "Không tìm thấy tài khoản tác giả với id '" + bookCreationDto.getAuthorId() + "'!")));
    book.setGenres(bookCreationDto.getGenreIds().stream()
        .map(id -> genreRepository.findById(id).orElseThrow(() -> new AppException(404, 44,
            "Không tìm thấy thể loại với id '" + id + "'!")))
        .collect(Collectors.toSet()));
    book = bookRepository.save(book);
    BookDto bookDto = mapper.map(book, BookDto.class);
    bookDto.setAuthorId(book.getUser().getId());
    bookDto.setAuthorName(book.getUser().getName());
    bookDto.setGenres(
        book.getGenres().stream().map(genre -> mapper.map(genre, GenreDto.class)).collect(
            Collectors.toList()));
    return bookDto;
  }

  @Override
  public SuccessResponse findById(Long id) {
    Book book = bookRepository.findById(id).orElse(null);
    if (book == null) {
      throw new AppException(404, 44, "Error: Does not exist! Book not found!");
    } else {
      return new SuccessResponse(book);
    }
  }

  @Override
  public SuccessResponse findAll() {
    List<Book> userList = bookRepository.findAll();
    if (userList.isEmpty()) {
      throw new AppException(404, 44, "Error: Does not exist! No book has been created yet!");
    }
    return new SuccessResponse(userList);
  }

  @Override
  public SuccessResponse findByTitleOrAuthor(String name) {
    UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
        .getAuthentication().getPrincipal();
    User user = userRepository.findByUsername(userDetails.getUsername())
        .orElseThrow(
            () -> new AppException(404, 44,
                "Không tìm thấy tài khoản với username: " + userDetails.getUsername() + "!"));
    List<BookDto> bookList = bookRepository.findByTitleOrAuthor(
        "%" + name + "%").stream().map(book -> {
      BookDto bookDto = mapper.map(book, BookDto.class);
      bookDto.setAuthorId(book.getUser().getId());
      bookDto.setAuthorName(book.getUser().getName());
      bookDto.setGenres(
          book.getGenres().stream().map(genre -> mapper.map(genre, GenreDto.class)).collect(
              Collectors.toList()));
      return bookDto;
    }).collect(Collectors.toList());
    if (bookList.isEmpty()) {
      throw new AppException(404, 44,
          "Không tìm thấy sách với tên sách hoặc tên tác giả chứa '" + name + "'!");
    }
    return new SuccessResponse(bookList);
  }

  @Override
  public SuccessResponse findByTitleOrAuthorAndGenre(String name, Long genreId) {
    UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
        .getAuthentication().getPrincipal();
    User user = userRepository.findByUsername(userDetails.getUsername())
        .orElseThrow(
            () -> new AppException(404, 44,
                "Không tìm thấy tài khoản với username: " + userDetails.getUsername() + "!"));
    List<BookDto> bookList = bookRepository.findByTitleOrAuthorAndGenre(
        "%" + name + "%", genreId).stream().map(book -> {
      BookDto bookDto = mapper.map(book, BookDto.class);
      bookDto.setAuthorId(book.getUser().getId());
      bookDto.setAuthorName(book.getUser().getName());
      bookDto.setGenres(
          book.getGenres().stream().map(genre -> mapper.map(genre, GenreDto.class)).collect(
              Collectors.toList()));
      return bookDto;
    }).collect(Collectors.toList());
    if (bookList.isEmpty()) {
      throw new AppException(404, 44,
          "Không tìm thấy sách với tên sách hoặc tên tác giả chứa '" + name
              + "' và có id thể loại là '" + genreId + "'!");
    }
    return new SuccessResponse(bookList);
  }

  @Override
  public SuccessResponse update(Book BookInput) {
    Book fromDB = bookRepository.findById(BookInput.getId()).orElse(null);
    if (fromDB == null) {
      throw new AppException(404, 44, "Error: Does not exist! Book not found!");
    }
    fromDB.setId(BookInput.getId());
    fromDB.setId(BookInput.getId());
    fromDB.setId(BookInput.getId());
    fromDB.setId(BookInput.getId());
    return new SuccessResponse(bookRepository.save(fromDB));
  }

  @Override
  public Map<String, Object> delete(Long id) {
    Book fromDB = bookRepository.findById(id).orElse(null);
    if (fromDB == null) {
      throw new AppException(404, 44, "Error: Does not exist! Book not found!");
    }
    bookRepository.deleteById(id);
    final Map<String, Object> body = new HashMap<>();
    body.put("code", 0);
    body.put("message", "Successfully deleted!");
    return body;
  }
}
