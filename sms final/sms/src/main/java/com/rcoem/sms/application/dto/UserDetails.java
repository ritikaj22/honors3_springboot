package com.rcoem.sms.application.dto;

public class UserDetails {

    private String id;
    private String name;
    private String type;
    private String email;
    private String mobileNumber;
    private String password;
    private String gender;
    private String dateOfBirth;
    private String department;

    public UserDetails() {
    }

    public UserDetails(String id, String name, String type, String email,
                       String mobileNumber, String password, String gender,
                       String dateOfBirth, String department) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.password = password;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.department = department;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMobileNumber() { return mobileNumber; }
    public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(String dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
}
