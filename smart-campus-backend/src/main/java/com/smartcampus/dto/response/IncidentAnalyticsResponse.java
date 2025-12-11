package com.smartcampus.dto.response;

import com.smartcampus.model.enums.IncidentType;
import com.smartcampus.model.enums.Severity;

import java.util.Map;

public class IncidentAnalyticsResponse {

    private long totalIncidents;
    private Map<Severity, Long> severityCount;
    private Map<IncidentType, Long> typeCount;

    public IncidentAnalyticsResponse() {
    }

    public IncidentAnalyticsResponse(long totalIncidents,
                                     Map<Severity, Long> severityCount,
                                     Map<IncidentType, Long> typeCount) {
        this.totalIncidents = totalIncidents;
        this.severityCount = severityCount;
        this.typeCount = typeCount;
    }

    public long getTotalIncidents() {
        return totalIncidents;
    }

    public void setTotalIncidents(long totalIncidents) {
        this.totalIncidents = totalIncidents;
    }

    public Map<Severity, Long> getSeverityCount() {
        return severityCount;
    }

    public void setSeverityCount(Map<Severity, Long> severityCount) {
        this.severityCount = severityCount;
    }

    public Map<IncidentType, Long> getTypeCount() {
        return typeCount;
    }

    public void setTypeCount(Map<IncidentType, Long> typeCount) {
        this.typeCount = typeCount;
    }
}
