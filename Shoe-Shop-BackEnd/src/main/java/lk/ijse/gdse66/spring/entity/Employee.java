package lk.ijse.gdse66.spring.entity;

import jakarta.persistence.*;
import lk.ijse.gdse66.spring.embeded.Address;
import lk.ijse.gdse66.spring.enums.Gender;
import lk.ijse.gdse66.spring.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
@Entity
public class Employee {
    @Id
    private String code;
    private String name;
    private String pic;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String status;
    @Enumerated(EnumType.STRING)
    private Role role;
    private LocalDate birth;
    private LocalDate joinDate ;
    private String branch;
    @Embedded
    private Address address;
    private String contact;
    private String email;
    private String person;
    private String EmgContact;

    @OneToOne(cascade = CascadeType.ALL)
    private User user;

}
