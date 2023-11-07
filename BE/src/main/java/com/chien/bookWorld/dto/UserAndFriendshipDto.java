package com.chien.bookWorld.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAndFriendshipDto {
    private Long id;

    private String username;

    private String name;

    private String email;

    private String phone;

    private String birthDate;

    private String urlAvatar;

    private String address;

    private Boolean enabled;

    private String friendship;
}
