package com.generalservicesplatform.general.service.interfaces;

import com.generalservicesplatform.general.model.Role;

import java.util.List;
import java.util.Optional;

import org.springframework.security.access.prepost.PreAuthorize;

import com.generalservicesplatform.general.model.User;
import com.generalservicesplatform.general.model.UserRole;

public interface UserService {

    @PreAuthorize("hasAuthority('READ-USER')")
    List<User> findAllUsers();

    @PreAuthorize("hasAnyAuthority('READ-USER', 'ALL-CLIENT', 'ALL-COMPANY')")
    Optional<User> findUserById(Integer id);

    @PreAuthorize("hasAuthority('WRITE-USER')")
    Optional<User> saveUser(User user);

    @PreAuthorize("hasAuthority('DELETE-USER')")
    Optional<User> deleteUserById(Integer id);

    Optional<User> findByUsername(String username);

    @PreAuthorize("hasAuthority('EDIT-USER')")
    Optional<User> updateUser(User user);

    List<Role> getRolesByUserId(User user);

    Optional<User> authenticateUser(String username, String password);

    Optional<User> findByEmail(String email);
}