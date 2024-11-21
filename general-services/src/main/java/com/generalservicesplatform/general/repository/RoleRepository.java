package com.generalservicesplatform.general.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.generalservicesplatform.general.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

    // Encuentra un rol por su nombre, envuelve el resultado en Optional
    Optional<Role> findByName(String name);

    // Encuentra todos los roles que tengan una descripción específica
    List<Role> findByDescription(String description);

    // Encuentra todos los roles por un identificador de permiso
    List<Role> findByPermissionsId(Integer permissionId);

    // Encuentra todos los roles por un identificador de usuario
    List<Role> findByUsersUserId(Integer userId);

    // Guarda un rol en la base de datos
    Role save(Role role);

    List<Role> findByIdIn(List<Long> ids);

}
