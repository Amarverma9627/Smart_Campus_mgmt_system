package com.smartcampus.dto.response;

import java.util.Map;

public class BookingAnalyticsResponse {

    private long totalBookings;
    private Map<String, Long> bookingsPerResource;   // resourceName -> count

    public BookingAnalyticsResponse() {
    }

    public BookingAnalyticsResponse(long totalBookings, Map<String, Long> bookingsPerResource) {
        this.totalBookings = totalBookings;
        this.bookingsPerResource = bookingsPerResource;
    }

    public long getTotalBookings() {
        return totalBookings;
    }

    public void setTotalBookings(long totalBookings) {
        this.totalBookings = totalBookings;
    }

    public Map<String, Long> getBookingsPerResource() {
        return bookingsPerResource;
    }

    public void setBookingsPerResource(Map<String, Long> bookingsPerResource) {
        this.bookingsPerResource = bookingsPerResource;
    }
}
