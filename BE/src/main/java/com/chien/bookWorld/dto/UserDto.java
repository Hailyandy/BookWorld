package com.chien.bookWorld.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDto {

  private Long id;

  private String userName;

  private String name;

  private String email;

  private String phone;

  private String birthDate;

  private String urlAvatar;

  private String nativePlace;

  private Boolean enabled;
}
