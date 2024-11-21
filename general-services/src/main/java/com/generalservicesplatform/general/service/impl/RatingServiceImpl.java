package com.generalservicesplatform.general.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.generalservicesplatform.general.model.Rating;
import com.generalservicesplatform.general.repository.RatingRepository;
import com.generalservicesplatform.general.service.interfaces.RatingService;

@Service
public class RatingServiceImpl implements RatingService {
    private final RatingRepository ratingRepository;

    @Autowired
    public RatingServiceImpl(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    @Override
    public List<Rating> findAllRatings() {
        return ratingRepository.findAll();
    }

    @Override
    public Optional<Rating> findRatingById(Long id) {
        return ratingRepository.findById(id);
    }

    @Override
    public Rating saveRating(Rating rating) {
        if (rating == null) {
            throw new IllegalArgumentException("Rating cannot be null");
        }
        return ratingRepository.save(rating);
    }

    @Override
    public void deleteRatingById(Long id) {
        ratingRepository.deleteById(id);
    }

    @Override
    public Optional<Rating> updateRating(Long id, Rating updatedRating) {
        return ratingRepository.findById(id)
                .map(existingRating -> {
                    existingRating.setRatingValue(updatedRating.getRatingValue());
                    existingRating.setComment(updatedRating.getComment());
                    // Actualiza otros campos necesarios
                    return ratingRepository.save(existingRating);
                });
    }

    public List<Rating> findRatingsByIds(List<Long> ids) {
        return ratingRepository.findByIdIn(ids);
    }
}