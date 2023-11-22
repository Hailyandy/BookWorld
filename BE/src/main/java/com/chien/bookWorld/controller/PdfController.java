package com.chien.bookWorld.controller;

import com.chien.bookWorld.dto.PdfCreationDto;
import com.chien.bookWorld.service.PdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/pdf")
@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
public class PdfController {

    @Autowired
    private PdfService pdfService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createPdf(
            @RequestBody PdfCreationDto pdfCreationDto
            ) {
        return ResponseEntity.status(200).body(pdfService.create(pdfCreationDto));
    }

}
