package com.chien.bookWorld.service;

import com.chien.bookWorld.payload.response.PageResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.chien.bookWorld.dto.AuthorDto;
import com.chien.bookWorld.dto.UserCreationDto;
import com.chien.bookWorld.dto.UserDto;
import com.chien.bookWorld.dto.UserUpdateDto;
import com.chien.bookWorld.payload.response.SuccessResponse;

public interface AuthorService extends
        GeneralService<AuthorDto, UserCreationDto, UserUpdateDto>,
        UserDetailsService {
    SuccessResponse findByName(String name);

    PageResponse getBookByAuthor(Pageable pageable);

}
