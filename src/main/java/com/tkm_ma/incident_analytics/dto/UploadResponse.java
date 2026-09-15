package com.tkm_ma.incident_analytics.dto;

import java.time.LocalDateTime;

public record UploadResponse(
        Long id,
        String fileName,
        Integer recordCount,
        LocalDateTime uploadedAt
) {
}