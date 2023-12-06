package com.chien.bookWorld.dto;

import java.sql.Timestamp;

import org.modelmapper.PropertyMap;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReportDto {
    private Long id;
    private String description;
    private String reason;
    private Timestamp timestamp;
    private String userName;
    private String urlAvatar;
    private String urlPdf;
}
