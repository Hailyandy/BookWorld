package com.chien.bookWorld.controller;

import java.util.Map;

import com.chien.bookWorld.payload.response.PageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chien.bookWorld.dto.ReportCreationDto;
import com.chien.bookWorld.payload.request.ReportHandlerRequest;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.service.ReportService;

@RestController
@RequestMapping("/api/pdf/report")
 
public class ReportCotroller {

    @Autowired
    private ReportService reportService;

    @PostMapping("")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Map<String, Object>> create(
            @RequestBody ReportCreationDto reportCreationDto) {
        return ResponseEntity.status(200).body(reportService.create(reportCreationDto));
    }

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PageResponse> getAllReport(
            Pageable pageable
    ) {
        return ResponseEntity.status(200).body(reportService.findAll(pageable));
    }

    @PostMapping("/handler")
    public ResponseEntity<Map<String, Object>> handlerReport(@RequestBody ReportHandlerRequest reportHandlerRequest) {
        return ResponseEntity.status(200)
                .body(reportService.acceptHandLer(reportHandlerRequest.getStatus(), reportHandlerRequest.getId()));
    }
}
