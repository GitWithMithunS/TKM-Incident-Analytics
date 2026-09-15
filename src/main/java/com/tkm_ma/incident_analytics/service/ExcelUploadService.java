package com.tkm_ma.incident_analytics.service;

import com.tkm_ma.incident_analytics.dto.UploadResponse;
import org.springframework.web.multipart.MultipartFile;

public interface ExcelUploadService {
    UploadResponse uploadExcel(MultipartFile file);
}