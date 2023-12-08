package com.chien.bookWorld.service;

import java.util.Map;
import java.util.UUID;

import com.chien.bookWorld.dto.CommentUpdateDto;
import com.chien.bookWorld.payload.response.PageResponse;
import org.springframework.data.domain.Pageable;

import com.chien.bookWorld.dto.CommentCreationDto;
import com.chien.bookWorld.entity.Comment;
import com.chien.bookWorld.payload.response.SuccessResponse;

public interface CommentService extends GeneralService<Map<String, Object>, CommentCreationDto, Comment> {
    PageResponse getCommentByPost(Long postId, Pageable pageable);
    SuccessResponse createComment(CommentCreationDto  c);
    Boolean deleteComment(UUID id, Long postId);
    SuccessResponse updateComment(CommentUpdateDto commentUpdateDto);

}
