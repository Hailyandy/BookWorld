package com.chien.bookWorld.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Embeddable
public class LikesKey implements Serializable {

  @Column(name = "user_id")
  private Long userId;

  @Column(name = "post_id")
  private Long postId;
}
