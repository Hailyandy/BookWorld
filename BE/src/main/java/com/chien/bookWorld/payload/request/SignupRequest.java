package com.chien.bookWorld.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {

  @NotBlank
  @Size(max = 50)
  @Email(message = "Email không hợp lệ!")
  private String username;

  @NotBlank
  @Size(min = 6, max = 40)
  private String password;

  private Set<String> role;
}
