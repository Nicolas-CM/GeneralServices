package com.generalservicesplatform.general.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.generalservicesplatform.general.model.User;
import com.generalservicesplatform.general.model.UserRole;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    // Encuentra un usuario por su nombre de usuario, envuelve el resultado en
    // Optional
    Optional<User> findByUsername(String username);

    // Encuentra un usuario por su correo electrónico, envuelve el resultado en
    // Optional
    Optional<User> findByEmail(String email);

    // Encuentra un usuario por su nombre
    List<User> findByName(String name);

    // Encuentra un usuario por su apellido
    List<User> findByLastName(String lastName);

    // Encuentra un usuario por su número de teléfono
    Optional<User> findByPhone(String phone);

    // Encuentra un usuario por su dirección
    List<User> findByAddress(String address);

    // Encuentra un usuario por su ciudad
    List<User> findByCity(String city);

    // Encuentra un usuario por su estado
    List<User> findByState(String state);

    // Encuentra un usuario por su país
    List<User> findByCountry(String country);

    // Encuentra un usuario por su código postal
    List<User> findByZipCode(String zipCode);

    // Encuentra usuarios por una lista de IDs
    List<User> findByIdIn(List<Integer> ids);

}
