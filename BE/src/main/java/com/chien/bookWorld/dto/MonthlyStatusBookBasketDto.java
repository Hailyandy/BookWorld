package com.chien.bookWorld.dto;


import lombok.*;

import java.math.BigDecimal;


@Data
@Getter
@Setter
public class MonthlyStatusBookBasketDto {
    private int month;
    private int year;
    private int quarter;
    private long countRead;
    private long countWantRead;
    private long countReading;

    public MonthlyStatusBookBasketDto(int month, int year, int quarter, BigDecimal countRead, BigDecimal countWantRead, BigDecimal countReading) {
        this.month = month;
        this.year = year;
        this.quarter = quarter;
        this.countRead = countRead.longValue();
        this.countWantRead = countWantRead.longValue();
        this.countReading = countReading.longValue();
    }
}
