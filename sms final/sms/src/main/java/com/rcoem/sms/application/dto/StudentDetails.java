package com.rcoem.sms.application.dto;

public class StudentDetails {

    private String id;
    private String rollNo;
    private String name;
    private String course;
    private String email;
    private String mobileNumber;
    private String department;
    private String gender;
    private String dateOfBirth;
    private Integer points;

    public StudentDetails() {
    }

    public StudentDetails(String id, String rollNo, String name, String course,
                          String email, String mobileNumber, String department,
                          String gender, String dateOfBirth, Integer points) {
        this.id = id;
        this.rollNo = rollNo;
        this.name = name;
        this.course = course;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.department = department;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.points = points;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getRollNo() { return rollNo; }
    public void setRollNo(String rollNo) { this.rollNo = rollNo; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMobileNumber() { return mobileNumber; }
    public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(String dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public Integer getPoints() { return points; }
    public void setPoints(Integer points) { this.points = points; }
}
