package com.smartcampus.dto.request;

public class RegisterRequest {

    private String fullName;
    private String email;
    private String password;
    private String department;
    private String phone;

    public RegisterRequest() {
    }

    public RegisterRequest(String fullName, String email, String password,
                           String department, String phone) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.department = department;
        this.phone = phone;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "RegisterRequest{" +
                "fullName='" + fullName + '\'' +
                ", email='" + email + '\'' +
                ", department='" + department + '\'' +
                ", phone='" + phone + '\'' +
                '}';
    }
}
