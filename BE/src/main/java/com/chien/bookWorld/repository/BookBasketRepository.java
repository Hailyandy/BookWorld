package com.chien.bookWorld.repository;

import com.chien.bookWorld.entity.BookBasket;
import jakarta.transaction.Transactional;
import java.util.Collection;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BookBasketRepository extends JpaRepository<BookBasket, Long> {
  @Modifying
  @Transactional
  @Query(value = "INSERT INTO book_basket VALUES(:bookId, :userId, :status)", nativeQuery = true)
  Integer create(@Param("bookId") Long bookId, @Param("userId") Long userId,
      @Param("status") String status);

  @Modifying
  @Transactional
  @Query(value = "UPDATE book_basket SET status = :status WHERE book_id = :bookId AND user_id = :userId", nativeQuery = true)
  Integer update(@Param("bookId") Long bookId, @Param("userId") Long userId,
      @Param("status") String status);
}
