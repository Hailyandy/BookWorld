package com.chien.bookWorld.service.impl;

import java.util.List;
import java.util.Map;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import com.chien.bookWorld.dto.*;
import com.chien.bookWorld.entity.Book;
import com.chien.bookWorld.entity.BookBasket;
import com.chien.bookWorld.entity.UserDetailsImpl;
import com.chien.bookWorld.payload.response.PageResponse;
import com.chien.bookWorld.repository.BookBasketRepository;
import com.chien.bookWorld.repository.BookRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.chien.bookWorld.entity.User;
import com.chien.bookWorld.exception.AppException;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.repository.UserRepository;
import com.chien.bookWorld.service.AuthorService;

@Service
public class AuthorServiceImpl implements AuthorService {
    private static final Logger logger = Logger.getLogger(AuthorServiceImpl.class.getName());

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper mapper;


    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookBasketRepository bookBasketRepository;

    @Override
    public SuccessResponse findByName(String name) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public PageResponse getBookByAuthor(Pageable pageable) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        Page<Book> bookList = bookRepository.findBookByAuthor(pageable, userDetails.getId());
        int totalPages = bookList.getTotalPages();
        int numberPage = bookList.getNumber();
        long totalRecord = bookList.getTotalElements();
        int pageSize = bookList.getSize();

        List<BookDto> bookListDto = bookList.stream().map(book -> {
            BookDto bookDto = mapper.map(book, BookDto.class);
            BookBasket bookBasket = bookBasketRepository.findByUserAndBook(userDetails.getId(), book.getId());
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
        return new PageResponse(totalPages, pageSize, totalRecord, numberPage, bookListDto);
    }

    @Override
    public AuthorDto create(UserCreationDto c) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Map<String, Object> delete(Long id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public SuccessResponse findAll() {
        // TODO Auto-generated method stub
        List<User> listUser = userRepository.findUserRoleAuthor();

        return new SuccessResponse(
                listUser.stream()
                        .map(user -> mapper.map(user, UserDto.class)).collect(
                                Collectors.toList())
        );
    }

    @Override
    public SuccessResponse findById(Long id) {

        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            throw new AppException(404, 44, "Error: Does not exist! User not found!");
        } else {
            return new SuccessResponse(mapper.map(user, AuthorDto.class));
        }
    }

    @Override
    public SuccessResponse update(UserUpdateDto u) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // TODO Auto-generated method stub
        return null;
    }

}
