package com.generalservicesplatform.general.service.interfaces;

import java.util.List;
import java.util.Optional;

import com.generalservicesplatform.general.model.Company;
import com.generalservicesplatform.general.model.ServiceModel;

public interface CompanyService {
    List<Company> findAllCompanies();

    Optional<Company> findCompanyById(Long id);

    Company saveCompany(Company company);

    void deleteCompanyById(Long id);

    Optional<Company> updateCompany(Long id, Company updatedCompany);

    void deleteServiceFromCompany(Company company,ServiceModel service);

}