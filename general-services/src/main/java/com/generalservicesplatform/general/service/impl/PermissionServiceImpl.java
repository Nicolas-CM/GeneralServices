package com.generalservicesplatform.general.service.impl;

import com.generalservicesplatform.general.model.Permission;
import com.generalservicesplatform.general.repository.PermissionRepository;
import com.generalservicesplatform.general.service.interfaces.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

import java.util.List;
import java.util.Optional;

@Service
public class PermissionServiceImpl implements PermissionService {

    private final PermissionRepository permissionRepository;

    @Autowired
    public PermissionServiceImpl(PermissionRepository permissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    public List<Permission> findAllPermissions() {
        return permissionRepository.findAll();
    }

    public Optional<Permission> findPermissionById(Integer id) {
        return permissionRepository.findById(id);
    }

    public Permission savePermission(Permission permission) {
        if (permission == null) {
            throw new IllegalArgumentException("Permission cannot be null");
        }
        return permissionRepository.save(permission);
    }

    public void deletePermissionById(Integer id) {
        permissionRepository.deleteById(id);
    }

    public List<Permission> findPermissionsByIds(List<Integer> ids) {
        List<Permission> permissions = new ArrayList<>();
        for (Integer id : ids) {
            permissionRepository.findById(id).ifPresent(permissions::add);
        }
        return permissions;
    }

    public Optional<Permission> updatePermission(Integer id, Permission updatedPermission) {
        return permissionRepository.findById(id)
                .map(existingPermission -> {
                    // Actualiza todos los campos necesarios
                    existingPermission.setName(updatedPermission.getName());
                    existingPermission.setResource(updatedPermission.getResource());

                    return permissionRepository.save(existingPermission);
                });
    }

}
