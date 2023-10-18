package com.chien.bookWorld.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class BookBasketKey implements Serializable {

  @Column(name = "book_id")
  private Long bookId;

  @Column(name = "user_id")
  private Long userId;
}
