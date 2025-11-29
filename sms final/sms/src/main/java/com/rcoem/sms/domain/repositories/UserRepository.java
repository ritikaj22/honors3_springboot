package com.rcoem.sms.domain.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rcoem.sms.domain.entities.UserInfo;

public interface UserRepository extends JpaRepository<UserInfo, String> {
    Optional<UserInfo> findByEmail(String email);
    Optional<UserInfo> findByMobileNumber(String mobileNumber);
    boolean existsByEmail(String email);
    boolean existsByMobileNumber(String mobileNumber);
}
