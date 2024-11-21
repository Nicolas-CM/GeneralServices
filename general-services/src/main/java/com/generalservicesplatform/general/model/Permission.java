package com.generalservicesplatform.general.model;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.PreRemove;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "permission")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Permission implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String resource;

    @ManyToMany(mappedBy = "permissions")
    private List<Role> roles;

    // Método que elimina la relación entre Permission y Role antes de eliminar
    // Permission
    @PreRemove
    private void removeRolesFromPermissions() {
        this.roles.forEach(role -> role.getPermissions().remove(this));
    }

}
