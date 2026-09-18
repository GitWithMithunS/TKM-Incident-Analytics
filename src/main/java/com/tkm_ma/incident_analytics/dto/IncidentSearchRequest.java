package com.tkm_ma.incident_analytics.dto;

import com.tkm_ma.incident_analytics.model.enums.Impact;
import com.tkm_ma.incident_analytics.model.enums.Priority;
import com.tkm_ma.incident_analytics.model.enums.Status;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IncidentSearchRequest {

    private Long uploadId;

    private Status status;

    private String category;

    private Priority priority;

    private Impact impact;

    private Boolean responseSlaMet;

    private String responseSlaViolationReason;

    private Boolean resolutionSlaMetWithoutPending;

    private Boolean resolutionSlaMetWithPending;

    private Boolean isReopen;

    private String assignedEngineerFirstResponded;

    private String assignedTo;

    private String callerName;

    private String loggedBy;

    private String callerEmail;

    private LocalDateTime responseDeadlineFrom;

    private LocalDateTime responseDeadlineTo;

    private LocalDateTime responseTimeFrom;

    private LocalDateTime responseTimeTo;
}