package com.generalservicesplatform.general.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.generalservicesplatform.general.exceptions.ServiceNotFoundException;
import com.generalservicesplatform.general.model.Company;
import com.generalservicesplatform.general.model.ServiceModel;
import com.generalservicesplatform.general.repository.CompanyRepository;
import com.generalservicesplatform.general.repository.ServiceRepository;
import com.generalservicesplatform.general.service.interfaces.ServiceService;

@Service
public class ServiceServiceImpl implements ServiceService {
    private final ServiceRepository serviceRepository;
    private final CompanyRepository companyRepository;

    @Autowired
    public ServiceServiceImpl(ServiceRepository serviceRepository, CompanyRepository companyRepository) {
        this.serviceRepository = serviceRepository;
        this.companyRepository = companyRepository;
    }

    @Override
    public List<ServiceModel> findAllServices() {
        return serviceRepository.findAll();
    }

    @Override
    public Optional<ServiceModel> findServiceById(Long id) {
        return serviceRepository.findById(id);
    }

    public List<ServiceModel> findByCompanyId(Long companyId) {
        return serviceRepository.findByCompanyId(companyId);
    }

    @Override
    public ServiceModel saveService(ServiceModel service) {
        if (service == null) {
            throw new IllegalArgumentException("Service cannot be null");
        }
        return serviceRepository.save(service);
    }

    @Override
    public void deleteServiceById(Long id) {
        serviceRepository.deleteById(id);
    }

    @Override
    public Optional<ServiceModel> updateService(Long id, ServiceModel updatedService) {
        return serviceRepository.findById(id)
                .map(existingService -> {
                    existingService.setName(updatedService.getName());
                    existingService.setDescription(updatedService.getDescription());
                    existingService.setCompanies(updatedService.getCompanies());
                    // Actualiza otros campos necesarios
                    return serviceRepository.save(existingService);
                });
    }

    public List<ServiceModel> findServicesByUserId(Integer userId) {
        System.out.println("Finding company for userId: " + userId);
        Optional<Company> companyOptional = companyRepository.findByUserId(userId);
        if (companyOptional.isPresent()) {
            Long companyId = companyOptional.get().getId();
            System.out.println("Found company with id: " + companyId);
            return serviceRepository.findByCompanyId(companyId);
        } else {
            throw new ServiceNotFoundException("No company found for userId: " + userId);
        }
    }

    public List<ServiceModel> findServicesByIds(List<Long> ids) {
        return serviceRepository.findByIdIn(ids);
    }

}