package com.generalservicesplatform.general.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.generalservicesplatform.general.model.Role;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.generalservicesplatform.general.model.User;
import com.generalservicesplatform.general.service.impl.RoleServiceImpl;
import com.generalservicesplatform.general.service.impl.UserServiceImpl;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private RoleServiceImpl roleService;

    @GetMapping("/login")
    public String loginUser(User user, Model model) {
        return "login";
    }

    @GetMapping("/home")
    public String home() {
        return "home"; // Asegúrate de que tienes una plantilla llamada home.html en
                       // src/main/resources/templates
    }

    @GetMapping("/create-user")
    public String createTemplate(User user, Model model) {
        List<Role> roles = roleService.findAllRoles(); // Obtener todos los roles
        model.addAttribute("roles", roles);
        return "User/create-user";
    }

    @PostMapping("/create")
    public String createUser(@ModelAttribute User user, @RequestParam Integer roleId, Model model) {

        userService.assignRoleToUser(user, roleId);
        userService.saveUser(user);
        return "redirect:/";
    }

    @GetMapping
    public String home(Model model) {

        List<User> users = userService.findAllUsers();

        List<User> usersPrint = new ArrayList<>();

        for (User user : users) {
            if (Boolean.TRUE.equals(user.getStatus())) {
                usersPrint.add(user);
            }
        }

        model.addAttribute("users", usersPrint);
        return "User/list-users";

    }

    @GetMapping("/edit/{id}")
    public String editUser(Model model, @PathVariable Integer id) {
        List<Role> roles = roleService.findAllRoles(); // Obtener todos los roles
        model.addAttribute("roles", roles);
        Optional<User> userEdit = userService.findUserById(id);
        model.addAttribute("user", userEdit.get());
        return "User/edit-user";
    }

    @PostMapping("/edit")
    public String editUser(@ModelAttribute User user, Model model, @RequestParam Integer roleId) {
        // Actualiza los datos del usuario
        userService.updateUser(user);

        // Actualiza el rol del usuario
        userService.updateUserRole(user, roleId);
        userService.saveUser(user);

        return "redirect:/";
    }

    @GetMapping("/delete/{id}")
    public String getMethodName(@PathVariable Integer id) {
        userService.deleteUserById(id);
        return "redirect:/";
    }

    @PostMapping("/remove-role")
    public String removeRole(@RequestParam Integer userId, @RequestParam Integer roleId) {
        System.out.println("eliminar rol");
        userService.removeRoleFromUser(userId, roleId);
        return "redirect:/edit/" + userId; // Redirige a la página de edición del usuario
    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return "redirect:/login?logout"; // Redirige al formulario de inicio de sesión con un parámetro de logout
    }

    @GetMapping("/auth/error-403")
    public String error403(Model model) {
        model.addAttribute("errorMessage", "No tienes permisos para acceder a esta página.");
        return "error-403";
    }

}
