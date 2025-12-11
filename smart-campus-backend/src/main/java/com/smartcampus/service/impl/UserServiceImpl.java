package com.smartcampus.service.impl;

import com.smartcampus.dto.request.RegisterRequest;
import com.smartcampus.model.User;
import com.smartcampus.model.enums.Role;
import com.smartcampus.repository.UserRepository;
import com.smartcampus.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // yahi bean use hoga

    public UserServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User registerStudent(RegisterRequest request) {
        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setDepartment(request.getDepartment());
        user.setPhone(request.getPhone());
        user.setRole(Role.STUDENT);
        user.setIsActive(true);
        return userRepository.save(user);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
}
