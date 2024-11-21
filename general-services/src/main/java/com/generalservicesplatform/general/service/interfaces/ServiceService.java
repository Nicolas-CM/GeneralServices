package com.generalservicesplatform.general.service.interfaces;

import java.util.List;
import java.util.Optional;

import com.generalservicesplatform.general.model.ServiceModel;

public interface ServiceService {
    List<ServiceModel> findAllServices();

    Optional<ServiceModel> findServiceById(Long id);

    ServiceModel saveService(ServiceModel service);

    void deleteServiceById(Long id);

    Optional<ServiceModel> updateService(Long id, ServiceModel updatedService);
}