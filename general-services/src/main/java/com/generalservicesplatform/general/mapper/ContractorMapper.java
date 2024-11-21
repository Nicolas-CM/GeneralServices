package com.generalservicesplatform.general.mapper;

import com.generalservicesplatform.general.dto.ContractorDto;
import com.generalservicesplatform.general.model.Contractor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ContractorMapper {
    @Mapping(source = "company.id", target = "companyId")
    ContractorDto toDto(Contractor contractor);

    @Mapping(source = "companyId", target = "company.id")
    Contractor toEntity(ContractorDto contractorDto);

    List<ContractorDto> toDto(List<Contractor> contractors);

    List<Contractor> toEntity(List<ContractorDto> contractorDtos);
}