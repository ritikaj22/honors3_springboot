package com.rcoem.sms.application.mapper;

import com.rcoem.sms.application.dto.StudentDetails;
import com.rcoem.sms.domain.entities.StudentInfo;
import org.springframework.stereotype.Component;

@Component
public class StudentMapper {

    public StudentDetails toDto(StudentInfo s) {
        if (s == null) return null;
        StudentDetails d = new StudentDetails();
        d.setId(s.getId());
        d.setRollNo(s.getRollNo());
        d.setName(s.getName());
        d.setCourse(s.getCourse());
        d.setEmail(s.getEmail());
        d.setMobileNumber(s.getMobileNumber());
        d.setDepartment(s.getDepartment());
        d.setGender(s.getGender());
        d.setDateOfBirth(s.getDateOfBirth());
        d.setPoints(s.getPoints());
        return d;
    }

    public StudentInfo toEntity(StudentDetails s) {
        if (s == null) return null;
        StudentInfo e = new StudentInfo();
        e.setId(s.getId());
        e.setRollNo(s.getRollNo());
        e.setName(s.getName());
        e.setCourse(s.getCourse());
        e.setEmail(s.getEmail());
        e.setMobileNumber(s.getMobileNumber());
        e.setDepartment(s.getDepartment());
        e.setGender(s.getGender());
        e.setDateOfBirth(s.getDateOfBirth());
        e.setPoints(s.getPoints());
        return e;
    }
}
