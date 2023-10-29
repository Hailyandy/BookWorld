package com.chien.bookWorld.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.chien.bookWorld.entity.QuickTest;
import com.chien.bookWorld.repository.QuickTestRepository;
import com.chien.bookWorld.repository.TestRepository;

public class QuickTestServiceImpl extends QuickTest {

    @Autowired
    private TestRepository testRepository;

    @Autowired
    private QuickTestRepository quickTestRepository;

}
