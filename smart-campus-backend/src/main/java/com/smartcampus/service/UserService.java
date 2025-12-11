package com.smartcampus.service;

import com.smartcampus.dto.request.RegisterRequest;
import com.smartcampus.model.User;

public interface UserService {

    User registerStudent(RegisterRequest request);

    User findByEmail(String email);
}
