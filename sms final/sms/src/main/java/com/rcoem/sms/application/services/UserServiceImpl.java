package com.rcoem.sms.application.services;

import com.rcoem.sms.application.dto.StudentDetails;
import com.rcoem.sms.application.dto.UserDetails;
import com.rcoem.sms.application.mapper.UserMapper;
import com.rcoem.sms.domain.entities.UserInfo;
import com.rcoem.sms.domain.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

import static java.util.Objects.nonNull;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserMapper userMapper;

    @Autowired
    StudentService studentService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public UserDetails registerUser(UserDetails userDetails) {

        if (userRepository.existsByEmail(userDetails.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        if (userRepository.existsByMobileNumber(userDetails.getMobileNumber())) {
            throw new RuntimeException("Mobile already in use");
        }

        String uid = "USER" + UUID.randomUUID();
        userDetails.setId(uid);
        userDetails.setPassword(passwordEncoder.encode(userDetails.getPassword()));

        UserInfo savedUser = userRepository.save(userMapper.toEntity(userDetails));
        UserDetails dto = userMapper.toDto(savedUser);
        dto.setPassword(null);

       if ("student".equalsIgnoreCase(userDetails.getType())) {
    StudentDetails s = new StudentDetails();
    s.setId(savedUser.getId());
    s.setName(savedUser.getName());
    s.setEmail(savedUser.getEmail());
    s.setGender(savedUser.getGender());
    s.setMobileNumber(savedUser.getMobileNumber());
    s.setDepartment(savedUser.getDepartment());
    s.setPoints(0);
    studentService.createStudent(s);
}
        return dto;
    }

    @Override
    public UserDetails signInUser(String email, String password) {
        UserInfo userDetails = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User Not found"));

        if (nonNull(userDetails) &&
                passwordEncoder.matches(password, userDetails.getPassword())) {
            UserDetails dto = userMapper.toDto(userDetails);
            dto.setPassword(null);
            return dto;
        }
        throw new RuntimeException("Invalid credentials");
    }

    @Override
    public UserDetails updateUserDetails(UserDetails userDetails) {
        UserInfo existing = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!existing.getEmail().equals(userDetails.getEmail())
                && userRepository.existsByEmail(userDetails.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        if (userDetails.getMobileNumber() != null &&
                !userDetails.getMobileNumber().equals(existing.getMobileNumber())
                && userRepository.existsByMobileNumber(userDetails.getMobileNumber())) {
            throw new RuntimeException("Mobile already in use");
        }

        existing.setName(userDetails.getName());
        existing.setEmail(userDetails.getEmail());
        existing.setMobileNumber(userDetails.getMobileNumber());
        existing.setDepartment(userDetails.getDepartment());

        UserInfo saved = userRepository.save(existing);
        UserDetails dto = userMapper.toDto(saved);
        dto.setPassword(null);
        return dto;
    }
}
