package com.generalservicesplatform.general.service.interfaces;

import java.util.List;
import java.util.Optional;

import com.generalservicesplatform.general.model.Contractor;

public interface ContractorService {
    List<Contractor> findAllContractors();

    Optional<Contractor> findContractorById(Long id);

    Contractor saveContractor(Contractor contractor);

    void deleteContractorById(Long id);

    Optional<Contractor> updateContractor(Long id, Contractor updatedContractor);
}