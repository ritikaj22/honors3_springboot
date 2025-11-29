package com.rcoem.sms.application.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rcoem.sms.application.dto.StudentDetails;
import com.rcoem.sms.application.mapper.StudentMapper;
import com.rcoem.sms.domain.entities.StudentInfo;
import com.rcoem.sms.domain.repositories.StudentRepository;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    StudentMapper studentMapper;

    @Override
    public List<StudentDetails> getAllStudents() {
        return studentRepository.findAll()
                .stream()
                .map(studentMapper::toDto)
                .toList();
    }

    @Override
    public StudentDetails createStudent(StudentDetails studentDetails) {
        if (studentDetails.getId() == null) {
            String uid = "RCOEM" + UUID.randomUUID();
            studentDetails.setId(uid);
        }
        StudentInfo insertedRecord = studentRepository.save(studentMapper.toEntity(studentDetails));
        return studentMapper.toDto(insertedRecord);
    }

    @Override
    public StudentDetails getStudentById(String id) {
        Optional<StudentInfo> studentInfo = studentRepository.findById(id);
        return studentInfo.map(studentMapper::toDto).orElse(null);
    }

    @Override
    public StudentDetails updateStudentById(StudentDetails studentDetails) {
        StudentInfo insertedRecord = studentRepository.save(studentMapper.toEntity(studentDetails));
        return studentMapper.toDto(insertedRecord);
    }

    @Override
    public void deleteStudentById(StudentDetails studentDetails) {
        studentRepository.delete(studentMapper.toEntity(studentDetails));
    }

    @Override
    public StudentDetails addPoints(String studentId, Integer delta) {
        StudentInfo s = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        int current = s.getPoints() == null ? 0 : s.getPoints();
        s.setPoints(current + delta);
        return studentMapper.toDto(studentRepository.save(s));
    }

    @Override
    public List<StudentDetails> getRankList() {
        return studentRepository.findAllByOrderByPointsDesc().stream()
                .map(studentMapper::toDto)
                .toList();
    }
}
