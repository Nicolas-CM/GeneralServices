package com.generalservicesplatform.general.model;

import java.io.Serializable;
import java.time.LocalDate;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "billings")
@Data // Genera getters, setters, toString, equals, y hashCode
@NoArgsConstructor // Genera un constructor sin argumentos
@AllArgsConstructor // Genera un constructor con todos los argumentos
public class Billing implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "request_id")
    private Request request;

    @ManyToOne
    @JoinColumn(name = "contractor_id")
    private Contractor contractor; // Billing is associated with a contractor

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // Billing is associated with a user

    private Double amount;
    private LocalDate paymentDate;

    private String paymentMethod; // Cash, Credit Card, Debit Card, PayPal

    @Override
    public int hashCode() {
        return Objects.hash(id); // Solo usamos el id para el hash
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof Billing))
            return false;
        Billing billing = (Billing) o;
        return Objects.equals(id, billing.id); // Comparar solo por id
    }

}
