package com.chien.bookWorld.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.chien.bookWorld.entity.Test;

@Repository
public interface TestRepository extends JpaRepository<Test, Long> {

}
