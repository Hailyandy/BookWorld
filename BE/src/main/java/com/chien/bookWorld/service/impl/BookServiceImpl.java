package com.chien.bookWorld.service.impl;

import com.chien.bookWorld.dto.*;
import com.chien.bookWorld.entity.*;
import com.chien.bookWorld.exception.AppException;
import com.chien.bookWorld.payload.response.PageResponse;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.repository.*;
import com.chien.bookWorld.service.BookService;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.util.*;
import java.util.logging.Logger;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

@Service
@Component
public class BookServiceImpl implements BookService {

  private static final Logger logger = Logger.getLogger(BookServiceImpl.class.getName());

  @Autowired
  private BookRepository bookRepository;
  @Autowired
  private BookBasketRepository bookBasketRepository;
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PostRepository postRepository;

  @Autowired
  private GenreRepository genreRepository;

  @Autowired
  private PdfRepository pdfRepository;
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
    UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
        .getAuthentication().getPrincipal();
    Book book = bookRepository.findById(id).orElse(null);
    if (book == null) {
      throw new AppException(404, 44, "Error: Does not exist! Book not found!");
    } else {
      BookDetailDto bookDto = mapper.map(book, BookDetailDto.class);
      List<Pdf> pdfs = pdfRepository.findPdfByBook(id);
      List<PdfDto> pdfDtos = pdfs.stream().map(pdf -> {
        PdfDto pdfDto = new PdfDto();
        pdfDto.setUrlPdf(pdf.getUrlPdf());
        pdfDto.setUserName(pdf.getUser().getName());
        pdfDto.setId(pdf.getId());
        return pdfDto;

      }).collect(Collectors.toList());
      bookDto.setPdfs(pdfDtos);
      BookBasket bookBasket = bookBasketRepository.findByUserAndBook(userDetails.getId(), id);
      if (bookBasket != null) {
        bookDto.setStatusWithUser(bookBasket.getStatus());
      } else {
        bookDto.setStatusWithUser(null);
      }

      return new SuccessResponse(bookDto);
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
  public Object update(Book book) {
    return null;
  }


  @Override
  public PageResponse findByTitleOrAuthor(String name, Pageable pageable) {
    UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
        .getAuthentication().getPrincipal();
    User user = userRepository.findByUsername(userDetails.getUsername())
        .orElseThrow(
            () -> new AppException(404, 44,
                "Không tìm thấy tài khoản với username: " + userDetails.getUsername() + "!"));
    Page<Book> bookList = bookRepository.findByTitleOrAuthor(
        "%" + name + "%", pageable);
    int totalPages = bookList.getTotalPages();
    int numberPage = bookList.getNumber();
    long totalRecord = bookList.getTotalElements();
    int pageSize = bookList.getSize();
    List<BookDto> bookListDto = bookList.stream().map(book -> {
      BookDto bookDto = mapper.map(book, BookDto.class);
      BookBasket bookBasket = bookBasketRepository.findByUserAndBook(userDetails.getId(),
          book.getId());
      bookDto.setAuthorId(book.getUser().getId());
      bookDto.setAuthorName(book.getUser().getName());
      if (bookBasket != null) {
        bookDto.setStatusWithUser(bookBasket.getStatus());
      } else {
        bookDto.setStatusWithUser(null);
      }
      bookDto.setGenres(
          book.getGenres().stream().map(genre -> mapper.map(genre, GenreDto.class)).collect(
              Collectors.toList()));
      return bookDto;
    }).collect(Collectors.toList());
    if (bookListDto.isEmpty()) {
      throw new AppException(404, 44,
          "Không tìm thấy sách với tên sách hoặc tên tác giả chứa '" + name + "'!");
    }
    return new PageResponse(totalPages, pageSize, totalRecord, numberPage, bookListDto);
  }

  @Override
  public PageResponse findByTitleOrAuthorAndGenre(String name, Long genreId, Pageable pageable) {

    UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
        .getAuthentication().getPrincipal();
    User user = userRepository.findByUsername(userDetails.getUsername())
        .orElseThrow(
            () -> new AppException(404, 44,
                "Không tìm thấy tài khoản với username: " + userDetails.getUsername() + "!"));
    Page<Book> bookList = bookRepository.findByTitleOrAuthorAndGenre(
        "%" + name + "%", genreId, pageable);
    int totalPages = bookList.getTotalPages();
    int numberPage = bookList.getNumber();
    long totalRecord = bookList.getTotalElements();
    int pageSize = bookList.getSize();
    List<BookDto> bookListDto = bookList.stream().map(book -> {
      BookBasket bookBasket = bookBasketRepository.findByUserAndBook(userDetails.getId(),
          book.getId());
      BookDto bookDto = mapper.map(book, BookDto.class);
      bookDto.setAuthorId(book.getUser().getId());
      bookDto.setAuthorName(book.getUser().getName());
      if (bookBasket != null) {
        bookDto.setStatusWithUser(bookBasket.getStatus());
      } else {
        bookDto.setStatusWithUser(null);
      }
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
    return new PageResponse(totalPages, pageSize, totalRecord, numberPage, bookListDto);
  }

  @Override
  public PageResponse bookRecommendations(Pageable pageable) {
    UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
        .getAuthentication().getPrincipal();
    Collection<Long> genreIds = bookBasketRepository.findTheIDOfFavoriteGenre(userDetails.getId())
        .orElse(genreRepository.findAll().stream().map(Genre::getId).collect(Collectors.toList()));
    Page<Book> bookList = bookRepository.findSuitableBooks(userDetails.getId(), genreIds, pageable);
    int totalPages = bookList.getTotalPages();
    int numberPage = bookList.getNumber();
    long totalRecord = bookList.getTotalElements();
    int pageSize = bookList.getSize();
    List<BookDto> bookListDto = bookList.stream().map(book -> {
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
          "Không có sách gợi ý phù hơp!");
    }
    return new PageResponse(totalPages, pageSize, totalRecord, numberPage, bookListDto);
  }

  @Override
  public SuccessResponse updateBook(Long idBook, Map<Object, Object> fields) {
    UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
        .getAuthentication().getPrincipal();
    Book fromDB = bookRepository.findById(idBook).orElse(null);
    List<String> roles = userDetails.getAuthorities().stream()
        .map(GrantedAuthority::getAuthority).toList();
    boolean isAdmin = roles.contains("ROLE_ADMIN");
    if (fromDB == null) {
      throw new AppException(404, 44, "Error: Does not exist! Book not found!");
    }
    if (userDetails.getId() != fromDB.getUser().getId() && !isAdmin) {
      throw new AppException(404, 44, "Không phải tác giả của cuốn sách hoặc bạn ko là admin!");
    }
    fields.forEach((key, value) -> {
      Field field = ReflectionUtils.findField(Book.class, (String) key);
      field.setAccessible(true);
      Object convertedValue = convertToFieldType(field.getType(), value);
      ReflectionUtils.setField(field, fromDB, convertedValue);
    });
    Book updateBook = bookRepository.save(fromDB);
    return new SuccessResponse(mapper.map(updateBook, BookDto.class));
  }

  private Object convertToFieldType(Class<?> fieldType, Object value) {
    if (fieldType == Long.class && value instanceof Integer) {
      return ((Integer) value).longValue();
    }
    return value;
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

  @Override
  @Scheduled(fixedRate = 30 * 60 * 1000)
  public void updateBookScoring() {
    logger.info("test 30s");
    List<Object[]> averageScorings = postRepository.findAverageScoring();
    for (Object[] row : averageScorings) {
      Long bookId = (Long) row[0];

      BigDecimal bigDecimalValue = (BigDecimal) row[1];
      Double averageScoring = bigDecimalValue.doubleValue();

      if (bookId != null) {
        Book book = bookRepository.findById(bookId).orElse(null);
        if (book != null) {
          book.setScoring(averageScoring);
          bookRepository.save(book);
        }
      }
    }
  }

  @Override
  public SuccessResponse findTopBook() {
    List<Book> books = bookRepository.findTopBook();
    if (books.isEmpty()) {
      throw new AppException(404, 44, "Error: Does not exist! No book has been created yet!");
    } else {
      return new SuccessResponse(books.stream()
          .map(book -> mapper.map(book, BookDto.class)).collect(
              Collectors.toList()));
    }
  }

  @Override
  public PageResponse getBookList(Pageable pageable) {
    // TODO Auto-generated method stub
    Page<Book> bookList = bookRepository.findAllBook(pageable);
    int totalPages = bookList.getTotalPages();
    int numberPage = bookList.getNumber();
    long totalRecord = bookList.getTotalElements();
    int pageSize = bookList.getSize();
    if (bookList.isEmpty()) {
      throw new AppException(404, 44, "Error: Does not exist! No book has been created yet!");
    }
    List<BookDto> bookListDto = bookList.stream().map(book -> {
      BookDto bookDto = mapper.map(book, BookDto.class);
      bookDto.setAuthorId(book.getUser().getId());
      bookDto.setAuthorName(book.getUser().getName());
      bookDto.setGenres(
          book.getGenres().stream().map(genre -> mapper.map(genre, GenreDto.class)).collect(
              Collectors.toList()));
      return bookDto;
    }).collect(Collectors.toList());
    return new PageResponse(totalPages, pageSize, totalRecord, numberPage, bookListDto);
  }


}
