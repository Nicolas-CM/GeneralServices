package com.generalservicesplatform.general.service.interfaces;

import java.util.List;
import java.util.Optional;

import com.generalservicesplatform.general.model.Category;

public interface CategoryService {
    List<Category> findAllCategories();

    Optional<Category> findCategoryById(Long id);

    Category saveCategory(Category category);

    void deleteCategoryById(Long id);

    Optional<Category> updateCategory(Long id, Category updatedCategory);
}