package com.tkm_ma.incident_analytics.controller;

import com.tkm_ma.incident_analytics.dto.IncidentSearchRequest;
import com.tkm_ma.incident_analytics.model.IncidentRecord;
import com.tkm_ma.incident_analytics.service.IncidentService;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/incidents")
@RequiredArgsConstructor
public class IncidentController {

    private final IncidentService incidentService;

    @PostMapping("/search")
    public ResponseEntity<Page<IncidentRecord>> searchIncidents(

            @RequestBody IncidentSearchRequest request,

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "20")
            int size,

            @RequestParam(defaultValue = "incidentId")
            String sortBy,

            @RequestParam(defaultValue = "asc")
            String direction
    ) {

        return ResponseEntity.ok(
                incidentService.search(
                        request,
                        page,
                        size,
                        sortBy,
                        direction
                )
        );
    }
}