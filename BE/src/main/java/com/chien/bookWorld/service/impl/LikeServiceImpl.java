package com.chien.bookWorld.service.impl;

import com.chien.bookWorld.entity.Likes;
import com.chien.bookWorld.exception.AppException;
import com.chien.bookWorld.repository.PostRepository;
import com.chien.bookWorld.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

public class LikeServiceImpl implements LikeService {

    @Autowired
    private PostRepository postRepository;




    @Override
    public Map<String, Object> createLike(Long postId) {
        Likes likes = new Likes();
        likes.setPost(postRepository.findById(postId).orElseThrow(() -> new AppException(404, 44, "Error: Does not exist! Book not found!")));
        return null;
    }

    @Override
    public Map<String, Object> deleteLike(Long postId) {
        return null;
    }
}
