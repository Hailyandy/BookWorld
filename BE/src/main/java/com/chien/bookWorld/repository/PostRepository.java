package com.chien.bookWorld.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import org.springframework.stereotype.Repository;

import com.chien.bookWorld.entity.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

  @Query(nativeQuery = true, value = "SELECT book_id, AVG(scoring) AS average_scoring FROM post WHERE scoring IS NOT NULL Group BY book_id")
  List<Object[]> findAverageScoring();

  Page<Post> findAllByOrderByTimestampDesc(Pageable pageable);

  @Query(nativeQuery = true, value = "SELECT p.*\n" + //
      "FROM post p\n" + //
      "JOIN user u ON p.user_id = u.id\n" + //
      "JOIN friendship f ON (p.user_id = f.id_sender OR p.user_id = f.id_receiver)\n" + //
      "WHERE (f.id_sender = :userId OR f.id_receiver = :userId)\n" + //
      "  AND f.status = 'ACCEPTED' ORDER BY p.timestamp DESC")
  Page<Post> getPostByFriend(@Param("userId") Long userId, Pageable pageable);

  @Query(nativeQuery = true, value = "SELECT * FROM post where user_id = :userId order by timestamp desc")
  Page<Post> getPostByUser(@Param("userId") Long userId, Pageable pageable);
}
