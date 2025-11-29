package com.rcoem.sms.application.services;

import java.util.List;

import com.rcoem.sms.application.dto.StudentDetails;

public interface StudentService {
    List<StudentDetails> getAllStudents();
    StudentDetails createStudent(StudentDetails studentDetails);
    StudentDetails getStudentById(String id);
    StudentDetails updateStudentById(StudentDetails studentDetails);
    void deleteStudentById(StudentDetails studentDetails);

    StudentDetails addPoints(String studentId, Integer delta);
    List<StudentDetails> getRankList();
}
