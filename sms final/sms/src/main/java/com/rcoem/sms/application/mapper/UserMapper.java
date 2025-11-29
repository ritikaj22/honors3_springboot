package com.rcoem.sms.application.mapper;

import com.rcoem.sms.application.dto.UserDetails;
import com.rcoem.sms.domain.entities.UserInfo;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDetails toDto(UserInfo userInfo) {
        if (userInfo == null) return null;
        UserDetails d = new UserDetails();
        d.setId(userInfo.getId());
        d.setName(userInfo.getName());
        d.setType(userInfo.getType());
        d.setEmail(userInfo.getEmail());
        d.setMobileNumber(userInfo.getMobileNumber());
        d.setPassword(userInfo.getPassword());
        d.setGender(userInfo.getGender());
        d.setDateOfBirth(userInfo.getDateOfBirth());
        d.setDepartment(userInfo.getDepartment());
        return d;
    }

    public UserInfo toEntity(UserDetails userDetails) {
        if (userDetails == null) return null;
        UserInfo u = new UserInfo();
        u.setId(userDetails.getId());
        u.setName(userDetails.getName());
        u.setType(userDetails.getType());
        u.setEmail(userDetails.getEmail());
        u.setMobileNumber(userDetails.getMobileNumber());
        u.setPassword(userDetails.getPassword());
        u.setGender(userDetails.getGender());
        u.setDateOfBirth(userDetails.getDateOfBirth());
        u.setDepartment(userDetails.getDepartment());
        return u;
    }
}
