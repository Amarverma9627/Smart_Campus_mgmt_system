package com.smartcampus.service.impl;

import com.smartcampus.dto.request.BookingRequest;
import com.smartcampus.exception.BookingConflictException;
import com.smartcampus.model.Booking;
import com.smartcampus.model.Resource;
import com.smartcampus.model.User;
import com.smartcampus.model.enums.BookingStatus;
import com.smartcampus.repository.BookingRepository;
import com.smartcampus.repository.ResourceRepository;
import com.smartcampus.repository.UserRepository;
import com.smartcampus.service.BookingService;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final ResourceRepository resourceRepository;

    public BookingServiceImpl(BookingRepository bookingRepository,
                              UserRepository userRepository,
                              ResourceRepository resourceRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.resourceRepository = resourceRepository;
    }

    @Override
    public Booking createBooking(Long userId, BookingRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));

        Resource resource = resourceRepository.findById(request.getResourceId())
                .orElseThrow(() -> new RuntimeException("Resource not found: " + request.getResourceId()));

        // 1) Same date ke existing bookings fetch karo
        List<Booking> existingBookings =
                bookingRepository.findByResourceIdAndBookingDate(resource.getId(), request.getBookingDate());

        // 2) Conflict check
        for (Booking b : existingBookings) {
            if (isTimeOverlap(
                    request.getStartTime(), request.getEndTime(),
                    b.getStartTime(), b.getEndTime()
            )) {
                throw new BookingConflictException(
                        "Resource already booked between " +
                                b.getStartTime() + " and " + b.getEndTime()
                );
            }
        }

        // 3) If no conflict → save booking
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setResource(resource);
        booking.setBookingDate(request.getBookingDate());
        booking.setStartTime(request.getStartTime());
        booking.setEndTime(request.getEndTime());
        booking.setPurpose(request.getPurpose());
        booking.setStatus(BookingStatus.CONFIRMED);

        return bookingRepository.save(booking);
    }

    @Override
    public void cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found: " + bookingId));
        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }

    @Override
    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    // ---- Helper method ----
    /**
     * Check if two time intervals overlap:
     * [start1, end1] and [start2, end2]
     */
    private boolean isTimeOverlap(LocalTime start1, LocalTime end1,
                                  LocalTime start2, LocalTime end2) {

        // No overlap when one ends before other starts
        if (end1.compareTo(start2) <= 0 || start1.compareTo(end2) >= 0) {
            return false;
        }
        return true;
    }
}
