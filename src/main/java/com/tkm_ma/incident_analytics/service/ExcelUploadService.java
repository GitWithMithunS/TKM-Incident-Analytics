package com.tkm_ma.incident_analytics.service;

import com.tkm_ma.incident_analytics.dto.UploadResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ExcelUploadService {
    public UploadResponse uploadExcel(MultipartFile file);
    List<UploadResponse> getAllUploads();
}