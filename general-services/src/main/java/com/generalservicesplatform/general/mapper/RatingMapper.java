package com.generalservicesplatform.general.mapper;

import com.generalservicesplatform.general.dto.RatingDto;
import com.generalservicesplatform.general.model.Rating;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RatingMapper {

    @Mapping(source = "companyId", target = "companyId")
    RatingDto toDto(Rating rating);

    @Mapping(source = "companyId", target = "companyId")
    Rating toEntity(RatingDto ratingDto);

    List<RatingDto> toDto(List<Rating> ratings);

    List<Rating> toEntity(List<RatingDto> ratingDtos);
}
