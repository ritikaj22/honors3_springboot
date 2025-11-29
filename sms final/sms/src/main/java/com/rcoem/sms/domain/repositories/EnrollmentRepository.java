package com.rcoem.sms.domain.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rcoem.sms.domain.entities.Enrollment;

public interface EnrollmentRepository extends JpaRepository<Enrollment, String> {
}
