package com.generalservicesplatform.general.service.impl;

import java.util.Optional;
import java.util.List;

import com.generalservicesplatform.general.model.Role;
import com.generalservicesplatform.general.model.User;
import com.generalservicesplatform.general.model.UserRole;
import com.generalservicesplatform.general.model.UserRolePK;
import com.generalservicesplatform.general.repository.RoleRepository;
import com.generalservicesplatform.general.repository.UserRepository;
import com.generalservicesplatform.general.repository.UserRoleRepository;
import com.generalservicesplatform.general.service.interfaces.RoleService;
import com.generalservicesplatform.general.service.interfaces.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.annotation.PostConstruct;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    private RoleService roleService;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @PostConstruct
    public void init() {

    }

    @Override
    public List<Role> getRolesByUserId(User user) {
        return roleRepository.findByUsersUserId(user.getId());
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findUserById(Integer id) {
        return userRepository.findById(id);
    }

    public Optional<User> saveUser(User user) {
        if (user == null) {
            throw new IllegalArgumentException("El usuario no puede ser nulo");
        }

        return Optional.of(userRepository.save(user));
    }

    public Optional<User> registerUser(User user) {
        if (user == null) {
            throw new IllegalArgumentException("El usuario no puede ser nulo");
        }

        user.setStatus(true); // Activar el usuario por defecto
        // Codificar la contraseña antes de guardarla
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return Optional.of(userRepository.save(user));
    }

    public Optional<User> deleteUserById(Integer id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            User existingUser = user.get();
            existingUser.setStatus(false);
            userRepository.save(existingUser); // Guarda el cambio en la base de datos
            return Optional.of(existingUser);
        } else {
            return Optional.empty();
        }
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> updateUser(User user) {
        // Buscar el usuario por su ID
        return userRepository.findById(user.getId()).map(userToUpdate -> {
            // Actualizar los campos del usuario
            userToUpdate.setUsername(user.getUsername());
            userToUpdate.setEmail(user.getEmail());
            userToUpdate.setName(user.getName());
            userToUpdate.setLastName(user.getLastName());

            // Guardar los cambios en la base de datos y devolver el usuario actualizado
            return userRepository.save(userToUpdate);
        });
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> updateUserById(Integer id, User newUser) {

        User user = userRepository.findById(id).get();

        if (newUser.getUsername() != null && !newUser.getUsername().isEmpty()) {
            user.setUsername(newUser.getUsername());
        }
        if (newUser.getEmail() != null && !newUser.getEmail().isEmpty()) {
            user.setEmail(newUser.getEmail());
        }
        if (newUser.getName() != null && !newUser.getName().isEmpty()) {
            user.setName(newUser.getName());
        }
        if (newUser.getLastName() != null && !newUser.getLastName().isEmpty()) {
            user.setLastName(newUser.getLastName());
        }
        if (newUser.getPhone() != null && !newUser.getPhone().isEmpty()) {
            user.setPhone(newUser.getPhone());
        }
        if (newUser.getAddress() != null && !newUser.getAddress().isEmpty()) {
            user.setAddress(newUser.getAddress());
        }
        if (newUser.getCity() != null && !newUser.getCity().isEmpty()) {
            user.setCity(newUser.getCity());
        }
        if (newUser.getState() != null && !newUser.getState().isEmpty()) {
            user.setState(newUser.getState());
        }
        if (newUser.getCountry() != null && !newUser.getCountry().isEmpty()) {
            user.setCountry(newUser.getCountry());
        }
        if (newUser.getZipCode() != null && !newUser.getZipCode().isEmpty()) {
            user.setZipCode(newUser.getZipCode());
        }
        if (newUser.getPassword() != null && !newUser.getPassword().isEmpty()) {
            updatePasswordById(id, newUser.getPassword());
        }

        return Optional.of(userRepository.save(user));

    }

    public Optional<User> updatePasswordById(Integer id, String newPassword) {
        return userRepository.findById(id).map(user -> {
            user.setPassword(passwordEncoder.encode(newPassword));
            System.out.println("Contraseña actualizada por: " + newPassword + " verificada "
                    + passwordEncoder.matches(newPassword, user.getPassword()));
            System.out.println(user.getPassword());

            return userRepository.save(user);
        });
    }

    @Transactional
    public void updateUserRole(User user, Integer roleId) {
        // Asignar el nuevo rol al usuario
        assignRoleToUser(user, roleId);
    }

    @Override
    public Optional<User> authenticateUser(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword()) && user.get().getStatus()) {
            return user;
        }
        return Optional.empty();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);
        if (!user.isPresent()) {
            throw new UsernameNotFoundException("Usuario no encontrado, verifique sus credenciales.");
        } else {
            List<String> permissions = roleService.getUserPermissions(user.get()).stream().map(p -> p.getName())
                    .toList();

            UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
                    .username(user.get().getUsername())
                    .password(user.get().getPassword()) // Ya debe estar codificada
                    .authorities(permissions.toArray(new String[0]))
                    .build();
            return userDetails;
        }
    }

    @Transactional
    public void assignRoleToUser(User user, Integer roleId) {

        System.out.println("\n\n\n\n Entró al asignar role \n\n\n\n");
        // Asegúrate de que el usuario esté guardado antes
        if (user.getId() == null) {
            user = userRepository.save(user);
        }

        // Verifica si el rol ya está asignado al usuario
        boolean roleExists = user.getRoles().stream()
                .anyMatch(userRole -> userRole.getRole().getId().equals(roleId));

        if (roleExists) {
            System.out.println("El rol ya está asignado al usuario.");
            return; // No hacer nada si ya tiene el rol
        }

        Optional<Role> role = roleRepository.findById(roleId);
        if (role.isPresent()) {
            System.out.println("Role encontrado");

            // Crear UserRole y asignar la clave compuesta
            UserRole userRole = new UserRole();
            UserRolePK userRolePK = new UserRolePK(user.getId(), role.get().getId());
            userRole.setUserRolePK(userRolePK);
            userRole.setUser(user);
            userRole.setRole(role.get());

            // Guarda el nuevo UserRole en la base de datos
            userRoleRepository.save(userRole);

            // Actualizar la lista de roles del usuario
            user.getRoles().add(userRole);
        } else {
            throw new IllegalArgumentException("Role no encontrado.");
        }
    }

    @Transactional
    public void removeRoleFromUser(Integer userId, Integer roleId) {
        // Crear la clave compuesta
        UserRolePK userRolePK = new UserRolePK(userId, roleId);

        // Eliminar la relación de rol de usuario
        userRoleRepository.deleteById(userRolePK);

        System.err.println("Rol eliminado");

        // Opcionalmente, puedes eliminar el rol de la lista de roles del usuario
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.getRoles().removeIf(userRole -> userRole.getRole().getId().equals(roleId));
            userRepository.save(user); // Guarda los cambios
        } else {
            throw new IllegalArgumentException("Usuario no encontrado");
        }
    }

    public List<User> findUsersByIds(List<Integer> ids) {
        return userRepository.findByIdIn(ids);
    }
}
