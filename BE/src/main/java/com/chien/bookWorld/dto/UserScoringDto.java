package com.chien.bookWorld.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class UserScoringDto {
    private String userName;
    private String urlAvatarUser;
    private String bookName;
    private Long idUser;
    private Timestamp timestamp;
    private Integer score;
}
