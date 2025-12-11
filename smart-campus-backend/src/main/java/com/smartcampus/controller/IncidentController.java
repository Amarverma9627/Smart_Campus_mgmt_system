package com.smartcampus.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smartcampus.dto.request.IncidentRequest;
import com.smartcampus.model.Incident;
import com.smartcampus.service.IncidentService;

@RestController
@RequestMapping("/api/incidents")
@CrossOrigin(origins = "http://localhost:3000")
public class IncidentController {

    private final IncidentService incidentService;

    public IncidentController(IncidentService incidentService) {
        this.incidentService = incidentService;
    }

 // Student / Staff (STUDENT & SECURITY_STAFF) can report
    @PreAuthorize("hasAnyRole('STUDENT','SECURITY_STAFF')")
    @PostMapping
    public ResponseEntity<Incident> reportIncident(
            @RequestParam Long reporterId,
            @RequestBody IncidentRequest request) {
        Incident incident = incidentService.reportIncident(reporterId, request);
        return ResponseEntity.ok(incident);
    }

 // Only ADMIN and SECURITY_STAFF can view open incidents
    @PreAuthorize("hasAnyRole('ADMIN','SECURITY_STAFF')")
    @GetMapping("/open")
    public ResponseEntity<List<Incident>> getOpenIncidents() {
        List<Incident> incidents = incidentService.getOpenIncidents();
        return ResponseEntity.ok(incidents);
    }
}
