package com.generalservicesplatform.general.controllers;

import com.generalservicesplatform.general.model.User;
import com.generalservicesplatform.general.service.impl.UserServiceImpl;
import com.generalservicesplatform.general.dto.UserResponseDto;
import com.generalservicesplatform.general.dto.UserRequestDto;
import com.generalservicesplatform.general.dto.UserCompanyRequestDto;
import com.generalservicesplatform.general.dto.CompanyDto;
import com.generalservicesplatform.general.model.Company;
import com.generalservicesplatform.general.mapper.CompanyMapper;
import com.generalservicesplatform.general.service.impl.CompanyServiceImpl;
import com.generalservicesplatform.general.mapper.UserResponseMapper;
import com.generalservicesplatform.general.mapper.UserRequestMapper;
import com.generalservicesplatform.general.mapper.UserMapper;
import com.generalservicesplatform.general.exceptions.UserNotFoundException;
import com.generalservicesplatform.general.exceptions.BadRequestException;
import com.generalservicesplatform.general.exceptions.ConflictException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserRestController {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private UserResponseMapper userResponseMapper; // Para enviar los usuarios al frontend

    @Autowired
    private UserRequestMapper userRequestMapper; // Para recibir los usuarios del frontend

    @Autowired
    private CompanyMapper companyMapper;

    @Autowired
    private CompanyServiceImpl companyService;

    // Obtener todos los usuarios
    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        List<User> users = userService.findAllUsers();
        return ResponseEntity.ok(userResponseMapper.toDto(users));
    }

    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody UserRequestDto userRequestDto) {
        // Validaciones de entrada
        if (userRequestDto.getUsername() == null || userRequestDto.getUsername().isEmpty()) {
            throw new BadRequestException("El nombre del usuario no puede estar vacío.");
        }

        if (userService.findByUsername(userRequestDto.getUsername()).isPresent()) {
            throw new ConflictException("El nombre de usuario ya está en uso.");
        }

        if (userService.findByEmail(userRequestDto.getEmail()).isPresent()) {
            throw new ConflictException("El correo electrónico ya está en uso.");
        }

        User user = userRequestMapper.toEntity(userRequestDto);
        Optional<User> savedUser = userService.registerUser(user);
        userService.assignRoleToUser(savedUser.get(), userRequestDto.getRoleId());
        return ResponseEntity.status(HttpStatus.CREATED).body("Creado");
    }

    @PostMapping("/register-company")
    public ResponseEntity<String> registerUserWithoutAuthCompany(
            @RequestBody UserCompanyRequestDto userCompanyRequestDto) {
        UserRequestDto userRequestDto = userCompanyRequestDto.getUser();
        CompanyDto companyDto = userCompanyRequestDto.getCompany();

        System.out.println("User: " + userRequestDto);

        // Validaciones de entrada para el usuario
        if (userRequestDto.getUsername() == null || userRequestDto.getUsername().isEmpty()) {
            throw new BadRequestException("El nombre del usuario no puede estar vacío.");
        }
        if (userService.findByUsername(userRequestDto.getUsername()).isPresent()) {
            throw new ConflictException("El nombre de usuario ya está en uso.");
        }
        if (userService.findByEmail(userRequestDto.getEmail()).isPresent()) {
            throw new ConflictException("El correo electrónico ya está en uso.");
        }

        // Convertir el DTO a la entidad User
        User user = userRequestMapper.toEntity(userRequestDto);
        Optional<User> savedUser = userService.registerUser(user);
        userService.assignRoleToUser(savedUser.get(), userRequestDto.getRoleId());

        // Convertir el DTO a la entidad Company y asociarla al usuario
        Company company = companyMapper.toEntity(companyDto);
        company.setUser(savedUser.get());
        companyService.saveCompany(company);

        return ResponseEntity.status(HttpStatus.CREATED).body("Creado");
    }

    @PostMapping("/register-client")
    public ResponseEntity<String> registerUserWithoutAuthClient(@RequestBody UserRequestDto userRequestDto) {
        // Validaciones de entrada
        if (userRequestDto.getUsername() == null || userRequestDto.getUsername().isEmpty()) {
            throw new BadRequestException("El nombre del usuario no puede estar vacío.");
        }
        if (userService.findByUsername(userRequestDto.getUsername()).isPresent()) {
            throw new ConflictException("El nombre de usuario ya está en uso.");
        }
        if (userService.findByEmail(userRequestDto.getEmail()).isPresent()) {
            throw new ConflictException("El correo electrónico ya está en uso.");
        }

        User user = userRequestMapper.toEntity(userRequestDto);
        Optional<User> savedUser = userService.registerUser(user);
        userService.assignRoleToUser(savedUser.get(), userRequestDto.getRoleId());
        return ResponseEntity.status(HttpStatus.CREATED).body("Creado");
    }

    // Obtener un usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable Integer id) {
        return userService.findUserById(id)
                .map(user -> ResponseEntity.ok(userResponseMapper.toDto(user)))
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado con ID: " + id));
    }

    // Actualizar un usuario
    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDto> updateUser(@PathVariable int id,
            @RequestBody UserRequestDto userRequestDto) {
        // Validaciones de entrada
        if (userRequestDto.getUsername() == null || userRequestDto.getUsername().isEmpty()) {
            throw new BadRequestException("El nombre del usuario no puede estar vacío.");
        }

        if (userService.findUserById(id).isEmpty()) {
            throw new UserNotFoundException("Usuario no encontrado para actualizar con ID: " + id);
        }
        // Convertir el DTO a la entidad User
        User user = userRequestMapper.toEntity(userRequestDto);
        user.setId(id); // Establecer el ID del usuario

        // Actualizar el usuario
        User updatedUser = userService.updateUserById(id, user)
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado para actualizar con ID: " + id));

        // Actualizar el rol del usuario
        userService.updateUserRole(updatedUser, userRequestDto.getRoleId());

        // Guardar el usuario actualizado
        userService.saveUser(updatedUser);

        return ResponseEntity.ok(userResponseMapper.toDto(updatedUser));
    }

    // Eliminar un usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Integer id) {
        Optional<User> BorradoUserOptional = userService.deleteUserById(id);
        return BorradoUserOptional.map(user -> ResponseEntity.ok("Borrado")) // Devuelve 200 OK
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado para eliminar con ID: " + id));
    }

    // Obtener el userId basado en el username
    @GetMapping("/username/{username}")
    public ResponseEntity<Integer> getUserIdByUsername(@PathVariable String username) {
        return userService.findByUsername(username)
                .map(user -> ResponseEntity.ok(user.getId()))
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado con username: " + username));
    }

    // Obtener usuarios por una lista de IDs
    @PostMapping("/by-ids")
    public ResponseEntity<List<UserResponseDto>> getUsersByIds(@RequestBody List<Integer> ids) {
        List<User> users = userService.findUsersByIds(ids);
        return ResponseEntity.ok(userResponseMapper.toDto(users));
    }
}
