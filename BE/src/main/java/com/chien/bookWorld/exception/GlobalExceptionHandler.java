package com.chien.bookWorld.exception;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.BindException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler({HttpRequestMethodNotSupportedException.class})
  public ResponseEntity<Map<String, Object>> handleHttpRequestMethodNotSupportedException(
      HttpRequestMethodNotSupportedException e) {
    System.out.println("Syntax error: " + e.getMessage());

    final Map<String, Object> body = new HashMap<>();
    body.put("code", 7);
    body.put("message", "Syntax error in the URL!");
    return ResponseEntity.status(400)
        .contentType(MediaType.parseMediaType(MediaType.APPLICATION_JSON_VALUE)).body(body);
  }

  @ExceptionHandler({BadCredentialsException.class})
  public ResponseEntity<Map<String, Object>> handleBadCredentialsException(
      BadCredentialsException e) {
    System.out.println("Credentials error: " + e.getMessage());

    final Map<String, Object> body = new HashMap<>();
    body.put("code", 1);
    body.put("message", "Incorrect password!");
    return ResponseEntity.status(401)
        .contentType(MediaType.parseMediaType(MediaType.APPLICATION_JSON_VALUE)).body(body);
  }

  @ExceptionHandler({HttpMessageNotReadableException.class})
  public ResponseEntity<Map<String, Object>> handleHttpMessageNotReadableException(
      HttpMessageNotReadableException e) {
    System.out.println("Body format error: " + e.getMessage());

    final Map<String, Object> body = new HashMap<>();
    body.put("code", 99);
    body.put("message",
        "The body must be in the format of a JSON object with all required parameters!");
    return ResponseEntity.status(400)
        .contentType(MediaType.parseMediaType(MediaType.APPLICATION_JSON_VALUE)).body(body);
  }

  @ExceptionHandler({AccessDeniedException.class})
  public ResponseEntity<Map<String, Object>> handleAccessDeniedException(AccessDeniedException e) {
    System.out.println("Forbidden error: " + e.getMessage());

    final Map<String, Object> body = new HashMap<>();
    body.put("code", 43);
    body.put("message", "Your account does not have permission to use this API!");
    return ResponseEntity.status(403)
        .contentType(MediaType.parseMediaType(MediaType.APPLICATION_JSON_VALUE)).body(body);
  }

  @ExceptionHandler({AppException.class})
  public ResponseEntity<Map<String, Object>> handleAppException(AppException e) {
    System.out.println("App error: " + e.getMessage());

    final Map<String, Object> body = new HashMap<>();
    body.put("code", e.getCode());
    body.put("message", e.getMessage());
    return ResponseEntity.status(e.getHttpStatusCode())
        .contentType(MediaType.parseMediaType(MediaType.APPLICATION_JSON_VALUE)).body(body);
  }

  @ExceptionHandler(BindException.class)
  public ResponseEntity<Map<String, Object>> handleBindException(BindException e) {
    String errorMessage = null;
    if (e.getBindingResult().hasErrors()) {
      errorMessage = e.getBindingResult().getAllErrors().get(0).getDefaultMessage();
      System.out.println(
          "Bind error: " + errorMessage);
    }
    final Map<String, Object> body = new HashMap<>();
    body.put("code", 2);
    body.put("message", "The parameter is not in the correct format! " + errorMessage);
    return ResponseEntity.status(400)
        .contentType(MediaType.parseMediaType(MediaType.APPLICATION_JSON_VALUE)).body(body);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<Map<String, Object>> handleUnwantedException(Exception e) {
    System.out.println("Unwanted error: " + e.getMessage());
    e.printStackTrace();

    final Map<String, Object> body = new HashMap<>();
    body.put("code", 50);
    body.put("message", "System error! " + e.getMessage());
    return ResponseEntity.status(500)
        .contentType(MediaType.parseMediaType(MediaType.APPLICATION_JSON_VALUE)).body(body);
  }
}
