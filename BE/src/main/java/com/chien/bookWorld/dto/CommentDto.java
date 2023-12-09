package com.chien.bookWorld.dto;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDto {

    private String content;
    private String id;
    private Instant createdOn;
    private Instant lastUpdatedOn;
    private Double commentScoring;
    private UUID parentId;
    private Long userId;
    private String urlAvatarUser;
    private String userName;
    private Long postId;

}
