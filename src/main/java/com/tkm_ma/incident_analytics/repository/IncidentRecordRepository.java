package com.tkm_ma.incident_analytics.repository;

import com.tkm_ma.incident_analytics.model.IncidentRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface IncidentRecordRepository extends JpaRepository<IncidentRecord, Long> {

    boolean existsByIncidentId(Long incidentId);

    @Query("""
            SELECT i.incidentId
                        FROM   IncidentRecord i
                                    where i.incidentId IN :incidentIds
            """)
    Set<Long> findExistingIncidentIds(@Param("incidentIds") Set<Long> incidentIds);

}