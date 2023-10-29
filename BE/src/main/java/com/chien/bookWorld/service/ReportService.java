package com.chien.bookWorld.service;

import java.util.Map;

import com.chien.bookWorld.dto.ReportCreationDto;
import com.chien.bookWorld.entity.Report;
import com.chien.bookWorld.entity.ReportStatus;

public interface ReportService extends GeneralService<Map<String, Object>, ReportCreationDto, Report> {

    Map<String, Object> acceptHandLer(ReportStatus status, Long id);
}
