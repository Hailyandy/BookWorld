package com.chien.bookWorld.service.impl;

import com.chien.bookWorld.dto.PdfCreationDto;
import com.chien.bookWorld.entity.Pdf;
import com.chien.bookWorld.exception.AppException;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.repository.BookRepository;
import com.chien.bookWorld.repository.PdfRepository;
import com.chien.bookWorld.service.PdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PdfServiceImpl implements PdfService {

    @Autowired
    private PdfRepository pdfRepository;
    @Autowired
    private BookRepository bookRepository;

    @Override
    public Map<String, Object> create(PdfCreationDto pdfCreationDto) {
        Pdf pdf = new Pdf();
        pdf.setUrlPdf(pdfCreationDto.getUrlPdf());
        pdf.setBook(bookRepository.findById(pdfCreationDto.getIdBook())
                .orElseThrow(() -> new AppException(404, 44,
                        "Không tìm thấy sách với id ")));
        pdfRepository.save(pdf);
        final Map<String, Object> body = new HashMap<>();
        body.put("code", 0);
        body.put("message", "Thêm pdf vào sách thành công!");
        return body;
    }

    @Override
    public SuccessResponse findById(Long id) {
        return null;
    }

    @Override
    public SuccessResponse findAll() {
        return null;
    }

    @Override
    public Object update(Pdf pdf) {
        return null;
    }

    @Override
    public Map<String, Object> delete(Long id) {
        return null;
    }
}
