package lk.ijse.gdse66.spring.dto;

import lk.ijse.gdse66.spring.embeded.Address;
import lk.ijse.gdse66.spring.enums.Gender;
import lk.ijse.gdse66.spring.enums.Level;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDTO {
    private String code;
    private String name;
    private Gender gender;
    private Date loyaltyDate;
    private Level level;
    private Integer loyaltyPoints;
    private Date dob;
    private Address address;
    private String contact;
    private String email;
    private String recentPurchaseDate;

}
