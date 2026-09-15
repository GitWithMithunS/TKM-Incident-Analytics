package com.tkm_ma.incident_analytics.service;

import com.tkm_ma.incident_analytics.dto.UploadResponse;

import com.tkm_ma.incident_analytics.model.ExcelUpload;
import com.tkm_ma.incident_analytics.model.IncidentRecord;
import com.tkm_ma.incident_analytics.repository.ExcelUploadRepository;
import com.tkm_ma.incident_analytics.repository.IncidentRecordRepository;
import com.tkm_ma.incident_analytics.service.ExcelUploadService;
import com.tkm_ma.incident_analytics.utils.ExcelParserUtil;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ExcelUploadServiceImpl
        implements ExcelUploadService {

    private final ExcelUploadRepository excelUploadRepository;
    private final IncidentRecordRepository incidentRecordRepository;

    @Override
    public UploadResponse uploadExcel(MultipartFile file) {

        ExcelUpload upload =
                ExcelUpload.builder()
                        .fileName(file.getOriginalFilename())
                        .uploadedAt(LocalDateTime.now())
                        .recordCount(0)
                        .build();

        upload = excelUploadRepository.save(upload);

        try {

            List<IncidentRecord> records =
                    ExcelParserUtil.parse(file, upload);

            incidentRecordRepository.saveAll(records);

            upload.setRecordCount(records.size());

            excelUploadRepository.save(upload);

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to process excel file",
                    e);
        }

        return new UploadResponse(
                upload.getId(),
                upload.getFileName(),
                upload.getRecordCount(),
                upload.getUploadedAt()
        );
    }
}