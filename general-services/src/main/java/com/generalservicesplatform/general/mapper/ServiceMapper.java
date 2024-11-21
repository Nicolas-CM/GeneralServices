package com.generalservicesplatform.general.mapper;

import com.generalservicesplatform.general.dto.ServiceDto;
import com.generalservicesplatform.general.model.Company;
import com.generalservicesplatform.general.model.ServiceModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ServiceMapper {
    @Mapping(source = "category.id", target = "categoryId")
    @Mapping(source = "companies", target = "companyIds", qualifiedByName = "mapCompaniesToIds")
    ServiceDto toDto(ServiceModel service);

    @Mapping(source = "categoryId", target = "category.id")
    @Mapping(source = "companyIds", target = "companies", qualifiedByName = "mapIdsToCompanies")
    ServiceModel toEntity(ServiceDto serviceDto);

    List<ServiceDto> toDto(List<ServiceModel> services);

    List<ServiceModel> toEntity(List<ServiceDto> serviceDtos);

    @Named("mapCompaniesToIds")
    default List<Long> mapCompaniesToIds(Set<Company> companies) {
        return companies.stream()
                .map(Company::getId)
                .collect(Collectors.toList());
    }

    @Named("mapIdsToCompanies")
    default Set<Company> mapIdsToCompanies(List<Long> companyIds) {
        return companyIds.stream()
                .map(id -> {
                    Company company = new Company();
                    company.setId(id);
                    return company;
                })
                .collect(Collectors.toSet());
    }
}
