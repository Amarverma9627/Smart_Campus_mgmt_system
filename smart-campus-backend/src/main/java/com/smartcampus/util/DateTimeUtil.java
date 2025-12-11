package com.smartcampus.util;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateTimeUtil {

    private DateTimeUtil() {
        // prevent instantiation
    }

    private static final DateTimeFormatter DATE_FORMATTER =
            DateTimeFormatter.ofPattern("yyyy-MM-dd");

    private static final DateTimeFormatter DATE_TIME_FORMATTER =
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    // -------- LocalDate helpers --------

    public static String formatDate(LocalDate date) {
        return date != null ? date.format(DATE_FORMATTER) : null;
    }

    public static LocalDate parseDate(String text) {
        return text != null && !text.isBlank()
                ? LocalDate.parse(text, DATE_FORMATTER)
                : null;
    }

    // -------- LocalDateTime helpers --------

    public static String formatDateTime(LocalDateTime dateTime) {
        return dateTime != null ? dateTime.format(DATE_TIME_FORMATTER) : null;
    }

    public static LocalDateTime parseDateTime(String text) {
        return text != null && !text.isBlank()
                ? LocalDateTime.parse(text, DATE_TIME_FORMATTER)
                : null;
    }

    // Current timestamp as formatted string
    public static String nowAsString() {
        return formatDateTime(LocalDateTime.now());
    }
}
