package com.generalservicesplatform.general.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.generalservicesplatform.general.model.Request;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {

    // Buscar todas las solicitudes por el estado
    List<Request> findByStatus(String status);

    // Buscar todas las solicitudes de un contratista específico
    List<Request> findByContractorId(Long contractorId);

    List<Request> findByCompanyId(Long companyId);

    List<Request> findByUserId(Long userId);

    // Buscar todas las solicitudes para un servicio específico
    List<Request> findByServiceId(Long serviceId);

    // Buscar todas las solicitudes en una fecha específica
    List<Request> findByDate(LocalDate date);

    // Buscar todas las solicitudes por contratista y estado
    List<Request> findByContractorIdAndStatus(Long contractorId, String status);

    List<Request> findByUserIdAndStatus(Long userId, String status);

    List<Request> findByCompanyIdAndStatus(Long companyId, String status);

    // Buscar todas las solicitudes por servicio y estado
    List<Request> findByServiceIdAndStatus(Long serviceId, String status);

    // Buscar todas las solicitudes dentro de un rango de fechas
    List<Request> findByDateBetween(LocalDate startDate, LocalDate endDate);

    List<Request> findByIdIn(List<Long> ids);

}
