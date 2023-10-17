package com.chien.bookWorld.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthorDto {
    private Long id;

    private String name;
    private String urlAvatar;
    private String birthDate;
    private String phone;
    private String nativePlace;
    private String introducing;
    private String totalBook;
}
