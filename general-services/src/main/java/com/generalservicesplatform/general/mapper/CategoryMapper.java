package com.generalservicesplatform.general.mapper;

import com.generalservicesplatform.general.dto.CategoryDto;
import com.generalservicesplatform.general.model.Category;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryDto toDto(Category category);

    Category toEntity(CategoryDto categoryDto);

    List<CategoryDto> toDto(List<Category> categories);

    List<Category> toEntity(List<CategoryDto> categoryDtos);
}
