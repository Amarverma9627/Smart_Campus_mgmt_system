package com.smartcampus.service;

import com.smartcampus.dto.request.BookingRequest;
import com.smartcampus.model.Booking;

import java.util.List;

public interface BookingService {

    Booking createBooking(Long userId, BookingRequest request);

    void cancelBooking(Long bookingId);

    List<Booking> getUserBookings(Long userId);
}
