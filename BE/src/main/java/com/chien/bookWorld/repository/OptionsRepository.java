package com.chien.bookWorld.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.chien.bookWorld.entity.Options;

import java.util.List;
import java.util.UUID;

@Repository
public interface OptionsRepository extends JpaRepository<Options, Long> {
    @Query(nativeQuery = true, value = "SELECT * FROM options\n" +
            "where question_id = :questionId")
    List<Options> findByQuestionId(@Param("questionId") UUID questionId);

    @Query(nativeQuery = true,
        value = "SELECT o.* FROM options o join questions q on o.question_id = q.id where o.is_correct = 1 and q.book_id = :idBook")
    List<Options> findByIdBookAndIsCorrect(@Param("idBook") Long idBook);
 }
