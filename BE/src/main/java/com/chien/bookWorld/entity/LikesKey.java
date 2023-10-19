package com.chien.bookWorld.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class LikesKey implements Serializable {

  @Column(name = "user_id")
  private Long userId;

  @Column(name = "post_id")
  private Long postId;
}
