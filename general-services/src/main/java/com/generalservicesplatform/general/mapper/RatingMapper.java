package com.generalservicesplatform.general.mapper;

import com.generalservicesplatform.general.dto.RatingDto;
import com.generalservicesplatform.general.model.Rating;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RatingMapper {

    // Mapea desde la entidad Rating hacia el DTO
    @Mapping(source = "company.id", target = "companyId")
    RatingDto toDto(Rating rating);

    // Mapea desde el DTO hacia la entidad Rating
    @Mapping(source = "companyId", target = "company.id")
    Rating toEntity(RatingDto ratingDto);

    // Listado de mapeos para Rating -> RatingDto
    List<RatingDto> toDto(List<Rating> ratings);

    // Listado de mapeos para RatingDto -> Rating
    List<Rating> toEntity(List<RatingDto> ratingDtos);
}
