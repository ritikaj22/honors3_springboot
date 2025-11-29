package com.rcoem.sms.intefaces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rcoem.sms.application.dto.UserDetails;
import com.rcoem.sms.application.services.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping
    public UserDetails register(@RequestBody UserDetails user) {
        return userService.registerUser(user);
    }

    @PostMapping("/sign-in")
    public UserDetails signIn(@RequestBody UserDetails body) {
        return userService.signInUser(body.getEmail(), body.getPassword());
    }

    @PutMapping("/{id}")
    public UserDetails updateUser(@PathVariable String id, @RequestBody UserDetails user) {
        user.setId(id);
        return userService.updateUserDetails(user);
    }
}
