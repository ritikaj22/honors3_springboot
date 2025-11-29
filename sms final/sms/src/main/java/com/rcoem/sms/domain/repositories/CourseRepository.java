package com.rcoem.sms.domain.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rcoem.sms.domain.entities.Course;

public interface CourseRepository extends JpaRepository<Course, String> {
}
