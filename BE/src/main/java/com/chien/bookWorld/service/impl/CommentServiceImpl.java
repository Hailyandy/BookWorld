package com.chien.bookWorld.service.impl;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import com.chien.bookWorld.dto.CommentUpdateDto;
import com.chien.bookWorld.payload.response.PageResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.chien.bookWorld.dto.CommentCreationDto;
import com.chien.bookWorld.dto.CommentDto;
import com.chien.bookWorld.entity.Comment;
import com.chien.bookWorld.entity.Post;
import com.chien.bookWorld.entity.UserDetailsImpl;
import com.chien.bookWorld.exception.AppException;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.repository.CommentRepository;
import com.chien.bookWorld.repository.PostRepository;
import com.chien.bookWorld.repository.UserRepository;
import com.chien.bookWorld.service.CommentService;

@Service
public class CommentServiceImpl implements CommentService {

  private static final Logger logger = Logger.getLogger(CommentServiceImpl.class.getName());

  @Autowired
  private CommentRepository commentRepository;

  @Autowired
  private PostRepository postRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private ModelMapper mapper;

  @Override
  public Map<String, Object> create(CommentCreationDto c) {
    // TODO Auto-generated method stub
    final Map<String, Object> body = new HashMap<>();
    body.put("code", 0);
    body.put("message", "Comment success!");
    return body;
  }

  @Override
  public Map<String, Object> delete(Long id) {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public Boolean deleteComment(UUID id, Long postId) {
    Comment comment = commentRepository.findById(id).orElseThrow(
        () -> new AppException(404, 44, "comment not found!"));
    Post post = comment.getPost();
    commentRepository.delete(comment);
    List<Comment> comments = getRepliesByParentId(id);
    if (!comments.isEmpty()) {
      for (Comment reply : comments) {
        deleteComment(reply.getId(), postId);
      }
    }
    Long totalComment = post.getTotalComment();
    totalComment = totalComment - 1;
    post.setTotalComment(totalComment);
    postRepository.save(post);
    return true;
  }

  public List<Comment> getRepliesByParentId(UUID parentId) {
    List<Comment> comments = commentRepository.findByParentId(parentId);
    return comments;
  }

  @Override
  public SuccessResponse findAll() {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public SuccessResponse findById(Long id) {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public Object update(Comment u) {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public PageResponse getCommentByPost(Long postId, Pageable pageable) {
    // TODO Auto-generated method stub
    Page<Comment> comments = commentRepository.findByPostId(postId, pageable);
    int totalPages = comments.getTotalPages();
    int numberPage = comments.getNumber();
    long totalRecord = comments.getTotalElements();
    int pageSize = comments.getSize();
    List<CommentDto> commentDtos = comments.stream().map(comment -> {
      CommentDto commentDto = mapper.map(comment, CommentDto.class);
      commentDto.setPostId(comment.getPost().getId());
      commentDto.setUserName(comment.getUser().getName());
      commentDto.setUrlAvatarUser(comment.getUser().getUrlAvatar());
      commentDto.setUserId(comment.getUser().getId());
      return commentDto;
    }).collect(Collectors.toList());
    return new PageResponse(totalPages, pageSize, totalRecord, numberPage, commentDtos);
  }

  @Override
  public SuccessResponse createComment(CommentCreationDto c) {
    UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
        .getAuthentication().getPrincipal();
    Comment comment = new Comment();
    comment.setContent(c.getContent());
    comment.setParentId(c.getParentId());
    logger.info(c.getPostId().toString());
    comment.setPost(postRepository.findById(c.getPostId())
        .orElseThrow(() -> new AppException(404, 44, "Post not found!")));
    Instant now = Instant.now();
    comment.setCreatedOn(now);
    comment.setId(UUID.randomUUID());
    comment.setUser(userRepository.findById(userDetails.getId())
        .orElseThrow(() -> new AppException(404, 44, "User not found!")));
    Comment comment1 = commentRepository.save(comment);

    // update total comment post
    Post post = postRepository.findById(c.getPostId())
        .orElseThrow(() -> new AppException(404, 44, "Post not found!"));
    Long totalComment = post.getTotalComment() + 1;
    post.setTotalComment(totalComment);
    postRepository.save(post);
    CommentDto commentDto = mapper.map(comment1, CommentDto.class);
    commentDto.setUserId(comment1.getUser().getId());
    commentDto.setPostId(comment1.getPost().getId());
    commentDto.setUserName(comment1.getUser().getName());
    commentDto.setUrlAvatarUser(comment1.getUser().getUrlAvatar());
    return new SuccessResponse(commentDto);
  }

  @Override
  public SuccessResponse updateComment(CommentUpdateDto commentUpdateDto) {
    Comment comment = commentRepository.findById(commentUpdateDto.getId()).orElseThrow(
        () -> new AppException(404, 44, "comment not found!"));
    comment.setContent(commentUpdateDto.getContent());
    Comment commentUpdate = commentRepository.save(comment);
    CommentDto commentDto = mapper.map(commentUpdate, CommentDto.class);
    commentDto.setUserId(commentUpdate.getUser().getId());
    commentDto.setPostId(commentUpdate.getPost().getId());
    commentDto.setUserName(commentUpdate.getUser().getName());
    commentDto.setUrlAvatarUser(commentUpdate.getUser().getUrlAvatar());
    return new SuccessResponse(commentDto);
  }

}
