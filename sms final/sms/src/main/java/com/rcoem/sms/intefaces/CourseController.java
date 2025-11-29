package com.rcoem.sms.intefaces;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rcoem.sms.application.dto.CourseDetails;
import com.rcoem.sms.application.services.CourseService;

@RestController
@RequestMapping("/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    @Autowired
    CourseService courseService;

    @PostMapping
    public CourseDetails create(@RequestBody CourseDetails course) {
        return courseService.createCourse(course);
    }

    @GetMapping
    public List<CourseDetails> getAll() {
        return courseService.getAllCourses();
    }

    @PostMapping("/{courseId}/enroll/{studentId}")
    public void enroll(@PathVariable String courseId, @PathVariable String studentId) {
        courseService.enrollStudent(courseId, studentId);
    }
}
