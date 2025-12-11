package com.smartcampus.service;

import com.smartcampus.dto.request.IncidentRequest;
import com.smartcampus.model.Incident;

import java.util.List;

public interface IncidentService {

    Incident reportIncident(Long reporterId, IncidentRequest request);

    List<Incident> getOpenIncidents();
}
