package com.chien.bookWorld.service.impl;

import java.util.Map;
import java.util.logging.Logger;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.chien.bookWorld.dto.AuthorDto;
import com.chien.bookWorld.dto.UserCreationDto;
import com.chien.bookWorld.dto.UserDto;
import com.chien.bookWorld.dto.UserUpdateDto;
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

    @Override
    public SuccessResponse findByName(String name) {
        // TODO Auto-generated method stub
        return null;
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
        return null;
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
