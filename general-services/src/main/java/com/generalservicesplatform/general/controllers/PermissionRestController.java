package com.generalservicesplatform.general.controllers;

import com.generalservicesplatform.general.model.Permission;
import com.generalservicesplatform.general.dto.PermissionDto;
import com.generalservicesplatform.general.mapper.PermissionMapper;
import com.generalservicesplatform.general.service.impl.PermissionServiceImpl;
import com.generalservicesplatform.general.exceptions.PermissionNotFoundException;
import com.generalservicesplatform.general.exceptions.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/permissions")
public class PermissionRestController {

    @Autowired
    private PermissionServiceImpl permissionService;

    @Autowired
    private PermissionMapper permissionMapper; // Mapper de MapStruct

    // Obtener todos los permisos
    @GetMapping
    public ResponseEntity<List<PermissionDto>> getAllPermissions() {
        List<Permission> permissions = permissionService.findAllPermissions();
        return ResponseEntity.ok(permissionMapper.toDto(permissions));
    }

    // Crear un nuevo permiso
    @PostMapping
    public ResponseEntity<PermissionDto> createPermission(@RequestBody PermissionDto permissionDto) {
        // Validación simple para el nombre
        if (permissionDto.getName() == null || permissionDto.getName().trim().isEmpty()) {
            throw new BadRequestException("El nombre del permiso es obligatorio.");
        }
        Permission permission = permissionMapper.toEntity(permissionDto);
        Permission savedPermission = permissionService.savePermission(permission);
        return ResponseEntity.status(HttpStatus.CREATED).body(permissionMapper.toDto(savedPermission));
    }

    // Obtener un permiso por ID
    @GetMapping("/{id}")
    public ResponseEntity<PermissionDto> getPermissionById(@PathVariable Integer id) {
        return permissionService.findPermissionById(id)
                .map(permission -> ResponseEntity.ok(permissionMapper.toDto(permission)))
                .orElseThrow(() -> new PermissionNotFoundException("Permiso no encontrado con ID: " + id));
    }

    // Actualizar un permiso
    @PutMapping("/{id}")
    public ResponseEntity<PermissionDto> updatePermission(@PathVariable Integer id,
            @RequestBody PermissionDto permissionDto) {
        // Validación simple para el nombre
        if (permissionDto.getName() == null || permissionDto.getName().trim().isEmpty()) {
            throw new BadRequestException("El nombre del permiso es obligatorio.");
        }
        Permission permission = permissionMapper.toEntity(permissionDto);
        return permissionService.updatePermission(id, permission)
                .map(updatedPermission -> ResponseEntity.ok(permissionMapper.toDto(updatedPermission)))
                .orElseThrow(
                        () -> new PermissionNotFoundException("Permiso no encontrado para actualizar con ID: " + id));
    }

    // Eliminar un permiso
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePermission(@PathVariable Integer id) {
        Optional<Permission> BorradoPermissionOptional = permissionService.findPermissionById(id);
        return BorradoPermissionOptional.map(permission -> {
            permissionService.deletePermissionById(id); // Elimina el permiso
            return ResponseEntity.ok("Borrado"); // Devuelve el permiso eliminado
        }).orElseThrow(() -> new PermissionNotFoundException("Permiso no encontrado para eliminar con ID: " + id));
    }

}
