package com.rcoem.sms.application.mapper;

import com.rcoem.sms.application.dto.CourseDetails;
import com.rcoem.sms.domain.entities.Course;
import org.springframework.stereotype.Component;

@Component
public class CourseMapper {

    public CourseDetails toDto(Course c) {
        if (c == null) return null;
        CourseDetails d = new CourseDetails();
        d.setId(c.getId());
        d.setName(c.getName());
        d.setDescription(c.getDescription());
        d.setDepartment(c.getDepartment());
        return d;
    }

    public Course toEntity(CourseDetails d) {
        if (d == null) return null;
        Course c = new Course();
        c.setId(d.getId());
        c.setName(d.getName());
        c.setDescription(d.getDescription());
        c.setDepartment(d.getDepartment());
        return c;
    }
}
