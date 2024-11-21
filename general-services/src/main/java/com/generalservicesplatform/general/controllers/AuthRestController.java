package com.generalservicesplatform.general.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.generalservicesplatform.general.configs.JwtUtil;
import com.generalservicesplatform.general.dto.UserDto;
import com.generalservicesplatform.general.exceptions.AuthenticationException; // Importa la clase de excepción
import com.generalservicesplatform.general.model.User;
import com.generalservicesplatform.general.repository.UserRepository;
import com.generalservicesplatform.general.service.impl.RoleServiceImpl; // Importa la clase de servicio
import com.generalservicesplatform.general.service.impl.UserServiceImpl;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthRestController {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RoleServiceImpl roleService;

    @Autowired
    private UserRepository userRepository;

    /**
     * Inicia sesión de un usuario.
     *
     * @param loginDto Objeto que contiene las credenciales de inicio de sesión.
     * @return Respuesta con el estado de la operación.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDto loginDto) {
        String username = loginDto.getUsername();
        String password = loginDto.getPassword();
        String userId = String.valueOf(loginDto.getId()); // Obtiene el userId del usuario
        Optional<User> user = userRepository.findByUsername(username);

        var authenticatedUser = userService.authenticateUser(username, password);

        if (authenticatedUser.isPresent()) {
            String roles = String.join(",",
                    roleService.getUserPermissions(user.get()).stream().map(p -> p.getName()).toList());
            String token = jwtUtil.generateToken(username, roles); // Sustituye "user_roles" por los roles del usuario
            // Obtener el timestamp actual
            long timestamp = System.currentTimeMillis();

            // Devolver el token, mensaje de éxito y el timestamp
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Autenticado");
            response.put("token", token);
            response.put("roles", roles);
            response.put("timestamp", timestamp);

            return ResponseEntity.ok(response);
        }

        throw new AuthenticationException("Credenciales inválidas.");
    }

    /**
     * Cierra sesión del usuario.
     *
     * @param request  Objeto HttpServletRequest.
     * @param response Objeto HttpServletResponse.
     * @return Mensaje de éxito al cerrar sesión.
     */
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return ResponseEntity.ok("Logout exitoso."); // Mensaje de éxito al cerrar sesión
    }

}
