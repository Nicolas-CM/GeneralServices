package com.generalservicesplatform.general.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.generalservicesplatform.general.model.Billing;

import java.util.List;
import java.util.Optional;

/**
 * BillingRepository
 */
@Repository
public interface BillingRepository extends JpaRepository<Billing, Long> {

    // Método para encontrar facturaciones por request_id
    Optional<Billing> findByRequestId(Long requestId);

    // Método para encontrar facturaciones por contractor_id
    List<Billing> findByContractorId(Long contractorId);

    // Método para encontrar facturaciones por monto
    List<Billing> findByAmount(Double amount);

    // Método para encontrar facturaciones por una lista de IDs
    List<Billing> findByIdIn(List<Long> ids);

    @Query("SELECT b FROM Billing b WHERE b.user.id = :userId")
    List<Billing> findByUserId(@Param("userId") Long userId);

}
