package com.generalservicesplatform.general.service.interfaces;

import com.generalservicesplatform.general.model.Permission;
import java.util.List;
import java.util.Optional;

import org.springframework.security.access.prepost.PreAuthorize;

public interface PermissionService {

    @PreAuthorize("hasAuthority('READ-PERMISSION')")
    List<com.generalservicesplatform.general.model.Permission> findAllPermissions();

    @PreAuthorize("hasAuthority('READ-PERMISSION')")
    Optional<Permission> findPermissionById(Integer id);

    @PreAuthorize("hasAuthority('WRITE-PERMISSION')")
    Permission savePermission(Permission permission);

    @PreAuthorize("hasAuthority('DELETE-PERMISSION')")
    void deletePermissionById(Integer id);
}