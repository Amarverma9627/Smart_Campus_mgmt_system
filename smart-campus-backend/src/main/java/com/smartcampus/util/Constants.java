package com.smartcampus.util;

public class Constants {

    private Constants() {
        // prevent instantiation
    }

    // ================== Roles ==================
    public static final String ROLE_ADMIN = "ADMIN";
    public static final String ROLE_STUDENT = "STUDENT";
    public static final String ROLE_SECURITY = "SECURITY_STAFF";

    // ================== JWT Defaults ==================
    public static final String JWT_HEADER = "Authorization";
    public static final String JWT_PREFIX = "Bearer ";

    // ================== Common Messages ==================
    public static final String MSG_RESOURCE_NOT_FOUND = "Resource not found";
    public static final String MSG_USER_NOT_FOUND = "User not found";
    public static final String MSG_BOOKING_CONFLICT = "Booking time conflict for this resource";
    public static final String MSG_UNAUTHORIZED = "You are not authorized to perform this action";
    public static final String MSG_INVALID_CREDENTIALS = "Invalid email or password";

    // ================== Date / Time Patterns ==================
    public static final String DATE_PATTERN = "yyyy-MM-dd";
    public static final String DATE_TIME_PATTERN = "yyyy-MM-dd HH:mm:ss";

    // ================== Pagination Defaults (optional) ==================
    public static final int DEFAULT_PAGE = 0;
    public static final int DEFAULT_PAGE_SIZE = 10;
    public static final int MAX_PAGE_SIZE = 100;
}
