package com.generalservicesplatform.general.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.generalservicesplatform.general.model.Category;

import java.util.List;
import java.util.Optional;

/**
 * CategoryRepository
 */
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    // Método para encontrar una categoría por nombre
    Optional<Category> findByName(String name);

    // Método para encontrar categorías por descripción
    List<Category> findByDescriptionContaining(String description);

    List<Category> findByIdIn(List<Long> ids);

}
