package com.tkm_ma.incident_analytics.utils;

import com.tkm_ma.incident_analytics.dto.IncidentSearchRequest;
import com.tkm_ma.incident_analytics.model.IncidentRecord;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class IncidentSpecification {

    public static Specification<IncidentRecord> build(
            IncidentSearchRequest request
    ) {

        return (root, query, cb) -> {

            List<Predicate> predicates =
                    new ArrayList<>();

            if (request.getUploadId() != null) {
                predicates.add(
                        cb.equal(
                                root.get("upload").get("id"),
                                request.getUploadId()
                        )
                );
            }

            if (request.getStatus() != null) {
                predicates.add(
                        cb.equal(
                                root.get("status"),
                                request.getStatus()
                        )
                );
            }

            if (request.getPriority() != null) {
                predicates.add(
                        cb.equal(
                                root.get("priority"),
                                request.getPriority()
                        )
                );
            }

            if (request.getImpact() != null) {
                predicates.add(
                        cb.equal(
                                root.get("impact"),
                                request.getImpact()
                        )
                );
            }

            if (request.getResponseSlaMet() != null) {
                predicates.add(
                        cb.equal(
                                root.get("responseSlaMet"),
                                request.getResponseSlaMet()
                        )
                );
            }

            if (request.getResolutionSlaMetWithoutPending() != null) {
                predicates.add(
                        cb.equal(
                                root.get("resolutionSlaMetWithoutPending"),
                                request.getResolutionSlaMetWithoutPending()
                        )
                );
            }

            if (request.getResolutionSlaMetWithPending() != null) {
                predicates.add(
                        cb.equal(
                                root.get("resolutionSlaMetWithPending"),
                                request.getResolutionSlaMetWithPending()
                        )
                );
            }

            if (request.getIsReopen() != null) {
                predicates.add(
                        cb.equal(
                                root.get("isReopen"),
                                request.getIsReopen()
                        )
                );
            }

            if (request.getAssignedTo() != null &&
                    !request.getAssignedTo().isBlank()) {

                predicates.add(
                        cb.like(
                                cb.lower(root.get("assignedTo")),
                                "%" +
                                        request.getAssignedTo()
                                                .toLowerCase()
                                        + "%"
                        )
                );
            }

            if (request.getCallerName() != null &&
                    !request.getCallerName().isBlank()) {

                predicates.add(
                        cb.like(
                                cb.lower(root.get("callerName")),
                                "%" +
                                        request.getCallerName()
                                                .toLowerCase()
                                        + "%"
                        )
                );
            }

            //caller email
            if (request.getCallerEmail() != null &&
                    !request.getCallerEmail().isBlank()) {

                predicates.add(
                        cb.like(
                                cb.lower(root.get("callerEmail")),
                                "%" +
                                        request.getCallerEmail()
                                                .toLowerCase()
                                        + "%"
                        )
                );
            }

            //LoggedfBy
            if (request.getLoggedBy() != null &&
                    !request.getLoggedBy().isBlank()) {

                predicates.add(
                        cb.like(
                                cb.lower(root.get("loggedBy")),
                                "%" +
                                        request.getLoggedBy()
                                                .toLowerCase()
                                        + "%"
                        )
                );
            }

            //first TO response
            if (request.getAssignedEngineerFirstResponded() != null &&
                    !request.getAssignedEngineerFirstResponded().isBlank()) {

                predicates.add(
                        cb.like(
                                cb.lower(root.get("assignedEngineerFirstResponded")),
                                "%" +
                                        request.getAssignedEngineerFirstResponded()
                                                .toLowerCase()
                                        + "%"
                        )
                );
            }

            return cb.and(
                    predicates.toArray(
                            new Predicate[0]
                    )
            );
        };
    }
}