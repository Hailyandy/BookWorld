package com.chien.bookWorld.service;

import java.util.Map;

public interface LikeService {
    Map<String, Object> createLike(Long postId);
    Map<String, Object> deleteLike(Long postId);
}
