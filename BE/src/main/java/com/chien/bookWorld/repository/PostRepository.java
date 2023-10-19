package com.chien.bookWorld.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import org.springframework.stereotype.Repository;

import com.chien.bookWorld.entity.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

  @Query(nativeQuery = true, value = "SELECT book_id, AVG(scoring) AS average_scoring FROM post WHERE scoring IS NOT NULL Group BY book_id")
  List<Object[]> findAverageScoring();

}
