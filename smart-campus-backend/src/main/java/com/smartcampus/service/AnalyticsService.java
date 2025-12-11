package com.smartcampus.service;

import com.smartcampus.dto.response.BookingAnalyticsResponse;
import com.smartcampus.dto.response.DashboardStatsResponse;
import com.smartcampus.dto.response.IncidentAnalyticsResponse;

import java.time.LocalDate;

public interface AnalyticsService {

    BookingAnalyticsResponse getBookingAnalytics(LocalDate startDate, LocalDate endDate);

    IncidentAnalyticsResponse getIncidentAnalytics(LocalDate startDate, LocalDate endDate);

    DashboardStatsResponse getDashboardStats();
}
