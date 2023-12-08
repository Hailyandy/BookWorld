package com.chien.bookWorld.repository;

import com.chien.bookWorld.entity.Likes;
import com.chien.bookWorld.entity.LikesKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Likes, LikesKey> {
}
