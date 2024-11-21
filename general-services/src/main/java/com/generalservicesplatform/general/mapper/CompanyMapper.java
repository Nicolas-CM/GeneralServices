package com.generalservicesplatform.general.mapper;

import com.generalservicesplatform.general.dto.CompanyDto;
import com.generalservicesplatform.general.model.Company;
import com.generalservicesplatform.general.model.ServiceModel;
import com.generalservicesplatform.general.model.Rating;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import java.util.Collections;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = { RatingMapper.class })
public interface CompanyMapper {

    @Mapping(source = "services", target = "serviceIds", qualifiedByName = "mapServicesToIds")
    CompanyDto toDto(Company company);

    @Mapping(source = "serviceIds", target = "services", qualifiedByName = "mapIdsToServices")
    Company toEntity(CompanyDto companyDto);

    List<CompanyDto> toDto(List<Company> companies);

    List<Company> toEntity(List<CompanyDto> companyDtos);

    @Named("mapServicesToIds")
    default List<Long> mapServicesToIds(Set<ServiceModel> services) {
        return services.stream()
                .map(ServiceModel::getId)
                .collect(Collectors.toList());
    }

    @Named("mapIdsToServices")
    default Set<ServiceModel> mapIdsToServices(List<Long> serviceIds) {
        if (serviceIds == null || serviceIds.isEmpty()) {
            return Collections.emptySet(); // Retorna un conjunto vacío si serviceIds es nulo o vacío
        }
        return serviceIds.stream()
                .map(id -> {
                    ServiceModel service = new ServiceModel();
                    service.setId(id);
                    return service;
                })
                .collect(Collectors.toSet());
    }
}