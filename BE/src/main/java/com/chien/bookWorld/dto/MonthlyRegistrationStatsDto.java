package com.chien.bookWorld.dto;

import lombok.*;

@Getter
@Setter
@Data
public class MonthlyRegistrationStatsDto {
    private int month;
    private int year;
    private long registrationCount;

    public MonthlyRegistrationStatsDto(Integer integer, Integer integer1, long longValue) {
        this.month = integer;
        this.year = integer1;
        this.registrationCount = longValue;
    }
}
