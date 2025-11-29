package com.rcoem.sms.application.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rcoem.sms.application.dto.CourseDetails;
import com.rcoem.sms.application.mapper.CourseMapper;
import com.rcoem.sms.domain.entities.Course;
import com.rcoem.sms.domain.entities.Enrollment;
import com.rcoem.sms.domain.entities.StudentInfo;
import com.rcoem.sms.domain.repositories.CourseRepository;
import com.rcoem.sms.domain.repositories.EnrollmentRepository;
import com.rcoem.sms.domain.repositories.StudentRepository;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    EnrollmentRepository enrollmentRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    CourseMapper courseMapper;

    @Override
    public CourseDetails createCourse(CourseDetails courseDetails) {
        String id = "COURSE" + UUID.randomUUID();
        courseDetails.setId(id);
        Course saved = courseRepository.save(courseMapper.toEntity(courseDetails));
        return courseMapper.toDto(saved);
    }

    @Override
    public List<CourseDetails> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(courseMapper::toDto)
                .toList();
    }

    @Override
    public void enrollStudent(String courseId, String studentId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        StudentInfo student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
Enrollment enrollment = new Enrollment();
enrollment.setId("ENR" + UUID.randomUUID());
enrollment.setCourse(course);
enrollment.setStudent(student);

        enrollmentRepository.save(enrollment);
    }
}
