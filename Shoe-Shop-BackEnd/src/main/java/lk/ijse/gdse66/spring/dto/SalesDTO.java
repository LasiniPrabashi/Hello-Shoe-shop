package lk.ijse.gdse66.spring.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lk.ijse.gdse66.spring.enums.Payment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SalesDTO {
    private String oId;
    private String purchaseDate;
    private Double total;
    private Payment paymentMethod;
    private Integer totalPoints;
    private String cashier;

}
