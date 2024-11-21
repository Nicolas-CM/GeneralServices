package com.generalservicesplatform.general.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.generalservicesplatform.general.model.Rating;

import java.util.List;

/**
 * RatingRepository
 */
@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {

    // Método para encontrar calificaciones por valor de calificación
    List<Rating> findByRatingValue(Double ratingValue);

    List<Rating> findByCompanyId(Long companyId);

    // Método para encontrar calificaciones por comentario
    List<Rating> findByCommentContaining(String comment);

    // Método para encontrar calificaciones por una lista de IDs
    List<Rating> findByIdIn(List<Long> ids);
}
