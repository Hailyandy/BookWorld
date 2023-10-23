package com.chien.bookWorld.controller;

import com.chien.bookWorld.dto.BookCreationDto;
import com.chien.bookWorld.dto.BookDto;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.entity.Book;
import com.chien.bookWorld.service.BookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RestController
@RequestMapping("/api/book")
@SecurityRequirement(name = "javainuseapi")
public class BookController {

  @Autowired
  private BookService bookService;

  @PreAuthorize("hasRole('ADMIN')")
  @PostMapping
  public ResponseEntity<SuccessResponse> create(
      @RequestBody @Validated BookCreationDto bookCreationDto) {
    return ResponseEntity.status(200)
        .body(new SuccessResponse(bookService.create(bookCreationDto)));
  }

  @Operation(summary = "Find by title or author")
  @PreAuthorize("hasRole('ADMIN') or hasRole('AUTHOR') or hasRole('USER')")
  @GetMapping("/{name}")
  public ResponseEntity<SuccessResponse> findByTitleOrAuthor(@PathVariable String name) {
    return ResponseEntity.status(200).body(bookService.findByTitleOrAuthor(name));
  }

  @Operation(summary = "Find by title or author and genre")
  @PreAuthorize("hasRole('ADMIN') or hasRole('AUTHOR') or hasRole('USER')")
  @GetMapping("/{name}/{genreId}")
  public ResponseEntity<SuccessResponse> findByTitleOrAuthorAndGenre(@PathVariable String name,
      @PathVariable Long genreId) {
    return ResponseEntity.status(200).body(bookService.findByTitleOrAuthorAndGenre(name, genreId));
  }

  @Operation(summary = "Gợi ý sách")
  @PreAuthorize("hasRole('USER')")
  @GetMapping
  public ResponseEntity<SuccessResponse> bookRecommendations() {
    return ResponseEntity.status(200).body(bookService.bookRecommendations());
  }

  // @Operation(summary = "Update book")
  // @PreAuthorize("hasRole('LIBRARIAN')")
  // @PutMapping
  // public ResponseEntity<SuccessResponse> updateBook(@RequestBody @Validated
  // BookCategoriesUpdateDto bookCategoriesUpdateDto) {
  // return
  // ResponseEntity.status(200).body(bookCategoriesService.update(bookCategoriesUpdateDto));
  // }
  //
  // @Operation(summary = "Delete book")
  // @PreAuthorize("hasRole('LIBRARIAN')")
  // @DeleteMapping("/{id:[0-9]{1,32}}")
  // public ResponseEntity<Map<String, Object>> deleteBook(@PathVariable Long id)
  // {
  // return ResponseEntity.status(200).body(bookCategoriesService.delete(id));
  // }

  @GetMapping("/top")
  @PreAuthorize("hasRole('ADMIN') or hasRole('AUTHOR') or hasRole('USER')")
  public ResponseEntity<SuccessResponse> findTopBook() {
    return ResponseEntity.status(200).body(bookService.findTopBook());
  }

  @GetMapping("/search/{id}")
  @PreAuthorize("hasRole('ADMIN') or hasRole('AUTHOR') or hasRole('USER')")
  public ResponseEntity<SuccessResponse> getBookById(@PathVariable Long id) {
    return ResponseEntity.status(200).body(bookService.findById(id));
  }

}
