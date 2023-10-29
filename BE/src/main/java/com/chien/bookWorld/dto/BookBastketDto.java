package com.chien.bookWorld.dto;

import com.chien.bookWorld.entity.BookBasketKey;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookBastketDto {
    private BookBasketKey id;
    private String bookName;
    private String status;
    private Long bookId;
    private String urlBook;
    private Double scoring;
    private String authorName;

}
