package com.rcoem.sms.intefaces;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rcoem.sms.application.dto.StudentDetails;
import com.rcoem.sms.application.services.StudentService;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    StudentService studentService;

    @GetMapping
    public List<StudentDetails> getAll() {
        return studentService.getAllStudents();
    }

    @GetMapping("/rank-list")
    public List<StudentDetails> rankList() {
        return studentService.getRankList();
    }

    @PostMapping("/{id}/points")
    public StudentDetails addPoints(@PathVariable String id, @RequestParam Integer delta) {
        return studentService.addPoints(id, delta);
    }
}
