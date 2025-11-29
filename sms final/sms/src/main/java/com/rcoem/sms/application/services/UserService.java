package com.rcoem.sms.application.services;

import com.rcoem.sms.application.dto.UserDetails;

public interface UserService {
    UserDetails registerUser(UserDetails userDetails);
    UserDetails signInUser(String email, String password);
    UserDetails updateUserDetails(UserDetails userDetails);
}
