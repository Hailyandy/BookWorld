package com.chien.bookWorld.repository;

import com.chien.bookWorld.entity.BookBasket;
import jakarta.transaction.Transactional;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BookBasketRepository extends JpaRepository<BookBasket, Long> {

        @Query(value = "select genre_id from book_basket join book_genre on book_basket.book_id = book_genre.book_id where book_basket.user_id = :userId group by genre_id", nativeQuery = true)
        Optional<Collection<Long>> findTheIDOfFavoriteGenre(@Param("userId") Long userId);

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

        @Query(nativeQuery = true, value = "SELECT * FROM book_basket WHERE user_id = :userId")
        Page<BookBasket> findBookBasketByUser(@Param("userId") Long userId, Pageable pageable);

        @Query(nativeQuery = true, value = "SELECT * FROM book_basket WHERE user_id = :userId AND book_id = :bookId")
        BookBasket findByUserAndBook(@Param("userId") Long userId, @Param("bookId") Long bookId);
}
