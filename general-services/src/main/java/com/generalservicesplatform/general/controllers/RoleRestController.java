package com.generalservicesplatform.general.controllers;

import com.generalservicesplatform.general.dto.RoleDto;
import com.generalservicesplatform.general.mapper.RoleMapper;
import com.generalservicesplatform.general.model.Role;
import com.generalservicesplatform.general.model.Permission;
import com.generalservicesplatform.general.service.impl.RoleServiceImpl;
import com.generalservicesplatform.general.service.impl.PermissionServiceImpl;
import com.generalservicesplatform.general.exceptions.RoleNotFoundException;
import com.generalservicesplatform.general.exceptions.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/roles")
public class RoleRestController {

    @Autowired
    private RoleServiceImpl roleService;

    @Autowired
    private PermissionServiceImpl permissionService;

    @Autowired
    private RoleMapper roleMapper;

    // Obtener todos los roles
    @GetMapping
    public ResponseEntity<List<RoleDto>> getAllRoles() {
        List<Role> roles = roleService.findAllRoles();
        return ResponseEntity.ok(roleMapper.toDto(roles));
    }

    // Crear un nuevo rol
    @PostMapping
    public ResponseEntity<RoleDto> createRole(@RequestBody RoleDto roleDto) {
        // Validaciones de entrada
        if (roleDto.getName() == null || roleDto.getName().isEmpty()) {
            throw new BadRequestException("El nombre del rol no puede estar vacío.");
        }

        // Convertir RoleDto a Role y asignar permisos seleccionados
        Role role = roleMapper.toEntity(roleDto);

        // Obtener los permisos por IDs
        List<Integer> selectedPermissionsIds = roleDto.getSelectedPermissions();
        List<Permission> permissions = permissionService.findPermissionsByIds(selectedPermissionsIds);
        role.setPermissions(permissions);

        // Guardar el rol y retornar el rol creado
        Role savedRole = roleService.saveRole(role);
        return ResponseEntity.status(HttpStatus.CREATED).body(roleMapper.toDto(savedRole));
    }

    // Obtener un rol por ID
    @GetMapping("/{id}")
    public ResponseEntity<RoleDto> getRoleById(@PathVariable Integer id) {
        return roleService.findRoleById(id)
                .map(role -> ResponseEntity.ok(roleMapper.toDto(role)))
                .orElseThrow(() -> new RoleNotFoundException("Rol no encontrado con ID: " + id));
    }

    // Actualizar un rol
    @PutMapping("/{id}")
    public ResponseEntity<RoleDto> updateRole(@PathVariable Integer id, @RequestBody RoleDto roleDto) {
        if (roleDto.getName() == null || roleDto.getName().isEmpty()) {
            throw new BadRequestException("El nombre del rol no puede estar vacío.");
        }

        Role role = roleMapper.toEntity(roleDto);
        List<Integer> selectedPermissionsIds = roleDto.getSelectedPermissions();
        List<Permission> permissions = permissionService.findPermissionsByIds(selectedPermissionsIds);
        role.setPermissions(permissions);

        return roleService.updateRole(id, role)
                .map(updatedRole -> ResponseEntity.ok(roleMapper.toDto(updatedRole)))
                .orElseThrow(() -> new RoleNotFoundException("Rol no encontrado para actualizar con ID: " + id));
    }

    // Eliminar un rol
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRole(@PathVariable Integer id) {
        Optional<Role> BorradoRoleOptional = roleService.findRoleById(id);
        return BorradoRoleOptional.map(role -> {
            roleService.deleteRoleById(id);
            return ResponseEntity.ok("Borrado");
        }).orElseThrow(() -> new RoleNotFoundException("Rol no encontrado para eliminar con ID: " + id));
    }

    // Obtener roles por una lista de IDs
    @PostMapping("/by-ids")
    public ResponseEntity<List<RoleDto>> getRolesByIds(@RequestBody List<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }

        List<Role> roles = roleService.findRolesByIds(ids);
        return ResponseEntity.ok(roleMapper.toDto(roles));
    }

}
