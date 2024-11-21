package com.generalservicesplatform.general.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.generalservicesplatform.general.exceptions.CompanyNotFoundException;
import com.generalservicesplatform.general.model.Company;
import com.generalservicesplatform.general.model.ServiceModel;
import com.generalservicesplatform.general.repository.CompanyRepository;
import com.generalservicesplatform.general.service.interfaces.CompanyService;

@Service
public class CompanyServiceImpl implements CompanyService {
    private final CompanyRepository companyRepository;
    private final ServiceServiceImpl serviceService;

    @Autowired
    public CompanyServiceImpl(CompanyRepository companyRepository, ServiceServiceImpl serviceService) {
        this.companyRepository = companyRepository;
        this.serviceService = serviceService;
    }

    @Override
    public List<Company> findAllCompanies() {
        return companyRepository.findAll();
    }

    @Override
    public Optional<Company> findCompanyById(Long id) {
        return companyRepository.findById(id);
    }

    @Override
    public Company saveCompany(Company company) {
        if (company == null) {
            throw new IllegalArgumentException("Company cannot be null");
        }
        return companyRepository.save(company);
    }

    @Override
    public void deleteCompanyById(Long id) {
        companyRepository.deleteById(id);
    }

    @Override
    public Optional<Company> updateCompany(Long id, Company updatedCompany) {
        return companyRepository.findById(id)
                .map(existingCompany -> {
                    existingCompany.setName(updatedCompany.getName());
                    existingCompany.setEmail(updatedCompany.getEmail());
                    // Actualiza otros campos necesarios
                    return companyRepository.save(existingCompany);
                });
    }

    public List<Company> findCompaniesByServiceId(Long serviceId) {
        return companyRepository.findCompaniesByServiceId(serviceId);
    }

    @Override
    public void deleteServiceFromCompany(Company company, ServiceModel service) {

        Set<Company> actualCompanies = service.getCompanies();
        actualCompanies.removeIf(companyA -> companyA.getId().equals(company.getId()));
        service.setCompanies(actualCompanies);
        serviceService.saveService(service);

        Set<ServiceModel> actualServices= company.getServices();
        actualServices.removeIf(serviceA -> serviceA.getId().equals(service.getId()));
        company.setServices(actualServices);
        companyRepository.save(company);
        
    }

    public Optional<Company> findByName(String name) {
        return companyRepository.findByName(name);
    }

    public List<Company> findCompaniesByIds(List<Long> ids) {
        return companyRepository.findByIdIn(ids);
    }

    public Optional<Company> findByUserId(Integer userId) {
        return companyRepository.findByUserId(userId);
    }
}