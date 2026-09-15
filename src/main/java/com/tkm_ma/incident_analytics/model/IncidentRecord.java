package com.tkm_ma.incident_analytics.model;

import com.tkm_ma.incident_analytics.model.enums.*;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(
        name = "incident_records",
        indexes = {
                @Index(name = "idx_upload", columnList = "upload_id"),
                @Index(name = "idx_upload_status", columnList = "upload_id,status"),
                @Index(name = "idx_upload_priority", columnList = "upload_id,priority"),
                @Index(name = "idx_upload_department", columnList = "upload_id,department"),
                @Index(name = "idx_upload_application", columnList = "upload_id,applicationName"),
                @Index(name = "idx_upload_assigned", columnList = "upload_id,assignedTo"),
                @Index(name = "idx_upload_logtime", columnList = "upload_id,logTime")
        }
)
public class IncidentRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "upload_id")
    private ExcelUpload upload;

    private Long incidentId;

    private String callerEmail;

    private LocalDateTime logTime;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String callerName;

    private String loggedBy;

    @Column(length = 500)
    private String classification;

    private String category;

    private String department;

    private String medium;

    @Column(length = 1000)
    private String symptoms;

    private String pendingCode;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    private String priorityChangeReason;

    @Enumerated(EnumType.STRING)
    private Impact impact;

    private String workgroup;

    private String assignedTo;

    private Boolean responseSlaMet;

    @Column(length = 1000)
    private String responseSlaViolationReason;

    private LocalDateTime responseDeadline;

    private LocalDateTime responseTime;

    private LocalDateTime assignedEngineerFirstResponded;

    private LocalDateTime resolutionTime;

    private LocalDateTime closureDateTime;

    private LocalDateTime resolutionDeadline;

    private Boolean isReopen;

    private Boolean resolutionSlaMetWithoutPending;

    private Boolean resolutionSlaMetWithPending;

    @Enumerated(EnumType.STRING)
    private ResolutionCode resolutionCode;

    @Column(columnDefinition = "TEXT")
    private String solution;

    @Column(columnDefinition = "TEXT")
    private String userCommunication;

    @Column(columnDefinition = "LONGTEXT")
    private String privateLog;

    private String dealerSupplierCode;

    private String dealerSupplierName;

    private String dealerSupplierLocation;

    private String applicationName;

    private String parentId;

    private String resolutionViolationReason;

    private String specificLocation;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String icdTicketNumber;

    @Enumerated(EnumType.STRING)
    private ParentChildType parentChild;

    private Integer cycleTimeInMin;

    private Integer slaCycleTimeInMin;
}