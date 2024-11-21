package com.generalservicesplatform.general.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.generalservicesplatform.general.model.ServiceModel;

/**
 * ServiceRepository
 */
@Repository
public interface ServiceRepository extends JpaRepository<ServiceModel, Long> {

    // Método para encontrar servicios por nombre
    Optional<ServiceModel> findByName(String name);

    // Método para encontrar servicios por descripción
    List<ServiceModel> findByDescription(String description);

    // Método para encontrar servicios por id de categoría
    List<ServiceModel> findByCategoryId(Long categoryId);

    @Query(value = "SELECT s.* FROM services s " +
            "JOIN company_service cs ON s.id = cs.service_id " +
            "WHERE cs.company_id = ?1", nativeQuery = true)
    List<ServiceModel> findByCompanyId(Long companyId);

    // Método para encontrar servicios por id de solicitud
    List<ServiceModel> findByRequestsId(Long requestId);

    // Método para encontrar servicios por una lista de IDs
    List<ServiceModel> findByIdIn(List<Long> ids);

}
