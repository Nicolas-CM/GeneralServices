package com.generalservicesplatform.general.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.generalservicesplatform.general.model.Permission;

/**
 * PermissionRepository
 */
@Repository
public interface PermissionRepository extends JpaRepository<Permission, Integer> {

        // Método para encontrar permisos por nombre
        Optional<Permission> findByName(String name);

        // Método para encontrar permisos por recurso
        List<Permission> findByResource(String resource);

        // Método para encontrar permisos por rol
        @Query("SELECT p FROM Permission p JOIN p.roles r WHERE r.id = ?1")
        List<Permission> findByRoleId(Integer roleId);

        @Query(value = "SELECT p.* FROM permission p " +
                        "JOIN role_permission rp ON p.id = rp.permission_id " +
                        "JOIN user_role ur ON rp.role_id = ur.role_id " +
                        "WHERE ur.user_id = ?1", nativeQuery = true)
        List<Permission> findByUser(int userId);

}
