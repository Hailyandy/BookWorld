package com.chien.bookWorld.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.UUID;

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
public class Comment {

  @Id
@Column(unique = true, nullable = false)
  private UUID id;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne
  @JoinColumn(name = "post_id")
  private Post post;

  @Column(name = "introducing", length = 65535)
  private String content;

  @CreationTimestamp(source = SourceType.DB)
  private Instant createdOn;
  @UpdateTimestamp(source = SourceType.DB)
  private Instant lastUpdatedOn;
  private Double commentScoring;
  private UUID parentId;
}
