package com.smartcampus.repository;

import com.smartcampus.model.Booking;
import com.smartcampus.model.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserId(Long userId);

    List<Booking> findByResourceIdAndBookingDate(Long resourceId, LocalDate bookingDate);

    List<Booking> findByStatus(BookingStatus status);
}
