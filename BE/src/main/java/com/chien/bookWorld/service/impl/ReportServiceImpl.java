package com.chien.bookWorld.service.impl;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import com.chien.bookWorld.entity.*;
import com.chien.bookWorld.payload.response.PageResponse;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.chien.bookWorld.dto.BookBasketDto;
import com.chien.bookWorld.dto.GenreDto;
import com.chien.bookWorld.dto.ReportCreationDto;
import com.chien.bookWorld.dto.ReportDto;
import com.chien.bookWorld.dto.ReportDtoMap;
import com.chien.bookWorld.dto.DtoMap.BookBasketDtoMap;
import com.chien.bookWorld.exception.AppException;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.repository.PdfRepository;
import com.chien.bookWorld.repository.ReportRepository;
import com.chien.bookWorld.repository.UserRepository;
import com.chien.bookWorld.service.ReportService;

@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PdfRepository pdfRepository;

    @Autowired
    private ModelMapper mapper;

    @Override
    public Map<String, Object> create(ReportCreationDto reportCreationDto) {
        Report report = new Report();
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        report.setUser(userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new AppException(404, 44,
                        "Không tìm thấy tài khoản với id '" + userDetails.getId() + "'!")));

        report.setPdf(pdfRepository.findById(reportCreationDto.getPdf_id())
                .orElseThrow(() -> new AppException(404, 44,
                        "Không tìm thấy tài khoản với id '" + reportCreationDto.getPdf_id() + "'!")));

        report.setDescription(reportCreationDto.getDescription());
        report.setReason(reportCreationDto.getReason());
        report.setTimestamp(new Timestamp(System.currentTimeMillis()));
        report.setStatus(ReportStatus.PENDING.toString());
        reportRepository.save(report);

        final Map<String, Object> body = new HashMap<>();
        body.put("code", 0);
        body.put("message", "Tạo report thành công!");
        return body;
    }

    @Override
    public Map<String, Object> delete(Long id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public PageResponse findAll(Pageable pageable) {
        Page<Report> reports = reportRepository.findAllByOrderByTimestampDesc(pageable);
        int totalPages = reports.getTotalPages();
        int numberPage = reports.getNumber();
        long totalRecord = reports.getTotalElements();
        int pageSize = reports.getSize();
        return new PageResponse(totalPages, pageSize, totalRecord, numberPage, reports.stream()
                .map(a -> {
                    ReportDto reportDto = mapper.map(a, ReportDto.class);
                    reportDto.setUserName(a.getUser().getName());
                    reportDto.setUrlAvatar(a.getUser().getUrlAvatar());
                    reportDto.setUrlPdf(a.getPdf().getUrlPdf());
                    return reportDto;
                }).collect(
                        Collectors.toList()));
    }

    @Override
    public SuccessResponse findById(Long id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Object update(Report u) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Map<String, Object> acceptHandLer(ReportStatus status, Long id) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).toList();
        boolean isAdmin = roles.contains("ROLE_ADMIN");
        if (!isAdmin) {
            throw new AppException(404, 44, "Không phải là admin!");
        }
        Report reportOt = reportRepository.findById(id).orElseThrow(
                () -> new AppException(404, 44, "Error: Does not exist! No report has been created yet!")
        );
        Pdf pdf = reportOt.getPdf();
        if (status == ReportStatus.ACCEPT) {
            reportRepository.delete(reportOt);
            pdfRepository.delete(pdf);
        }
        if (status == ReportStatus.REJECT) {
            reportOt.setStatus(ReportStatus.REJECTED.toString());
            reportRepository.save(reportOt);
        }
        final Map<String, Object> body = new HashMap<>();
        body.put("code", 0);
        body.put("message", "Xử lý thành công!");
        return body;
    }

    @Override
    public SuccessResponse findAll() {
        // TODO Auto-generated method stub
        return null;
    }

}
