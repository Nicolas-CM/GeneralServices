package com.generalservicesplatform.general.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.generalservicesplatform.general.model.Permission;
import com.generalservicesplatform.general.service.impl.PermissionServiceImpl;

@Controller
public class PermissionController {

    @Autowired
    private PermissionServiceImpl permissionService;

    // Mostrar formulario de creación de permiso
    @GetMapping("/create-permission")
    public String createPermissionTemplate(Model model) {
        model.addAttribute("permission", new Permission());
        return "Permission/create-permission";
    }

    // Guardar un nuevo permiso
    @PostMapping("/create-permission")
    public String createPermission(@ModelAttribute Permission permission) {
        permissionService.savePermission(permission);
        return "redirect:/list-permission"; // Corrigido para usar redirección correctamente
    }

    // Mostrar todos los permisos
    @GetMapping("/list-permission")
    public String listPermissions(Model model) {
        List<Permission> permissions = permissionService.findAllPermissions();
        model.addAttribute("permissions", permissions);
        return "Permission/list-permission";
    }

    // Mostrar formulario de edición de permiso
    @GetMapping("/edit-permission/{id}")
    public String editPermission(@PathVariable Integer id, Model model) {
        Optional<Permission> permissionEdit = permissionService.findPermissionById(id);
        if (permissionEdit.isPresent()) {
            model.addAttribute("permission", permissionEdit.get());
            return "Permission/edit-permission";
        } else {
            return "redirect:/list-permission";
        }
    }

    // Guardar los cambios en el permiso editado
    @PostMapping("/edit-permission")
    public String updatePermission(@ModelAttribute Permission permission) {
        permissionService.savePermission(permission);
        return "redirect:/list-permission"; // Correcto para redireccionar después de guardar
    }

    // Eliminar un permiso por su ID
    @GetMapping("/delete-permission/{id}")
    public String deletePermission(@PathVariable Integer id) {
        permissionService.deletePermissionById(id);
        return "redirect:/list-permission"; // Correcto para redireccionar después de eliminar
    }

}
