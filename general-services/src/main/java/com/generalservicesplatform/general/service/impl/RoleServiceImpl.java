package com.generalservicesplatform.general.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.generalservicesplatform.general.model.Permission;
import com.generalservicesplatform.general.model.Role;
import com.generalservicesplatform.general.model.User;
import com.generalservicesplatform.general.repository.PermissionRepository;
import com.generalservicesplatform.general.repository.RoleRepository;
import com.generalservicesplatform.general.service.interfaces.RoleService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Autowired
    private PermissionRepository permissionRepository;

    public List<Role> findAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Optional<Role> findRoleById(Integer id) {
        return roleRepository.findById(id);
    }

    public Role saveRole(Role role) {
        if (role == null) {
            throw new IllegalArgumentException("Role cannot be null");
        }
        return roleRepository.save(role);
    }

    public void deleteRoleById(Integer id) {
        roleRepository.deleteById(id);
    }

    @Override
    public List<Permission> getUserPermissions(User user) {
        return permissionRepository.findByUser(user.getId());
    }

    public Optional<Role> updateRole(Integer id, Role updatedRole) {
        // Busca el rol existente por ID
        Role existingRole = roleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Rol no encontrado con ID: " + id));

        // Actualiza los campos necesarios del rol
        existingRole.setName(updatedRole.getName());
        existingRole.setDescription(updatedRole.getDescription());

        // Actualiza los permisos del rol
        existingRole.setPermissions(updatedRole.getPermissions());

        // Guarda el rol actualizado en el repositorio
        Role savedRole = roleRepository.save(existingRole);

        // Retorna el rol actualizado envuelto en un Optional
        return Optional.of(savedRole);
    }

    public List<Role> findRolesByIds(List<Long> ids) {
        return roleRepository.findByIdIn(ids);
    }

}
