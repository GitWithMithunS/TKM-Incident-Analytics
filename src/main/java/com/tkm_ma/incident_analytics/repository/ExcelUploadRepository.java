package com.tkm_ma.incident_analytics.repository;

import com.tkm_ma.incident_analytics.model.ExcelUpload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExcelUploadRepository
        extends JpaRepository<ExcelUpload, Long> {
}