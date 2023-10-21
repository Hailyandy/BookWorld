package com.chien.bookWorld.service.impl;

import com.chien.bookWorld.dto.BookCreationDto;
import com.chien.bookWorld.dto.BookDto;
import com.chien.bookWorld.dto.GenreDto;
import com.chien.bookWorld.dto.PostCreationDto;
import com.chien.bookWorld.entity.Book;
import com.chien.bookWorld.entity.Post;
import com.chien.bookWorld.entity.User;
import com.chien.bookWorld.entity.UserDetailsImpl;
import com.chien.bookWorld.exception.AppException;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.repository.BookRepository;
import com.chien.bookWorld.repository.GenreRepository;
import com.chien.bookWorld.repository.PdfRepository;
import com.chien.bookWorld.repository.PostRepository;
import com.chien.bookWorld.repository.UserRepository;
import com.chien.bookWorld.service.BookService;
import com.chien.bookWorld.service.PostService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class PostServiceImpl implements PostService {

  @Autowired
  private BookRepository bookRepository;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private PdfRepository pdfRepository;
  @Autowired
  private PostRepository postRepository;
  @Autowired
  private GenreRepository genreRepository;
  @Autowired
  private ModelMapper mapper;

  @Override
  public Map<String, Object> create(PostCreationDto postCreationDto) {
    if (postCreationDto.getBookId() == null && postCreationDto.getPdfId() == null) {
      throw new AppException(400, 2,
          "Id sách và id pdf không được đồng thời null!");
    }

    Post post = new Post(postCreationDto);

    UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
        .getAuthentication().getPrincipal();
    post.setUser(userRepository.findById(userDetails.getId())
        .orElseThrow(() -> new AppException(404, 44,
            "Không tìm thấy tài khoản với id '" + userDetails.getId() + "'!")));

    if (postCreationDto.getBookId() != null && postCreationDto.getPdfId() == null) {
      post.setBook(bookRepository.findById(postCreationDto.getBookId())
          .orElseThrow(() -> new AppException(404, 44,
              "Không tìm thấy sách với id '" + postCreationDto.getBookId() + "'!")));
    } else {
      post.setPdf(pdfRepository.findById(postCreationDto.getPdfId())
          .orElseThrow(() -> new AppException(404, 44,
              "Không tìm thấy pdf với id '" + postCreationDto.getPdfId() + "'!")));
    }

    postRepository.save(post);

    final Map<String, Object> body = new HashMap<>();
    body.put("code", 0);
    body.put("message", "Tạo post thành công!");
    return body;
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
