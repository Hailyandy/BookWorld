package com.chien.bookWorld.controller;

import com.chien.bookWorld.dto.OTPDto;
import com.chien.bookWorld.dto.OTPVerificationDto;
import com.chien.bookWorld.payload.request.LoginRequest;
import com.chien.bookWorld.payload.request.SignupRequest;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.service.AuthService;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import java.util.Map;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "https://hailyandy.github.io/BookWorld/", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  private AuthService authService;

  @Operation(summary = "Signin")
  @PostMapping("/signin")
  @JsonPropertyOrder(value = { "code", "message", "data" })
  public ResponseEntity<SuccessResponse> authenticateUser(
      @Valid @RequestBody LoginRequest loginRequest) {
    return ResponseEntity.ok(authService.authenticateUser(loginRequest));
  }

  @Operation(summary = "Signup")
  @PostMapping("/signup")
  public ResponseEntity<Map<String, Object>> registerUser(
      @Valid @RequestBody SignupRequest signUpRequest) {
    return ResponseEntity.ok(authService.registerUser(signUpRequest));
  }

  @Operation(summary = "Tạo lại OTP")
  @PutMapping("/getOtp")
  public ResponseEntity<Map<String, Object>> sendOTP(
      @Valid @RequestBody OTPDto otpDto) {
    return ResponseEntity.ok(authService.sendOTP(otpDto));
  }

  @Operation(summary = "Xác thực OTP")
  @PutMapping("/otpVerification")
  public ResponseEntity<Map<String, Object>> otpVerification(
      @Valid @RequestBody OTPVerificationDto otpVerificationDto) {
    return ResponseEntity.ok(authService.otpVerification(otpVerificationDto));
  }
}
