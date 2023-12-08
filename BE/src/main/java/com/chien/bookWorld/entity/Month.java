package com.chien.bookWorld.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Month {
    @Id
    private Integer month;

    private Integer quarter;
}
