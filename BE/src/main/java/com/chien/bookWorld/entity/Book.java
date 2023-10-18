package com.chien.bookWorld.entity;

import com.chien.bookWorld.dto.BookCreationDto;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
public class Book {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;
  private Long numberPages;
  private String publisher;
  private LocalDateTime publishDate;
  @Column(name = "introducing", length = 65535)
  private String introducing;
  private String urlPoster;
  private Long scoring;

  @ManyToOne
  @JoinColumn(name = "user_id")
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  private User user;

  @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
  private Set<BookBasket> bookBaskets;

  @ManyToMany
  @JoinTable(name = "book_genre", joinColumns = @JoinColumn(name = "book_id"), inverseJoinColumns = @JoinColumn(name = "genre_id"))
  private Set<Genre> genres;

  public Book(BookCreationDto bookCreationDto) {
    this.name = bookCreationDto.getName();
    this.numberPages = bookCreationDto.getNumberPages();
    this.publisher = bookCreationDto.getPublisher();
    this.publishDate = bookCreationDto.getPublishDate();
    this.introducing = bookCreationDto.getIntroducing();
    this.urlPoster = bookCreationDto.getUrlPoster();
  }
}
