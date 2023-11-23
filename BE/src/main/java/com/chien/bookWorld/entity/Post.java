package com.chien.bookWorld.entity;

import com.chien.bookWorld.dto.PostCreationDto;
import com.chien.bookWorld.dto.PostStatus;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SourceType;
import org.hibernate.annotations.UpdateTimestamp;
import org.checkerframework.common.aliasing.qual.Unique;
import jakarta.validation.constraints.NotNull;
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Post {

  @Id
@Column(unique = true, nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "book_id")
  private Book book;

  @ManyToOne
  @JoinColumn(name = "pdf_id")
  private Pdf pdf;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  private Long scoring;
  @Column(name = "introducing", length = 65535)
  private String content;
  private Long totalLike;
  private Long totalComment;
  private Timestamp timestamp;
  @CreationTimestamp(source = SourceType.DB)
  private Instant createdOn;
  @UpdateTimestamp(source = SourceType.DB)
  private Instant lastUpdatedOn;

  @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
  private Set<Likes> likes;

  @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
  private Set<Comment> comments;

  public Post(PostCreationDto postCreationDto) {
    this.scoring = postCreationDto.getScoring();
    this.content = postCreationDto.getContent();
  }
}
