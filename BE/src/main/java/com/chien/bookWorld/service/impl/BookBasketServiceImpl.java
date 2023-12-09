package com.chien.bookWorld.service.impl;

import com.chien.bookWorld.dto.*;
import com.chien.bookWorld.dto.DtoMap.BookBasketDtoMap;
import com.chien.bookWorld.entity.Book;
import com.chien.bookWorld.entity.BookBasket;
import com.chien.bookWorld.entity.User;
import com.chien.bookWorld.entity.UserDetailsImpl;
import com.chien.bookWorld.exception.AppException;
import com.chien.bookWorld.payload.response.PageResponse;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.repository.BookBasketRepository;
import com.chien.bookWorld.repository.BookRepository;
import com.chien.bookWorld.repository.UserRepository;
import com.chien.bookWorld.service.BookBasketService;
import com.chien.bookWorld.service.BookService;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.PropertyMapper.Source;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class BookBasketServiceImpl implements BookBasketService {

    private static final Logger logger = Logger.getLogger(BookBasketServiceImpl.class.getName());
    @Autowired
    private BookBasketRepository bookBasketRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private ModelMapper mapper;

    @Override
    public BookBasket create(BookBasket bookBasket) {
        return null;
    }

    @Override
    public PageResponse findAll(Pageable pageable) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        Page<BookBasket> bookBasketList = bookBasketRepository.findBookBasketByUser(userDetails.getId(), pageable);
        int totalPages = bookBasketList.getTotalPages();
        int numberPage = bookBasketList.getNumber();
        long totalRecord = bookBasketList.getTotalElements();
        int pageSize = bookBasketList.getSize();

        List<BookDto> bookList = bookBasketList.stream().map(book -> {
            BookDto bookDto = new BookDto();
            bookDto.setId(book.getBook().getId());
            bookDto.setName(book.getBook().getName());
            bookDto.setAuthorName(book.getUser().getUserName());
            bookDto.setAuthorId(book.getUser().getId());
            bookDto.setIntroducing(book.getBook().getIntroducing());
            bookDto.setNumberPages(book.getBook().getNumberPages());
            bookDto.setPublishDate(book.getBook().getPublishDate());
            bookDto.setPublisher(book.getBook().getPublisher());
            bookDto.setScoring(book.getBook().getScoring());
            bookDto.setUrlPoster(book.getBook().getUrlPoster());
            bookDto.setGenres(
                    book.getBook().getGenres().stream().map(genre -> mapper.map(genre, GenreDto.class)).collect(
                            Collectors.toList()));
            bookDto.setStatusWithUser(book.getStatus());
            return bookDto;
        }).collect(Collectors.toList());

        return new PageResponse(totalPages, pageSize, totalRecord, numberPage, bookList);
    }

    @Override
    public SuccessResponse statisticBookBasketStatus(int year) {
        List<Object[]> result = bookBasketRepository.statisticBookBasketStatus(year);
        return new SuccessResponse(result.stream().map(row -> {
            if (row[4] instanceof Long) {
                return new MonthlyStatusBookBasketDto(
                        (Integer) row[0],
                        year,
                        (Integer) row[2],
                        new BigDecimal((long) row[4]),
                        new BigDecimal((long) row[5]),
                        new BigDecimal((long) row[6]));
            } else {
                return new MonthlyStatusBookBasketDto(
                        (Integer) row[0],
                        year,
                        (Integer) row[2],
                        (BigDecimal) row[4],
                        (BigDecimal) row[5],
                        (BigDecimal) row[6]);
            }
        }).collect(Collectors.toList()));
    }

    @Override
    public SuccessResponse findById(Long id) {
        return null;

    }

    @Override
    public Map<String, Object> update(BookBasketUpdateDto bookBasketUpdateDto) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        BookBasket bookBasket = bookBasketRepository.findByUserAndBook(userDetails.getId(),
                bookBasketUpdateDto.getBookId());
        if (bookBasket != null) {
            bookBasket.setStatus(bookBasketUpdateDto.getStatus());
            bookBasketRepository.save(bookBasket);
        } else {
            BookBasket bookBasketCreate = new BookBasket(bookBasketUpdateDto.getBookId(), userDetails.getId());
            bookBasketCreate.setBook(bookRepository.findById(bookBasketUpdateDto.getBookId())
                    .orElseThrow(() -> new AppException(404, 44, "Error: không tìm thấy sách với id!")));
            bookBasketCreate.setUser(userRepository.findById(userDetails.getId())
                    .orElseThrow(() -> new AppException(404, 44, "Error: Không tìm thấy người dùng!")));

            bookBasketCreate.setStatus(bookBasketUpdateDto.getStatus());
            bookBasketRepository.save(bookBasketCreate);
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

    @Override
    public SuccessResponse findAll() {
        // TODO Auto-generated method stub
        return null;
    }

}
