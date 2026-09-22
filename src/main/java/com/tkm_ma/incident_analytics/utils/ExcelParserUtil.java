package com.tkm_ma.incident_analytics.utils;


import com.tkm_ma.incident_analytics.model.ExcelUpload;
import com.tkm_ma.incident_analytics.model.IncidentRecord;
import com.tkm_ma.incident_analytics.model.enums.*;
import com.tkm_ma.incident_analytics.repository.IncidentRecordRepository;
import lombok.experimental.UtilityClass;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.usermodel.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.*;
import java.util.*;


@UtilityClass
//utiltityclass annotation does this below
//Class becomes final
//Constructor becomes private
//All methods become static automatically
public class ExcelParserUtil {


    public List<IncidentRecord> parse(MultipartFile file) throws IOException {

        List<IncidentRecord> incidents = new ArrayList<>();

        Workbook workbook = WorkbookFactory.create(file.getInputStream());

        Sheet sheet = workbook.getSheetAt(0);

        for (int rowNum = 1; rowNum <= sheet.getLastRowNum(); rowNum++) {

            Row row = sheet.getRow(rowNum);

            if (row == null) {
                continue;
            }

            IncidentRecord incident = buildIncidentRecord(row);

            incidents.add(incident);
        }

        workbook.close();

        return incidents;
    }


    private IncidentRecord buildIncidentRecord(
            Row row
    ) {

        return IncidentRecord.builder()

                .incidentId(
                        getLong(row, ExcelColumnIndex.INCIDENT_ID)
                )

                .callerEmail(
                        getString(row, ExcelColumnIndex.CALLER_EMAIL)
                )

                .logTime(
                        getDateTime(row, ExcelColumnIndex.LOG_TIME)
                )

                .status(
                        mapStatus(
                                getString(row, ExcelColumnIndex.STATUS)
                        )
                )

                .callerName(
                        getString(row, ExcelColumnIndex.CALLER_NAME)
                )

                .loggedBy(
                        getString(row, ExcelColumnIndex.LOGGED_BY)
                )

                .classification(
                        getString(row, ExcelColumnIndex.CLASSIFICATION)
                )

                .category(
                        getString(row, ExcelColumnIndex.CATEGORY)
                )

                .department(
                        getString(row, ExcelColumnIndex.DEPARTMENT)
                )

                .medium(
                        getString(row, ExcelColumnIndex.MEDIUM)
                )

                .symptoms(
                        getString(row, ExcelColumnIndex.SYMPTOMS)
                )

                .pendingCode(
                        getString(row, ExcelColumnIndex.PENDING_CODE)
                )

                .priority(
                        mapPriority(
                                getString(row, ExcelColumnIndex.PRIORITY)
                        )
                )

                .priorityChangeReason(
                        getString(
                                row,
                                ExcelColumnIndex.PRIORITY_CHANGE_REASON
                        )
                )

                .impact(
                        mapImpact(
                                getString(row, ExcelColumnIndex.IMPACT)
                        )
                )

                .workgroup(
                        getString(row, ExcelColumnIndex.WORKGROUP)
                )

                .assignedTo(
                        getString(row, ExcelColumnIndex.ASSIGNED_TO)
                )

                .responseSlaMet(
                        getBoolean(
                                row,
                                ExcelColumnIndex.RESPONSE_SLA_MET
                        )
                )

                .responseSlaViolationReason(
                        getString(
                                row,
                                ExcelColumnIndex.RESPONSE_SLA_VIOLATION_REASON
                        )
                )

                .responseDeadline(
                        getDateTime(
                                row,
                                ExcelColumnIndex.RESPONSE_DEADLINE
                        )
                )

                .responseTime(
                        getDateTime(
                                row,
                                ExcelColumnIndex.RESPONSE_TIME
                        )
                )

                .assignedEngineerFirstResponded(
                        getString(
                                row,
                                ExcelColumnIndex.ASSIGNED_ENGINEER_FIRST_RESPONDED
                        )
                )

                .resolutionTime(
                        getDateTime(
                                row,
                                ExcelColumnIndex.RESOLUTION_TIME
                        )
                )

                .closureDateTime(
                        getDateTime(
                                row,
                                ExcelColumnIndex.CLOSURE_DATE_TIME
                        )
                )

                .resolutionDeadline(
                        getDateTime(
                                row,
                                ExcelColumnIndex.RESOLUTION_DEADLINE
                        )
                )

                .isReopen(
                        getBoolean(
                                row,
                                ExcelColumnIndex.IS_REOPEN
                        )
                )

                .resolutionSlaMetWithoutPending(
                        getBoolean(
                                row,
                                ExcelColumnIndex.RESOLUTION_SLA_MET_WITHOUT_PENDING
                        )
                )

                .resolutionSlaMetWithPending(
                        getBoolean(
                                row,
                                ExcelColumnIndex.RESOLUTION_SLA_MET_WITH_PENDING
                        )
                )

                .resolutionCode(
                        mapResolutionCode(
                                getString(
                                        row,
                                        ExcelColumnIndex.RESOLUTION_CODE
                                )
                        )
                )

                .solution(
                        getString(row, ExcelColumnIndex.SOLUTION)
                )

                .userCommunication(
                        getString(
                                row,
                                ExcelColumnIndex.USER_COMMUNICATION
                        )
                )

                .privateLog(
                        getString(row, ExcelColumnIndex.PRIVATE_LOG)
                )

                .dealerSupplierCode(
                        getString(
                                row,
                                ExcelColumnIndex.DEALER_SUPPLIER_CODE
                        )
                )

                .dealerSupplierName(
                        getString(
                                row,
                                ExcelColumnIndex.DEALER_SUPPLIER_NAME
                        )
                )

                .dealerSupplierLocation(
                        getString(
                                row,
                                ExcelColumnIndex.DEALER_SUPPLIER_LOCATION
                        )
                )

                .applicationName(
                        getString(
                                row,
                                ExcelColumnIndex.APPLICATION_NAME
                        )
                )

                .parentId(
                        getString(
                                row,
                                ExcelColumnIndex.PARENT_ID
                        )
                )

                .resolutionViolationReason(
                        getString(
                                row,
                                ExcelColumnIndex.RESOLUTION_VIOLATION_REASON
                        )
                )

                .specificLocation(
                        getString(
                                row,
                                ExcelColumnIndex.SPECIFIC_LOCATION
                        )
                )

                .description(
                        getString(
                                row,
                                ExcelColumnIndex.DESCRIPTION
                        )
                )

                .icdTicketNumber(
                        getString(
                                row,
                                ExcelColumnIndex.ICD_TICKET_NUMBER
                        )
                )

                .parentChild(
                        mapParentChild(
                                getString(
                                        row,
                                        ExcelColumnIndex.PARENT_CHILD
                                )
                        )
                )

                .cycleTimeInMin(
                        getInteger(
                                row,
                                ExcelColumnIndex.CYCLE_TIME_IN_MIN
                        )
                )

                .slaCycleTimeInMin(
                        getInteger(
                                row,
                                ExcelColumnIndex.SLA_CYCLE_TIME_IN_MIN
                        )
                )

                .build();
    }


