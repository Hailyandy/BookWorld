package com.chien.bookWorld.service;

import com.chien.bookWorld.payload.request.LoginRequest;
import com.chien.bookWorld.payload.request.SignupRequest;
import com.chien.bookWorld.payload.response.SuccessResponse;
import java.util.Map;

public interface EmailService {

  void sendEmail(String to, String subject, String text);
}
