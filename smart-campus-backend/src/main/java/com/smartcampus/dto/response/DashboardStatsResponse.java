package com.smartcampus.dto.response;

public class DashboardStatsResponse {

    private long totalResources;
    private long availableResources;
    private long totalBookings;
    private long totalIncidents;

    public DashboardStatsResponse() {
    }

    public DashboardStatsResponse(long totalResources, long availableResources,
                                  long totalBookings, long totalIncidents) {
        this.totalResources = totalResources;
        this.availableResources = availableResources;
        this.totalBookings = totalBookings;
        this.totalIncidents = totalIncidents;
    }

    public long getTotalResources() {
        return totalResources;
    }

    public void setTotalResources(long totalResources) {
        this.totalResources = totalResources;
    }

    public long getAvailableResources() {
        return availableResources;
    }

    public void setAvailableResources(long availableResources) {
        this.availableResources = availableResources;
    }

    public long getTotalBookings() {
        return totalBookings;
    }

    public void setTotalBookings(long totalBookings) {
        this.totalBookings = totalBookings;
    }

    public long getTotalIncidents() {
        return totalIncidents;
    }

    public void setTotalIncidents(long totalIncidents) {
        this.totalIncidents = totalIncidents;
    }
}
