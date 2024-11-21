package com.generalservicesplatform.general.mapper;

import com.generalservicesplatform.general.dto.RequestDto;
import com.generalservicesplatform.general.model.Request;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RequestMapper {

    @Mapping(source = "service.id", target = "serviceId")
    @Mapping(source = "contractor.id", target = "contractorId", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    @Mapping(source = "user.id", target = "userId") // Mapeo del userId desde la relación con User
    @Mapping(source = "company.id", target = "companyId") // Mapeo del companyId desde la relación con Company
    RequestDto toDto(Request request);

    @Mapping(source = "serviceId", target = "service.id")
    @Mapping(source = "contractorId", target = "contractor.id", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    @Mapping(source = "userId", target = "user.id") // Mapeo del userId para crear la relación en la entidad
    @Mapping(source = "companyId", target = "company.id") // Mapeo del companyId para crear la relación en la entidad
    Request toEntity(RequestDto requestDto);

    List<RequestDto> toDto(List<Request> requests);

    List<Request> toEntity(List<RequestDto> requestDtos);
}
