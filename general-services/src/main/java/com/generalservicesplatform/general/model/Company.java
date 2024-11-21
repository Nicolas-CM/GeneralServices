package com.generalservicesplatform.general.model;

import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "companies")
@Data // Genera getters, setters, toString, equals, y hashCode
@NoArgsConstructor // Genera un constructor sin argumentos
@AllArgsConstructor // Genera un constructor con todos los argumentos
public class Company implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private String phone;

    private String address;

    private String city;

    private String state;

    private String country;

    private String zipCode;

    private String email;

    @ManyToMany(mappedBy = "companies")
    @JsonBackReference // Educando a Nicolas
    private Set<ServiceModel> services; // A company provides multiple services

    @OneToMany(mappedBy = "company")
    private Set<Rating> ratings;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id") // Define la clave foránea
    private User user;

    @OneToMany(mappedBy = "company")
    private Set<Request> requests; // A company can have multiple requests

    @Override
    public int hashCode() {
        return Objects.hash(id); // Solo usamos el id para el hash
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof Company))
            return false;
        Company company = (Company) o;
        return Objects.equals(id, company.id); // Comparar solo por id
    }

}
