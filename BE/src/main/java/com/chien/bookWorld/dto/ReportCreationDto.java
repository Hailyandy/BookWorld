package com.chien.bookWorld.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReportCreationDto {

    @NotBlank(message = "Thiếu lý do báo cáo!")
    private String reason;

    @NotBlank(message = "Thiếu mô tả!")
    private String description;

    @NotBlank(message = "Chưa có id pdf")
    private Long pdf_id;

}
