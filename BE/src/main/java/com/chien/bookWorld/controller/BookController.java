package com.chien.bookWorld.controller;

import com.chien.bookWorld.dto.BookCreationDto;
import com.chien.bookWorld.dto.BookDto;
import com.chien.bookWorld.payload.response.PageResponse;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.entity.Book;
import com.chien.bookWorld.service.BookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

 
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
  public ResponseEntity<PageResponse> findByTitleOrAuthor(@PathVariable String name, Pageable pageable) {
    return ResponseEntity.status(200).body(bookService.findByTitleOrAuthor(name, pageable));
  }

  @Operation(summary = "Find by title or author and genre")
  @PreAuthorize("hasRole('ADMIN') or hasRole('AUTHOR') or hasRole('USER')")
  @GetMapping("/{name}/{genreId}")
  public ResponseEntity<PageResponse> findByTitleOrAuthorAndGenre(@PathVariable String name,
      @PathVariable Long genreId, Pageable pageable) {
    return ResponseEntity.status(200).body(bookService.findByTitleOrAuthorAndGenre(name, genreId, pageable));
  }

  @Operation(summary = "Gợi ý sách")
  @PreAuthorize("hasRole('USER')")
  @GetMapping
  public ResponseEntity<PageResponse> bookRecommendations(Pageable pageable) {
    return ResponseEntity.status(200).body(bookService.bookRecommendations(pageable));
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

  @GetMapping("/all")
  public ResponseEntity<PageResponse> getAll(
      Pageable pageable) {
    return ResponseEntity.status(200).body(bookService.getBookList(pageable));
  }



}
