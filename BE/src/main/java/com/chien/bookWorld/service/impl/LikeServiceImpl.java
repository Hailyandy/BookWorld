package com.chien.bookWorld.service.impl;

import com.chien.bookWorld.entity.Likes;
import com.chien.bookWorld.entity.LikesKey;
import com.chien.bookWorld.entity.UserDetailsImpl;
import com.chien.bookWorld.exception.AppException;
import com.chien.bookWorld.repository.LikeRepository;
import com.chien.bookWorld.repository.PostRepository;
import com.chien.bookWorld.repository.UserRepository;
import com.chien.bookWorld.service.LikeService;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.HashMap;
import java.util.Map;

public class LikeServiceImpl implements LikeService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LikeRepository likeRepository;




    @Override
    public Map<String, Object> createLike(Long postId) {
        Likes likes = new Likes();
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        LikesKey likesKey = new LikesKey();
        likesKey.setPostId(postId);
        likesKey.setUserId(userDetails.getId());
        likes.setId(likesKey);
        likes.setPost(postRepository.findById(postId).orElseThrow(() -> new AppException(404, 44, "Error: không tìm thấy post!")));
        likes.setUser(userRepository.findById(userDetails.getId()).orElseThrow(() ->new AppException(404, 44, "Error: không tìm thấy user!")));
        likeRepository.save(likes);
        final Map<String, Object> body = new HashMap<>();
        body.put("code", 0);
        body.put("message", "like successfully!");
        return body;
    }

    @Override
    public Map<String, Object> deleteLike(Long postId) {
        return null;
    }
}
