package com.rcoem.sms.application.services;

import java.util.List;

import com.rcoem.sms.application.dto.CourseDetails;

public interface CourseService {
    CourseDetails createCourse(CourseDetails courseDetails);
    List<CourseDetails> getAllCourses();
    void enrollStudent(String courseId, String studentId);
}
