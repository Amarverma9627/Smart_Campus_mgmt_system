package com.smartcampus.controller;

import com.smartcampus.dto.request.BookingRequest;
import com.smartcampus.model.Booking;
import com.smartcampus.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // Create new booking
    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping
    public ResponseEntity<Booking> createBooking(
            @RequestParam Long userId,
            @RequestBody BookingRequest request) {
        Booking booking = bookingService.createBooking(userId, request);
        return ResponseEntity.ok(booking);
    }

    // Students can see their own bookings, Admin can see sabka – advanced version me
    @PreAuthorize("isAuthenticated()")
    // Get user's all bookings
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getUserBookings(@PathVariable Long userId) {
        List<Booking> bookings = bookingService.getUserBookings(userId);
        return ResponseEntity.ok(bookings);
    }

    // Cancel – student or admin (simple)
    @PreAuthorize("hasAnyRole('STUDENT','ADMIN')")
    // Cancel booking
    @PutMapping("/{bookingId}/cancel")
    public ResponseEntity<Void> cancelBooking(@PathVariable Long bookingId) {
        bookingService.cancelBooking(bookingId);
        return ResponseEntity.ok().build();
    }
}
