package com.chien.bookWorld.dto;

import jakarta.validation.constraints.NotBlank;

public class ReportCreationDto {

    @NotBlank(message = "Thiếu lý do báo cáo!")
    private String reason;

    @NotBlank(message = "Thiếu mô tả!")
    private String description;

}
