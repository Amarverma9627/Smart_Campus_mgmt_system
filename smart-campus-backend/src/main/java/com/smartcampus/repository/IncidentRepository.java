package com.smartcampus.repository;

import com.smartcampus.model.Incident;
import com.smartcampus.model.enums.IncidentStatus;
import com.smartcampus.model.enums.Severity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IncidentRepository extends JpaRepository<Incident, Long> {

    List<Incident> findByReporterId(Long reporterId);

    List<Incident> findByStatus(IncidentStatus status);

    List<Incident> findBySeverity(Severity severity);
}
