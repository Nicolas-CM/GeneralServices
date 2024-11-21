package com.generalservicesplatform.general.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.generalservicesplatform.general.model.Company;
import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

    // Buscar una compañía por su nombre
    Optional<Company> findByName(String name);

    // Buscar una compañía por su correo electrónico
    Optional<Company> findByEmail(String email);

    // Buscar una compañía por su código postal
    List<Company> findByZipCode(String zipCode);

    // Buscar compañías en una ciudad específica
    List<Company> findByCity(String city);

    // Buscar compañías en un estado específico
    List<Company> findByState(String state);

    // Buscar compañías en un país específico
    List<Company> findByCountry(String country);

    // Buscar compañías por ciudad y estado
    List<Company> findByCityAndState(String city, String state);

    // Buscar una compañía por userId
    Optional<Company> findByUserId(Integer userId);

    // Buscar compañías por país y código postal
    List<Company> findByCountryAndZipCode(String country, String zipCode);

    @Query("SELECT c FROM Company c JOIN c.services s WHERE s.id = :serviceId")
    List<Company> findCompaniesByServiceId(@Param("serviceId") Long serviceId);

    List<Company> findByIdIn(List<Long> ids);

}
