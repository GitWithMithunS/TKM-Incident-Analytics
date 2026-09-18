package com.tkm_ma.incident_analytics.service;

import com.tkm_ma.incident_analytics.dto.IncidentSearchRequest;
import com.tkm_ma.incident_analytics.model.IncidentRecord;
import com.tkm_ma.incident_analytics.repository.IncidentRecordRepository;
import com.tkm_ma.incident_analytics.utils.IncidentSpecification;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IncidentServiceImp implements IncidentService{

    private final IncidentRecordRepository incidentRecordRepository;

    @Override
    public Page<IncidentRecord> search(
            IncidentSearchRequest request,
            int page,
            int size,
            String sortBy,
            String direction
    ) {

        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        Sort.by(sortBy)
                );

        return incidentRecordRepository.findAll(
                IncidentSpecification.build(request),
                pageable
        );
    }
}