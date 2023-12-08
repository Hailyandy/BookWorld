package com.chien.bookWorld.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "id")
public class BookBasket {

  @EmbeddedId
  BookBasketKey id;

  @ManyToOne
  @MapsId("bookId")
  @JoinColumn(name = "book_id")
  private Book book;

  @ManyToOne
  @MapsId("userId")
  @JoinColumn(name = "user_id")
  private User user;

  private String status;

  private Timestamp timestamp;

  public BookBasket(Long bookId, Long userId){
    this.id = new BookBasketKey(bookId, userId);
  }

  @PrePersist
  @PreUpdate
  public void prePerist() {
    this.timestamp = Timestamp.from(Instant.now());
  }
}
