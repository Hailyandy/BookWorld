package com.chien.bookWorld.repository;

import com.chien.bookWorld.entity.Pdf;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PdfRepository extends JpaRepository<Pdf, Long> {

    @Query(nativeQuery = true, value = "SELECT * FROM pdf where book_id = :idBook")
    List<Pdf> findPdfByBook(@Param("idBook") Long idBook);

}
