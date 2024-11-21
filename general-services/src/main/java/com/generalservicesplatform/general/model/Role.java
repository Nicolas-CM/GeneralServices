package com.generalservicesplatform.general.model;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PreRemove;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "role")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Role implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String description;

    @ManyToMany
    @JoinTable(name = "role_permission", // Nombre de la tabla intermedia
            joinColumns = @JoinColumn(name = "role_id"), // Llave foránea hacia Role
            inverseJoinColumns = @JoinColumn(name = "permission_id") // Llave foránea hacia Permission
    )
    private List<Permission> permissions;

    @Transient // Esto indica que no se debe persistir en la base de datos
    private List<Integer> selectedPermissions; 

    @OneToMany(mappedBy = "role", cascade = CascadeType.REMOVE)
    private List<UserRole> users;
    
    @PreRemove
    private void removePermissionsFromRoles() {
        this.permissions.forEach(permission -> permission.getRoles().remove(this));
    }
}
