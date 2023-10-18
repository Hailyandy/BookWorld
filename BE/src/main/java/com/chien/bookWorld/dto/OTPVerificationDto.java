package com.chien.bookWorld.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class OTPVerificationDto {

  @NotBlank
  @Size(max = 50)
  @Email(message = "Email không hợp lệ!")
  private String username;

  @NotBlank
  private String otp;
}
