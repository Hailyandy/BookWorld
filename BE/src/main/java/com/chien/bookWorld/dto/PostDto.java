package com.chien.bookWorld.dto;

import com.chien.bookWorld.entity.Comment;
import com.chien.bookWorld.entity.Likes;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.time.Instant;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SourceType;
import org.hibernate.annotations.UpdateTimestamp;

@Setter
@Getter
public class PostDto {
  private Long id;
  private Long bookId;
  private Long pdfId;
  private Long userId;
  private Long scoring;
  private String content;
  private Long totalLike;
  private Long totalComment;
  private Instant createdOn;
  private Instant lastUpdatedOn;
  private String userName;
  private String urlAvatarUser;
}
