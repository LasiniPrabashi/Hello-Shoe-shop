package lk.ijse.gdse66.spring.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Sale {
    @Id
    private String oid;
    @CreationTimestamp
    private LocalDateTime purchaseDate;
    private Double total;
    private String paymentMethod;
    private Integer totalPoints;
    private String cashier;
    @ManyToOne
    @JoinColumn(name = "customer_name", nullable = false)
    private Customer customerName;
}
