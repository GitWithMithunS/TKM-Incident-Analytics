package com.tkm_ma.incident_analytics.service;

import com.tkm_ma.incident_analytics.dto.IncidentSearchRequest;
import com.tkm_ma.incident_analytics.model.IncidentRecord;
import org.springframework.data.domain.Page;

public interface IncidentService {

    Page<IncidentRecord> search(
            IncidentSearchRequest request,
            int page,
            int size,
            String sortBy,
            String direction
    );
}