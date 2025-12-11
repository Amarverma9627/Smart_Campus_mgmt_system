package com.smartcampus.service.impl;

import com.smartcampus.dto.response.BookingAnalyticsResponse;
import com.smartcampus.dto.response.DashboardStatsResponse;
import com.smartcampus.dto.response.IncidentAnalyticsResponse;
import com.smartcampus.model.Booking;
import com.smartcampus.model.Incident;
import com.smartcampus.model.enums.IncidentType;
import com.smartcampus.model.enums.Severity;
import com.smartcampus.repository.BookingRepository;
import com.smartcampus.repository.IncidentRepository;
import com.smartcampus.repository.ResourceRepository;
import com.smartcampus.service.AnalyticsService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AnalyticsServiceImpl implements AnalyticsService {

    private final BookingRepository bookingRepository;
    private final IncidentRepository incidentRepository;
    private final ResourceRepository resourceRepository;

    public AnalyticsServiceImpl(BookingRepository bookingRepository,
                                IncidentRepository incidentRepository,
                                ResourceRepository resourceRepository) {
        this.bookingRepository = bookingRepository;
        this.incidentRepository = incidentRepository;
        this.resourceRepository = resourceRepository;
    }

    @Override
    public BookingAnalyticsResponse getBookingAnalytics(LocalDate startDate, LocalDate endDate) {
        List<Booking> bookings = bookingRepository.findAll().stream()
                .filter(b -> b.getBookingDate() != null
                        && !b.getBookingDate().isBefore(startDate)
                        && !b.getBookingDate().isAfter(endDate))
                .toList();

        long total = bookings.size();

        Map<String, Long> perResource = bookings.stream()
                .collect(Collectors.groupingBy(
                        b -> b.getResource().getName(),
                        Collectors.counting()
                ));

        return new BookingAnalyticsResponse(total, perResource);
    }

    @Override
    public IncidentAnalyticsResponse getIncidentAnalytics(LocalDate startDate, LocalDate endDate) {
        List<Incident> incidents = incidentRepository.findAll().stream()
                .filter(i -> i.getCreatedAt() != null
                        && !i.getCreatedAt().toLocalDate().isBefore(startDate)
                        && !i.getCreatedAt().toLocalDate().isAfter(endDate))
                .toList();

        long total = incidents.size();

        Map<Severity, Long> severityCount = incidents.stream()
                .collect(Collectors.groupingBy(
                        Incident::getSeverity,
                        Collectors.counting()
                ));

        Map<IncidentType, Long> typeCount = incidents.stream()
                .collect(Collectors.groupingBy(
                        Incident::getIncidentType,
                        Collectors.counting()
                ));

        return new IncidentAnalyticsResponse(total, severityCount, typeCount);
    }

    @Override
    public DashboardStatsResponse getDashboardStats() {
        long totalResources = resourceRepository.count();
        long availableResources = resourceRepository.findByIsAvailable(true).size();
        long totalBookings = bookingRepository.count();
        long totalIncidents = incidentRepository.count();

        return new DashboardStatsResponse(
                totalResources,
                availableResources,
                totalBookings,
                totalIncidents
        );
    }
}
