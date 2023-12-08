package com.chien.bookWorld.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class  SuccessResponse {

  private Long code = 0L;
  private String message = "Thành công!";
  private Object data;

  public SuccessResponse(Object data) {
    this.data = data;
  }
}
