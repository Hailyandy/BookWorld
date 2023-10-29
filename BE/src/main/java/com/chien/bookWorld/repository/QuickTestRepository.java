package com.chien.bookWorld.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.chien.bookWorld.entity.QuickTest;

@Repository
public interface QuickTestRepository extends JpaRepository<QuickTest, Long> {

}
