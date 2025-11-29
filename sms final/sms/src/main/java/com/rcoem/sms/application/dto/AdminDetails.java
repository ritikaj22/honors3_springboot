package com.rcoem.sms.application.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminDetails {

    private String id;
    private String name;
    private String email;
    private String mobileNumber;
    private String department;
    private String gender;
    private String dateOfBirth;
}
