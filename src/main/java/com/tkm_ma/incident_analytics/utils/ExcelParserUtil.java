package com.tkm_ma.incident_analytics.utils;


import com.tkm_ma.incident_analytics.model.ExcelUpload;
import com.tkm_ma.incident_analytics.model.IncidentRecord;
import com.tkm_ma.incident_analytics.model.enums.Priority;
import com.tkm_ma.incident_analytics.model.enums.Status;
import lombok.experimental.UtilityClass;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.usermodel.DateUtil;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.*;
import java.util.ArrayList;
import java.util.List;

@UtilityClass
public class ExcelParserUtil {

    public List<IncidentRecord> parse(
            MultipartFile file,
            ExcelUpload upload) throws IOException {

        List<IncidentRecord> records = new ArrayList<>();

        Workbook workbook =
                WorkbookFactory.create(file.getInputStream());

        Sheet sheet = workbook.getSheetAt(0);

        for (int rowIndex = 1; rowIndex <= sheet.getLastRowNum(); rowIndex++) {

            Row row = sheet.getRow(rowIndex);

            if (row == null) {
                continue;
            }

            IncidentRecord record = new IncidentRecord();

            record.setUpload(upload);

            record.setIncidentId(
                    getLongValue(row.getCell(0)));

            record.setCallerEmail(
                    getStringValue(row.getCell(1)));

            record.setLogTime(
                    getDateTimeValue(row.getCell(2)));

            record.setStatus(
                    mapStatus(getStringValue(row.getCell(3))));

            record.setCallerName(
                    getStringValue(row.getCell(4)));

            record.setLoggedBy(
                    getStringValue(row.getCell(5)));

            record.setClassification(
                    getStringValue(row.getCell(6)));

            record.setCategory(
                    getStringValue(row.getCell(7)));

            record.setDepartment(
                    getStringValue(row.getCell(8)));

            record.setMedium(
                    getStringValue(row.getCell(9)));

            record.setSymptoms(
                    getStringValue(row.getCell(10)));

            record.setPendingCode(
                    getStringValue(row.getCell(11)));

            record.setPriority(
                    mapPriority(getStringValue(row.getCell(12))));

            records.add(record);
        }

        workbook.close();

        return records;
    }

    private String getStringValue(Cell cell) {

        if (cell == null) {
            return null;
        }

        DataFormatter formatter = new DataFormatter();

        String value = formatter.formatCellValue(cell);

        return value == null || value.isBlank()
                ? null
                : value.trim();
    }

    private Long getLongValue(Cell cell) {

        String value = getStringValue(cell);

        if (value == null) {
            return null;
        }

        try {
            return Long.parseLong(value);
        } catch (Exception e) {
            return null;
        }
    }

    private LocalDateTime getDateTimeValue(Cell cell) {

        try {

            if (cell == null) {
                return null;
            }

            if (DateUtil.isCellDateFormatted(cell)) {

                return cell.getDateCellValue()
                        .toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDateTime();
            }

            String value = getStringValue(cell);

            if (value == null
                    || value.isBlank()
                    || value.equals("#####")) {

                return null;
            }

        } catch (Exception ignored) {
        }

        return null;
    }

    private Status mapStatus(String status) {

        if (status == null) {
            return null;
        }

        return switch (status.trim().toUpperCase()) {

            case "CLOSED" -> Status.CLOSED;
            case "RESOLVED" -> Status.RESOLVED;
            case "OPEN" -> Status.OPEN;
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
