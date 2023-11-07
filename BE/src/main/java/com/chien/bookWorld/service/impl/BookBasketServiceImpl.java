package com.chien.bookWorld.service.impl;

import com.chien.bookWorld.dto.BookBasketUpdateDto;
import com.chien.bookWorld.dto.BookBasketDto;
import com.chien.bookWorld.dto.BookDto;
import com.chien.bookWorld.dto.DtoMap.BookBasketDtoMap;
import com.chien.bookWorld.entity.Book;
import com.chien.bookWorld.entity.BookBasket;
import com.chien.bookWorld.entity.User;
import com.chien.bookWorld.entity.UserDetailsImpl;
import com.chien.bookWorld.exception.AppException;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.repository.BookBasketRepository;
import com.chien.bookWorld.repository.BookRepository;
import com.chien.bookWorld.repository.UserRepository;
import com.chien.bookWorld.service.BookBasketService;
import com.chien.bookWorld.service.BookService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.PropertyMapper.Source;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class BookBasketServiceImpl implements BookBasketService {

  @Autowired
  private BookBasketRepository bookBasketRepository;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private ModelMapper mapper;

  @Override
  public BookBasket create(BookBasket bookBasket) {
    return null;
  }

  @Override
  public SuccessResponse findAll() {
    UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
        .getAuthentication().getPrincipal();
    List<BookBasket> bookBasketList = bookBasketRepository.findBookBasketByUser(userDetails.getId());

    if (bookBasketList.isEmpty()) {
      return new SuccessResponse(null);
    } else {
      TypeMap<BookBasket, BookBasketDto> typeMap = mapper.getTypeMap(BookBasket.class, BookBasketDto.class);
      if (typeMap == null) {
        mapper.addMappings(new BookBasketDtoMap());
      }
      return new SuccessResponse(bookBasketList.stream()
          .map(book -> mapper.map(book, BookBasketDto.class)).collect(
              Collectors.toList()));
    }
  }

  @Override
  public SuccessResponse findById(Long id) {
    return null;

  }

  @Override
  public Map<String, Object> update(BookBasketUpdateDto bookBasketUpdateDto) {
    UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
        .getAuthentication().getPrincipal();

    Integer rowCount = bookBasketRepository.update(bookBasketUpdateDto.getBookId(),
        userDetails.getId(),
        bookBasketUpdateDto.getStatus());
    if (rowCount == 0) {
      bookBasketRepository.create(bookBasketUpdateDto.getBookId(),
          userDetails.getId(),
          bookBasketUpdateDto.getStatus());
      // throw new AppException(404, 44,
      // "Không tìm thấy bản ghi với id sách là " + bookBasketUpdateDto.getBookId()
      // + " và id tài khoản là " + userDetails.getId() + "!");
    }

    final Map<String, Object> body = new HashMap<>();
    body.put("code", 0);
    body.put("message", "Successfully!");
    return body;
  }

  @Override
  public Map<String, Object> delete(Long id) {
    return null;
  }
}
