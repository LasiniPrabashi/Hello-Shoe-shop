package lk.ijse.gdse66.spring.dto;

import lk.ijse.gdse66.spring.embeded.Address;
import lk.ijse.gdse66.spring.enums.Gender;
import lk.ijse.gdse66.spring.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EmployeeDTO {
    private String code;
    private String name;
    private String pic;
    private Gender gender;
    private String status;
    private String designation;
    private Role role;
    private Date birth;
    private Date joinDate ;
    private String branch;
    private Address address;
    private String contact;
    private String email;
    private String person;
    private String EmgContact;

    private UserDTO user;
}
