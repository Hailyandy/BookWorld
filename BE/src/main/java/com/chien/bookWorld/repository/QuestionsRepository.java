package com.chien.bookWorld.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.chien.bookWorld.entity.Questions;

@Repository
public interface QuestionsRepository extends JpaRepository<Questions, UUID> {

    java.util.List<Questions> getQuestionsByBookId(Long bookId);
}
