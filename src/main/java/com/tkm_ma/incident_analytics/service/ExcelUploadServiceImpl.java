package com.tkm_ma.incident_analytics.service;

import com.tkm_ma.incident_analytics.dto.UploadResponse;

import com.tkm_ma.incident_analytics.model.ExcelUpload;
import com.tkm_ma.incident_analytics.model.IncidentRecord;
import com.tkm_ma.incident_analytics.repository.ExcelUploadRepository;
import com.tkm_ma.incident_analytics.repository.IncidentRecordRepository;
import com.tkm_ma.incident_analytics.utils.CalculateHash;
import com.tkm_ma.incident_analytics.utils.ExcelParserUtil;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ExcelUploadServiceImpl implements ExcelUploadService {

    private final ExcelUploadRepository excelUploadRepository;
    private final IncidentRecordRepository incidentRecordRepository;

    @Override
    public UploadResponse uploadExcel(MultipartFile file) {

        //checking if the same file already exists(using its hash value)
        String hash = CalculateHash.getCalculatedHash(file);

        if(excelUploadRepository.existsByFileHash(hash)){
            throw new RuntimeException("This file has already been uploaded");
        }

        //extracting each incident records from Excel to DB.
        try {
            //extracting incidents form excel
            System.out.println("1");
            List<IncidentRecord> records = ExcelParserUtil.parse(file);

            //get all incident ids form the records
            Set<Long> incidentIds =
                    records.stream()
                            .map(record -> record.getIncidentId())
                            .filter(Objects::nonNull)
                            .collect(Collectors.toSet());

            //get existing ids from db which are already present in records
            Set<Long> existingIds =
                    incidentRecordRepository
                            .findExistingIncidentIds(incidentIds);

            //exclude the existing records from the records.(skip duplicates)
            records = records.stream()
                    .filter(record ->
                            !existingIds.contains(
                                    record.getIncidentId()
                            ))
                    .toList();

            //saving the upload to exceldb.
            System.out.println("2");
            ExcelUpload upload = ExcelUpload.builder()
                    .fileName(file.getOriginalFilename())
                    .fileHash(hash)
                    .uploadedAt(LocalDateTime.now())
                    .recordCount(records.size())
                    .build();
            excelUploadRepository.save(upload);

            //set the upload of each incident of records
            records.forEach(record -> record.setUpload(upload));

            //storing it to incidentdb
            System.out.println("3");
            incidentRecordRepository.saveAll(records);

            //returning the response of successful Excel upload.
            return new UploadResponse(
                    upload.getId(),
                    upload.getFileName(),
                    upload.getRecordCount(),
                    upload.getUploadedAt()
            );

        } catch (Exception e) {
            throw new RuntimeException("Failed to process excel file", e);
        }
    }

    @Override
    public List<UploadResponse> getAllUploads() {

        return excelUploadRepository.findAll()
                .stream()
                .map(upload -> new UploadResponse(
                        upload.getId(),
                        upload.getFileName(),
                        upload.getRecordCount(),
                        upload.getUploadedAt()
                ))
                .toList();
    }


}