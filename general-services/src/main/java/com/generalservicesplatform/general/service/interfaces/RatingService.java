package com.generalservicesplatform.general.service.interfaces;

import java.util.List;
import java.util.Optional;

import com.generalservicesplatform.general.model.Rating;

public interface RatingService {
    List<Rating> findAllRatings();

    Optional<Rating> findRatingById(Long id);

    Rating saveRating(Rating rating);

    void deleteRatingById(Long id);

    Optional<Rating> updateRating(Long id, Rating updatedRating);
}