package com.chien.bookWorld.service;

import com.chien.bookWorld.dto.PdfCreationDto;
import com.chien.bookWorld.dto.PdfDto;
import com.chien.bookWorld.entity.Pdf;

import java.util.Map;

public interface PdfService extends GeneralService<Map<String, Object>, PdfCreationDto, Pdf> {
}
