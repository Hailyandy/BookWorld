package com.chien.bookWorld.payload.response;

import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {

  private String token;
  private String type = "Bearer";
  private Long id;
  private String username;
  private List<Map<String, Object>> roles;

  public JwtResponse(String accessToken, Long id, String username,
      List<Map<String, Object>> roles) {
    this.token = accessToken;
    this.id = id;
    this.username = username;
    this.roles = roles;
  }
}
