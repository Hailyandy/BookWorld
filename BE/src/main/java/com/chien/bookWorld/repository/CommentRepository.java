package com.chien.bookWorld.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.chien.bookWorld.entity.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, UUID> {
    Page<Comment> findByPostId(Long postId, Pageable pageable);

    @Query(nativeQuery = true, value = "SELECT * FROM comment where parent_id = :parentId")
    List<Comment> findByParentId(UUID parentId);
}
