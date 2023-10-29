package com.chien.bookWorld.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chien.bookWorld.dto.BookDto;
import com.chien.bookWorld.dto.GenreDto;
import com.chien.bookWorld.dto.UserDto;
import com.chien.bookWorld.entity.Genre;
import com.chien.bookWorld.exception.AppException;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.repository.GenreRepository;
import com.chien.bookWorld.service.GenreService;

@Service
public class GenreServiceImpl implements GenreService {

    @Autowired
    private GenreRepository genreRepository;

    @Autowired
    private ModelMapper mapper;

    @Override
    public Map<String, Object> delete(Long id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public SuccessResponse findAll() {
        List<Genre> genres = genreRepository.findAll();
        if (genres.isEmpty()) {
            return new SuccessResponse(new ArrayList<>());
        } else {
            return new SuccessResponse(
                    genres.stream()
                            .map(user -> mapper.map(user, GenreDto.class)).collect(
                                    Collectors.toList()));
        }
    }

    @Override
    public SuccessResponse findById(Long id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Object update(Genre u) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public GenreDto create(GenreDto c) {
        // TODO Auto-generated method stub
        return null;
    }

}
