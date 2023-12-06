package com.chien.bookWorld.repository;

import com.chien.bookWorld.entity.Book;
import java.util.Collection;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

  @Query(value = "SELECT book.* FROM book JOIN user ON book.user_id = user.id WHERE book.name LIKE :name OR user.name LIKE :name ORDER BY user.name, book.name",
          nativeQuery = true,
  countQuery = "SELECT COUNT(*) FROM book JOIN user ON book.user_id = user.id WHERE book.name LIKE :name OR user.name LIKE :name")
  Page<Book> findByTitleOrAuthor(@Param("name") String name, Pageable pageable);

  @Query(value = "SELECT book.* FROM (book JOIN user ON book.user_id = user.id) JOIN book_genre ON book.id = book_genre.book_id WHERE (book.name LIKE :name OR user.name LIKE :name) AND book_genre.genre_id = :genreId ORDER BY user.name, book.name",
          nativeQuery = true,
          countQuery = "SELECT COUNT(*) FROM (book JOIN user ON book.user_id = user.id) JOIN book_genre ON book.id = book_genre.book_id WHERE (book.name LIKE :name OR user.name LIKE :name) AND book_genre.genre_id = :genreId"
  )
  Page<Book> findByTitleOrAuthorAndGenre(@Param("name") String name,
      @Param("genreId") Long genreId, Pageable pageable);

  @Query(value = "select book.* from (book join book_basket on book.id not in (select book_id from book_basket where user_id = :userId)) join book_genre on book.id = book_genre.book_id where book_genre.genre_id in :genreIds group by id order by scoring desc", nativeQuery = true)
  Page<Book> findSuitableBooks(@Param("userId") Long userId,
      @Param("genreIds") Collection<Long> genreIds, Pageable pageable);

  @Query(nativeQuery = true, value = "SELECT * FROM book ORDER BY scoring DESC LIMIT 50")
  List<Book> findTopBook();

  @Query(nativeQuery = true, value = "SELECT * FROM book",
    countQuery = "SELECT * FROM book")
  Page<Book> findAllBook(Pageable pageable);


  @Query(nativeQuery = true, value = "SELECT * FROM book where user_id = :userId")
  Page<Book> findBookByAuthor(Pageable pageable, @Param("userId") Long userId);

}
