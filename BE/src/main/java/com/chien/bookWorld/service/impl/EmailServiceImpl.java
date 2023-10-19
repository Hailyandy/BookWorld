package com.chien.bookWorld.service.impl;

import com.chien.bookWorld.entity.ERole;
import com.chien.bookWorld.entity.Role;
import com.chien.bookWorld.entity.User;
import com.chien.bookWorld.entity.UserDetailsImpl;
import com.chien.bookWorld.exception.AppException;
import com.chien.bookWorld.jwt.JwtUtils;
import com.chien.bookWorld.payload.request.LoginRequest;
import com.chien.bookWorld.payload.request.SignupRequest;
import com.chien.bookWorld.payload.response.JwtResponse;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.repository.RoleRepository;
import com.chien.bookWorld.repository.UserRepository;
import com.chien.bookWorld.service.AuthService;
import com.chien.bookWorld.service.EmailService;
import com.fasterxml.jackson.databind.JsonSerializer.None;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {
  @Autowired
  private JavaMailSender javaMailSender;

  @Override
  public void sendEmail(String to, String subject, String text) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setFrom("tempab102@gmail.com");
    message.setTo(to);
    message.setSubject(subject);
    message.setText(text);
    javaMailSender.send(message);
  }
}
