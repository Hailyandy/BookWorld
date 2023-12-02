package com.chien.bookWorld.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.chien.bookWorld.entity.Scoring;

import java.util.List;

@Repository
public interface ScoringRepository extends JpaRepository<Scoring, Long> {

    @Query(nativeQuery = true, value = "SELECT id, user_id, book_id, score, timestamp\n" +
            "FROM (\n" +
            "    SELECT\n" +
            "\t\tid,\n" +
            "        user_id,\n" +
            "        book_id,\n" +
            "        score,\n" +
            "        timestamp,\n" +
            "        ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY score DESC) AS rnk\n" +
            "    FROM\n" +
            "        scoring\n" +
            "where book_id = :idBook" +
            ") AS RankedScores\n" +
            "WHERE rnk = 1")
    Page<Scoring> getScoringTopByBook(Pageable pageable, @Param("idBook") Long idBook);
}