    //Helper functions -> dataType convertors
    private String getString(Row row, int col) {
        Cell cell = row.getCell(col);
        if (cell == null) {
            return null;
        }
        String value = new DataFormatter().formatCellValue(cell);
        if (value == null || value.isBlank() || value.equalsIgnoreCase("null")) {
            return null;
        }
        return value.trim();
    }

    private Long getLong(Row row, int col) {

        String value = getString(row, col);

        if (value == null) {
            return null;
        }

        try {
            return Long.parseLong(value);
        } catch (Exception e) {
            return null;
        }
    }

    private Integer getInteger(Row row, int col) {

        String value = getString(row, col);

        if (value == null) {
            return null;
        }

        try {
            return Integer.parseInt(value);
        } catch (Exception e) {
            return null;
        }
    }

    private Boolean getBoolean(Row row, int col) {

        String value = getString(row, col);

        if (value == null) {
            return null;
        }

        return Boolean.parseBoolean(value);
    }

    private LocalDateTime getDateTime(
            Row row,
            int col
    ) {

        Cell cell = row.getCell(col);

        if (cell == null) {
            return null;
        }

        try {
            if (DateUtil.isCellDateFormatted(cell)) {
                return cell
                        .getDateCellValue()
                        .toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDateTime();
            }

            if (cell.getCellType() == CellType.NUMERIC) {
                return DateUtil.getLocalDateTime(cell.getNumericCellValue());
            }

            String value = getString(row, col);

            if (value == null || value.equals("#####")) {
                return null;
            }
        } catch (Exception ignored) {
            System.out.println("[ExcelParselUtil] : Some issue occured in datetime formating " + ignored);
        }

        return null;
    }


    //cell-data-type  -> ENUM conversions
    private ResolutionCode mapResolutionCode(String code) {

        if (code == null) {
            return null;
        }

        return switch (code.trim().toUpperCase()) {

            case "SUCCESSFUL" -> ResolutionCode.SUCCESSFUL;
            case "PENDING" -> ResolutionCode.PENDING;
            case "REJECTED" -> ResolutionCode.REJECTED;
            case "CANCELLED" -> ResolutionCode.CANCELLED;

            default -> ResolutionCode.OTHER;
        };
    }

    private ParentChildType mapParentChild(String value) {

        if (value == null) {
            return null;
        }

        return switch (value.trim().toUpperCase()) {

            case "PARENT" -> ParentChildType.PARENT;
            case "CHILD" -> ParentChildType.CHILD;

            default -> null;
        };
    }

    private Impact mapImpact(String impact) {

        if (impact == null) {
            return null;
        }

        return switch (impact.trim().toUpperCase()) {

            case "LOW" -> Impact.LOW;
            case "MEDIUM" -> Impact.MEDIUM;
            case "HIGH" -> Impact.HIGH;

            default -> null;
        };
    }

    private Status mapStatus(String status) {

        if (status == null) {
            return null;
        }

        return switch (status.trim().toUpperCase()) {

            case "CLOSED" -> Status.CLOSED;
            case "RESOLVED" -> Status.RESOLVED;
            case "OPEN" -> Status.OPEN;
            case "IN-PROGRESS" -> Status.IN_PROGRESS;
            case "PENDING" -> Status.PENDING;

            default -> null;
        };
    }

    private Priority mapPriority(String priority) {

        if (priority == null) {
            return null;
        }

        return switch (priority.toUpperCase()) {

            case "PRIORITY 1" -> Priority.P1;
            case "PRIORITY 2" -> Priority.P2;
            case "PRIORITY 3" -> Priority.P3;
            case "PRIORITY 4" -> Priority.P4;
            case "PRIORITY 5" -> Priority.P5;

            default -> null;
        };
    }

}