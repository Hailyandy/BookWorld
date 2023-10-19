package com.chien.bookWorld.repository;

import com.chien.bookWorld.entity.Pdf;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PdfRepository extends JpaRepository<Pdf, Long> {

}
