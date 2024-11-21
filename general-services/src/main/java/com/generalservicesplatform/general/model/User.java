package com.generalservicesplatform.general.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "app_user")
@Data // Genera getters, setters, toString, equals, y hashCode
@AllArgsConstructor // Genera un constructor con todos los argumentos
@NoArgsConstructor // Genera un constructor vacío
public class User implements Serializable {

    {
        this.status = true; // Inicializa status en el constructor
        this.roles = new ArrayList<>(); // Inicializa roles en el constructor
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String username;

    private String password;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    private String email;

    private String name;

    private String lastName;

    private String phone;

    private String address;

    private String city;

    private String state;

    private String country;

    private String zipCode;

    @OneToMany(mappedBy = "user")
    private List<UserRole> roles;

    @OneToOne(mappedBy = "user")
    private Company company;

    @OneToMany(mappedBy = "user")
    private List<Billing> billings;

    private Boolean status; // Si es true, el usuario está activo, si es false, el usuario está inactivo

}