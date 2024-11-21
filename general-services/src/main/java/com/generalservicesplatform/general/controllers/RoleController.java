package com.generalservicesplatform.general.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.generalservicesplatform.general.model.Permission;
import com.generalservicesplatform.general.model.Role;
import com.generalservicesplatform.general.service.impl.PermissionServiceImpl;
import com.generalservicesplatform.general.service.impl.RoleServiceImpl;

@Controller
public class RoleController {

    @Autowired
    private RoleServiceImpl roleService;

    @Autowired
    private PermissionServiceImpl permissionService;
    
    @GetMapping("/create-role")
    public String createRoleTemplate(Model model) {
        model.addAttribute("role", new Role());
    
        // Añadir la lista de permisos disponibles
        List<Permission> permissions = permissionService.findAllPermissions();
        model.addAttribute("permissions", permissions);
    
        // Añadir una lista vacía para los permisos seleccionados
        model.addAttribute("selectedPermissions", new ArrayList<Integer>());
    
        return "Role/create-role";
    }

    // Guardar un nuevo rol
    @PostMapping("/create-role")
    public String createRole(@ModelAttribute Role role, @RequestParam(required = false) List<Integer> selectedPermissions) {
        // Si no hay permisos seleccionados, inicializar a una lista vacía
        if (selectedPermissions == null) {
            selectedPermissions = new ArrayList<>();
        }

        // Asignar los permisos seleccionados al rol
        List<Permission> permissions = permissionService.findPermissionsByIds(selectedPermissions);
        role.setPermissions(permissions);

        roleService.saveRole(role);
        return "redirect:/list-roles";
    }

    // Mostrar todos los roles
    @GetMapping("/list-roles")
    public String listRoles(Model model) {
        List<Role> roles = roleService.findAllRoles();
        model.addAttribute("roles", roles);
        return "Role/list-roles";
    }


    @GetMapping("/edit-role/{id}")
    public String editRole(@PathVariable Integer id, Model model) {
        Optional<Role> roleEdit = roleService.findRoleById(id);
        if (roleEdit.isPresent()) {
            model.addAttribute("role", roleEdit.get());
    
            // Añadir la lista de permisos disponibles
            List<Permission> permissions = permissionService.findAllPermissions();
            model.addAttribute("permissions", permissions);
            
            return "Role/edit-role";
        } else {
            return "redirect:/list-roles";
        }
    }

    @PostMapping("/edit-role")
    public String updateRole(@ModelAttribute Role role, @RequestParam(required = false) List<Integer> selectedPermissions) {
        // Verifica si el rol existe antes de intentar actualizarlo
        Optional<Role> existingRole = roleService.findRoleById(role.getId());
        if (existingRole.isPresent()) {
            // Si no se seleccionaron permisos, inicializar a lista vacía
            if (selectedPermissions == null) {
                selectedPermissions = new ArrayList<>();
            }
            
            // Asignar los permisos seleccionados al rol
            List<Permission> permissions = permissionService.findPermissionsByIds(selectedPermissions);
            role.setPermissions(permissions);
    
            // Actualiza el rol en el servicio
            roleService.updateRole(role.getId(), role);
        }
        return "redirect:/list-roles";
    }

    

    

    // Eliminar un rol por su ID
    @GetMapping("/delete-role/{id}")
    public String deleteRole(@PathVariable Integer id) {
        roleService.deleteRoleById(id);
        return "redirect:/list-roles";
    }
}
