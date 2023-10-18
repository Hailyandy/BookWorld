package com.chien.bookWorld.service;

import com.chien.bookWorld.dto.OTPDto;
import com.chien.bookWorld.dto.OTPVerificationDto;
import com.chien.bookWorld.payload.request.LoginRequest;
import com.chien.bookWorld.payload.request.SignupRequest;
import com.chien.bookWorld.payload.response.SuccessResponse;
import java.util.Map;

public interface AuthService {

  SuccessResponse authenticateUser(LoginRequest loginRequest);

  Map<String, Object> registerUser(SignupRequest signUpRequest);
  Map<String, Object> sendOTP(OTPDto otpDto);
  Map<String, Object> otpVerification(OTPVerificationDto otpVerificationDto);
}
