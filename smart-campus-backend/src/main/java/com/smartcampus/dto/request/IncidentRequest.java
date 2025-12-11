package com.smartcampus.dto.request;

import com.smartcampus.model.enums.IncidentType;
import com.smartcampus.model.enums.Severity;

public class IncidentRequest {

    private IncidentType incidentType;
    private String location;
    private String description;
    private Severity severity;

    public IncidentRequest() {
    }

    public IncidentRequest(IncidentType incidentType, String location,
                           String description, Severity severity) {
        this.incidentType = incidentType;
        this.location = location;
        this.description = description;
        this.severity = severity;
    }

    public IncidentType getIncidentType() {
        return incidentType;
    }

    public void setIncidentType(IncidentType incidentType) {
        this.incidentType = incidentType;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Severity getSeverity() {
        return severity;
    }

    public void setSeverity(Severity severity) {
        this.severity = severity;
    }

    @Override
    public String toString() {
        return "IncidentRequest{" +
                "incidentType=" + incidentType +
                ", location='" + location + '\'' +
                ", severity=" + severity +
                '}';
    }
}
