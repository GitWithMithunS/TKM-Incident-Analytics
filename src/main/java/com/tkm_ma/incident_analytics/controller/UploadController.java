package com.tkm_ma.incident_analytics.controller;

import com.tkm_ma.incident_analytics.dto.UploadResponse;
import com.tkm_ma.incident_analytics.model.IncidentRecord;
import com.tkm_ma.incident_analytics.service.ExcelUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/uploads")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UploadController {

    private final ExcelUploadService excelUploadService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<UploadResponse> uploadExcel(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(
                excelUploadService.uploadExcel(file)
        );
    }

    @GetMapping
    public ResponseEntity<List<UploadResponse>>
    getAllUploads() {
        return ResponseEntity.ok( excelUploadService.getAllUploads());
    }


}