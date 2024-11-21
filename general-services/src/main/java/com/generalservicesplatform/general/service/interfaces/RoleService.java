package com.generalservicesplatform.general.service.interfaces;

import java.util.List;
import java.util.Optional;

import com.generalservicesplatform.general.model.Permission;
import com.generalservicesplatform.general.model.Role;

import org.springframework.security.access.prepost.PreAuthorize;

import com.generalservicesplatform.general.model.User;

public interface RoleService {

    @PreAuthorize("hasAuthority('READ-ROLE')")
    List<Role> findAllRoles();

    @PreAuthorize("hasAuthority('READ-ROLE')")
    Optional<Role> findRoleById(Integer id);

    @PreAuthorize("hasAuthority('WRITE-ROLE')")
    Role saveRole(Role role);

    @PreAuthorize("hasAuthority('DELETE-ROLE')")
    void deleteRoleById(Integer id);

    List<Permission> getUserPermissions(User user);

}