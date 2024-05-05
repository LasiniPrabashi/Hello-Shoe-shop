package lk.ijse.gdse66.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaleDetail_PK implements Serializable {
    private String oId;
    private String code;

}
