package com.tkm_ma.incident_analytics.controller;

import com.tkm_ma.incident_analytics.dto.UploadResponse;
import com.tkm_ma.incident_analytics.service.ExcelUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/uploads")
@RequiredArgsConstructor
public class UploadController {

    private final ExcelUploadService excelUploadService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<UploadResponse> uploadExcel(
            @RequestParam("file")
            MultipartFile file) {
        return ResponseEntity.ok(
                excelUploadService.uploadExcel(file)
        );
    }
}