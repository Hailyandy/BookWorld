package com.chien.bookWorld.dto.DtoMap;

import org.modelmapper.PropertyMap;

import com.chien.bookWorld.dto.BookBastketDto;
import com.chien.bookWorld.entity.BookBasket;

public class BookBasketDtoMap extends PropertyMap<BookBasket, BookBastketDto> {

    @Override
    protected void configure() {
        // TODO Auto-generated method stub
        map().setBookName(source.getBook().getName());
        map().setBookId(source.getBook().getId());
        map().setUrlBook(source.getBook().getUrlPoster());
        map().setAuthorName(source.getBook().getUser().getName());
        map().setScoring(source.getBook().getScoring());

    }

}
