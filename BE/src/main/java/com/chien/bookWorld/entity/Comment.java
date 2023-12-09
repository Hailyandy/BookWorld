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

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Comment {

  @Id
  private UUID id;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne
  @JoinColumn(name = "post_id")
  private Post post;

  @Column(name = "introducing", length = 65535)
  private String content;

  private Timestamp createdOn;
  private Timestamp lastUpdatedOn;
  private Double commentScoring;
  private UUID parentId;

  @PrePersist
  public void prePerist() {
    this.createdOn = Timestamp.from(Instant.now());
  }

  @PreUpdate
  public void preUpdate() {this.lastUpdatedOn = Timestamp.from(Instant.now());}
}
