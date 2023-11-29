package com.chien.bookWorld.service;

import com.chien.bookWorld.payload.response.PageResponse;
import org.springframework.data.domain.Pageable;

import com.chien.bookWorld.dto.BookBasketUpdateDto;
import com.chien.bookWorld.entity.BookBasket;
import com.chien.bookWorld.payload.response.SuccessResponse;

public interface BookBasketService extends
        GeneralService<BookBasket, BookBasket, BookBasketUpdateDto> {
    PageResponse findAll(Pageable pageable);
}
