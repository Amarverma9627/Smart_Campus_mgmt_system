package com.smartcampus.controller;

import com.smartcampus.dto.response.BookingAnalyticsResponse;
import com.smartcampus.dto.response.DashboardStatsResponse;
import com.smartcampus.dto.response.IncidentAnalyticsResponse;
import com.smartcampus.service.AnalyticsService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "http://localhost:3000")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    // Summary cards for dashboard (admin/security)
    @PreAuthorize("hasAnyRole('ADMIN','SECURITY_STAFF')")
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardStatsResponse> getDashboardStats() {
        DashboardStatsResponse stats = analyticsService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }

    // Booking analytics between dates
    // Example: /api/analytics/bookings?start=2025-01-01&end=2025-01-31
    @PreAuthorize("hasAnyRole('ADMIN','SECURITY_STAFF')")
    @GetMapping("/bookings")
    public ResponseEntity<BookingAnalyticsResponse> getBookingAnalytics(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {

        BookingAnalyticsResponse data = analyticsService.getBookingAnalytics(start, end);
        return ResponseEntity.ok(data);
    }

    // Incident analytics between dates
    // Example: /api/analytics/incidents?start=2025-01-01&end=2025-01-31
    @PreAuthorize("hasAnyRole('ADMIN','SECURITY_STAFF')")
    @GetMapping("/incidents")
    public ResponseEntity<IncidentAnalyticsResponse> getIncidentAnalytics(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {

        IncidentAnalyticsResponse data = analyticsService.getIncidentAnalytics(start, end);
        return ResponseEntity.ok(data);
    }
}
