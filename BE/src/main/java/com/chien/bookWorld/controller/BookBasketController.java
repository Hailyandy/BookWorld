package com.chien.bookWorld.controller;

import com.chien.bookWorld.dto.BookBasketUpdateDto;
import com.chien.bookWorld.entity.Book;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.service.BookBasketService;
import com.chien.bookWorld.service.BookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import java.util.Map;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RestController
@RequestMapping("/api/bookBasket")
@SecurityRequirement(name = "javainuseapi")
public class BookBasketController {
  @Autowired
  private BookBasketService bookBasketService;

  // @PreAuthorize("hasRole('ADMIN')")
  // @PostMapping
  // public ResponseEntity<Book> create(@RequestBody Book bookCategories) {
  // return ResponseEntity.status(200).body(bookService.create(bookCategories));
  // }
  // @Operation(summary = "Find by title or author")
  // @PreAuthorize("hasRole('ADMIN') or hasRole('AUTHOR') or hasRole('USER')")
  // @GetMapping("/{name}/{genreId}")
  // public ResponseEntity<SuccessResponse>
  // findByTitleOrAuthorAndGenre(@PathVariable String name, @PathVariable Long
  // genreId) {
  // return
  // ResponseEntity.status(200).body(bookService.findByTitleOrAuthorAndGenre(name,
  // genreId));
  // }

  @Operation(summary = "Theo dõi sách")
  @PreAuthorize("hasRole('USER')")
  @PutMapping
  public ResponseEntity<Object> updateBook(@RequestBody @Validated BookBasketUpdateDto bookBasketUpdateDto) {
    return ResponseEntity.status(200).body(bookBasketService.update(bookBasketUpdateDto));
  }
  //
  // @Operation(summary = "Delete book")
  // @PreAuthorize("hasRole('LIBRARIAN')")
  // @DeleteMapping("/{id:[0-9]{1,32}}")
  // public ResponseEntity<Map<String, Object>> deleteBook(@PathVariable Long id)
  // {
  // return ResponseEntity.status(200).body(bookCategoriesService.delete(id));
  // }

  @GetMapping
  public ResponseEntity<SuccessResponse> getBookOfBasketByUser(Pageable pageable) {
    return ResponseEntity.status(200).body(bookBasketService.findAll(pageable));
  }

}
