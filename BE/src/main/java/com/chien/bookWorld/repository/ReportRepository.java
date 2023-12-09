package com.chien.bookWorld.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.chien.bookWorld.entity.Report;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    @Query(nativeQuery = true, value = "SELECT * from report WHERE status = 'PENDING' ORDER BY timestamp DESC")
    Page<Report> findAllByOrderByTimestampDesc(Pageable pageable);
}
