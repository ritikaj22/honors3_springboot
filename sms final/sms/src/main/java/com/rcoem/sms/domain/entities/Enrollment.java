package com.rcoem.sms.domain.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "enrollment")
public class Enrollment {

    @Id
    private String id;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private StudentInfo student;

    public Enrollment() {
    }

    public Enrollment(String id, Course course, StudentInfo student) {
        this.id = id;
        this.course = course;
        this.student = student;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }

    public StudentInfo getStudent() { return student; }
    public void setStudent(StudentInfo student) { this.student = student; }
}
