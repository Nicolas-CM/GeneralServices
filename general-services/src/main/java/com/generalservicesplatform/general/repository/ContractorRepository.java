package com.generalservicesplatform.general.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.generalservicesplatform.general.model.Contractor;

import java.util.List;
import java.util.Optional;

/**
 * ContractorRepository
 */
@Repository
public interface ContractorRepository extends JpaRepository<Contractor, Long> {

    // Método para encontrar contratistas por nombre
    Optional<Contractor> findByName(String name);

    // Método para encontrar contratistas por empresa
    List<Contractor> findByCompanyId(Long companyId);

    // Método para encontrar contratistas por id de solicitud
    List<Contractor> findByRequestsId(Long requestId);

    // Método para encontrar contratistas por id de facturación
    List<Contractor> findByBillingsId(Long billingId);

    List<Contractor> findByIdIn(List<Long> ids);

}
