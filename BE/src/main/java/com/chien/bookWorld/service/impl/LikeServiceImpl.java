package com.chien.bookWorld.service.impl;

import com.chien.bookWorld.entity.Likes;
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
        return null;
    }

    @Override
    public Map<String, Object> deleteLike(Long postId) {
        return null;
    }
}
