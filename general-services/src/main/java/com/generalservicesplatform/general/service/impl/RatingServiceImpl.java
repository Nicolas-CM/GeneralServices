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

    @Autowired
    private RatingRepository ratingRepository;

    @Override
    public List<Rating> findAllRatings() {
        return ratingRepository.findAll();
    }

    @Override
    public Optional<Rating> findRatingById(String id) {
        return ratingRepository.findById(id);
    }

    @Override
    public Rating saveRating(Rating rating) {
        return ratingRepository.save(rating);
    }

    @Override
    public void deleteRatingById(String id) {
        ratingRepository.deleteById(id);
    }

    @Override
    public Optional<Rating> updateRating(String id, Rating updatedRating) {
        return ratingRepository.findById(id).map(existingRating -> {
            existingRating.setRatingValue(updatedRating.getRatingValue());
            existingRating.setComment(updatedRating.getComment());
            existingRating.setCompanyId(updatedRating.getCompanyId());
            return ratingRepository.save(existingRating);
        });
    }

    public List<Rating> findRatingsByIds(List<String> ids) {
        return ratingRepository.findByIdIn(ids);
    }

    public List<Rating> findRatingsByCompanyId(String companyId) {
        return ratingRepository.findByCompanyId(companyId);
    }
}