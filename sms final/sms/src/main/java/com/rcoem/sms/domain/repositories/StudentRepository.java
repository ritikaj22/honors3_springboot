package com.rcoem.sms.domain.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rcoem.sms.domain.entities.StudentInfo;

public interface StudentRepository extends JpaRepository<StudentInfo, String> {
    List<StudentInfo> findAllByOrderByPointsDesc();
}
