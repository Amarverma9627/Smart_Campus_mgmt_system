package com.smartcampus.service.impl;

import com.smartcampus.dto.request.IncidentRequest;
import com.smartcampus.model.Incident;
import com.smartcampus.model.User;
import com.smartcampus.model.enums.IncidentStatus;
import com.smartcampus.repository.IncidentRepository;
import com.smartcampus.repository.UserRepository;
import com.smartcampus.service.IncidentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncidentServiceImpl implements IncidentService {

    private final IncidentRepository incidentRepository;
    private final UserRepository userRepository;

    public IncidentServiceImpl(IncidentRepository incidentRepository,
                               UserRepository userRepository) {
        this.incidentRepository = incidentRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Incident reportIncident(Long reporterId, IncidentRequest request) {
        User reporter = userRepository.findById(reporterId).orElseThrow();

        Incident incident = new Incident();
        incident.setReporter(reporter);
        incident.setIncidentType(request.getIncidentType());
        incident.setLocation(request.getLocation());
        incident.setDescription(request.getDescription());
        incident.setSeverity(request.getSeverity());
        incident.setStatus(IncidentStatus.OPEN);

        return incidentRepository.save(incident);
    }

    @Override
    public List<Incident> getOpenIncidents() {
        return incidentRepository.findByStatus(IncidentStatus.OPEN);
    }
}
