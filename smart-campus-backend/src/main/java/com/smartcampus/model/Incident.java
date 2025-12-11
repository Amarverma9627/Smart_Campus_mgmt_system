package com.smartcampus.model;

import com.smartcampus.model.enums.IncidentType;
import com.smartcampus.model.enums.IncidentStatus;
import com.smartcampus.model.enums.Severity;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "incidents")
public class Incident {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Reporter (student/staff)
    @ManyToOne
    @JoinColumn(name = "reporter_id", nullable = false)
    private User reporter;

    @Enumerated(EnumType.STRING)
    private IncidentType incidentType;

    private String location;

    @Column(nullable = false)
    private String description;

    @Enumerated(EnumType.STRING)
    private Severity severity;

    @Enumerated(EnumType.STRING)
    private IncidentStatus status = IncidentStatus.OPEN;

    // Assigned security staff (optional)
    @ManyToOne
    @JoinColumn(name = "assigned_to")
    private User assignedTo;

    private String photoUrl;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Incident() {
    }

    public Incident(Long id,
                    User reporter,
                    IncidentType incidentType,
                    String location,
                    String description,
                    Severity severity,
                    IncidentStatus status,
                    User assignedTo,
                    String photoUrl,
                    LocalDateTime createdAt,
                    LocalDateTime updatedAt) {
        this.id = id;
        this.reporter = reporter;
        this.incidentType = incidentType;
        this.location = location;
        this.description = description;
        this.severity = severity;
        this.status = status;
        this.assignedTo = assignedTo;
        this.photoUrl = photoUrl;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public User getReporter() {
        return reporter;
    }

    public IncidentType getIncidentType() {
        return incidentType;
    }

    public String getLocation() {
        return location;
    }

    public String getDescription() {
        return description;
    }

    public Severity getSeverity() {
        return severity;
    }

    public IncidentStatus getStatus() {
        return status;
    }

    public User getAssignedTo() {
        return assignedTo;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setReporter(User reporter) {
        this.reporter = reporter;
    }

    public void setIncidentType(IncidentType incidentType) {
        this.incidentType = incidentType;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setSeverity(Severity severity) {
        this.severity = severity;
    }

    public void setStatus(IncidentStatus status) {
        this.status = status;
    }

    public void setAssignedTo(User assignedTo) {
        this.assignedTo = assignedTo;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    // Optional: toString for debugging

    @Override
    public String toString() {
        return "Incident{" +
                "id=" + id +
                ", reporter=" + (reporter != null ? reporter.getId() : null) +
                ", incidentType=" + incidentType +
                ", location='" + location + '\'' +
                ", severity=" + severity +
                ", status=" + status +
                ", assignedTo=" + (assignedTo != null ? assignedTo.getId() : null) +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
