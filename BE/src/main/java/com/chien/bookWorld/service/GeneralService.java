package com.chien.bookWorld.service;

import com.chien.bookWorld.payload.response.SuccessResponse;
import java.util.Map;

public interface GeneralService<D, C, U> {
  D create(C c);

  SuccessResponse findById(Long id);

  SuccessResponse findAll();

  SuccessResponse update(U u);

  Map<String, Object> delete(Long id);
}
