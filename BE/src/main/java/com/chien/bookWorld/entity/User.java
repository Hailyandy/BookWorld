package com.chien.bookWorld.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.checkerframework.common.aliasing.qual.Unique;
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class User {

  @Id
@Column(unique = true, nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String userName;
  private String password;
  private String name;
  private String urlAvatar;
  private String birthDate;
  private String phone;
  private String nativePlace;
  private String introducing;
  private String verificationCode;
  private Boolean enabled = false;
  private Integer totalBook;

  public User(String userName, String password) {
    this.userName = userName;
    this.password = password;
  }

  @ManyToMany
  @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> roles;

  @ManyToMany
  @JoinTable(name = "likes", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "post_id"))
  private Set<Post> posts;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private Set<Likes> likes;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private Set<Comment> comments;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private Set<Book> books;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private Set<BookBasket> bookBaskets;

  @Column(name = "registration_date")
  private Timestamp registrationDate;

  @PrePersist
  public void prePerist() {
      this.registrationDate = Timestamp.from(Instant.now());
  }
}
