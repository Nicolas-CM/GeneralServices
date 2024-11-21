package com.generalservicesplatform.general.service.interfaces;

import java.util.List;
import java.util.Optional;

import com.generalservicesplatform.general.model.Rating;

public interface RatingService {
    List<Rating> findAllRatings();

    Optional<Rating> findRatingById(String id);

    Rating saveRating(Rating rating);

    void deleteRatingById(String id);

    Optional<Rating> updateRating(String id, Rating updatedRating);
}