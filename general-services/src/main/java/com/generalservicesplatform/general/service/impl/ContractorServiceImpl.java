package com.generalservicesplatform.general.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.generalservicesplatform.general.model.Contractor;
import com.generalservicesplatform.general.repository.ContractorRepository;
import com.generalservicesplatform.general.service.interfaces.ContractorService;

@Service
public class ContractorServiceImpl implements ContractorService {
    private final ContractorRepository contractorRepository;

    @Autowired
    public ContractorServiceImpl(ContractorRepository contractorRepository) {
        this.contractorRepository = contractorRepository;
    }

    @Override
    public List<Contractor> findAllContractors() {
        return contractorRepository.findAll();
    }

    @Override
    public Optional<Contractor> findContractorById(Long id) {
        return contractorRepository.findById(id);
    }

    @Override
    public Contractor saveContractor(Contractor contractor) {
        if (contractor == null) {
            throw new IllegalArgumentException("Contractor cannot be null");
        }
        return contractorRepository.save(contractor);
    }

    @Override
    public void deleteContractorById(Long id) {
        contractorRepository.findById(id)
                .map(contractor -> {
                    contractor.setStatus(false);
                    return contractorRepository.save(contractor);
                });
    }

    @Override
    public Optional<Contractor> updateContractor(Long id, Contractor updatedContractor) {
        return contractorRepository.findById(id)
                .map(existingContractor -> {
                    existingContractor.setName(updatedContractor.getName());
                    // Actualiza otros campos necesarios
                    return contractorRepository.save(existingContractor);
                });
    }

    public Optional<Contractor> updateContractorAvailability(Long id, Contractor updatedContractor) {
        return contractorRepository.findById(id)
                .map(existingContractor -> {
                    existingContractor.setAvailable(updatedContractor.getAvailable());
                    // Actualiza otros campos necesarios
                    return contractorRepository.save(existingContractor);
                });
    }

    public List<Contractor> findContractorsByIds(List<Long> ids) {
        return contractorRepository.findByIdIn(ids);
    }

    public List<Contractor> findByCompanyId(Long companyId) {
        return contractorRepository.findByCompanyId(companyId);
    }
}