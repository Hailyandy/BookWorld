package com.chien.bookWorld.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.chien.bookWorld.entity.BookSale;

@Repository
public interface BookSaleRepository extends JpaRepository<BookSale, Long> {

}