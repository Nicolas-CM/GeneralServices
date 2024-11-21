package com.generalservicesplatform.general.controllers;

import com.generalservicesplatform.general.dto.RatingDto;
import com.generalservicesplatform.general.exceptions.RatingNotFoundException;
import com.generalservicesplatform.general.mapper.RatingMapper;
import com.generalservicesplatform.general.model.Rating;
import com.generalservicesplatform.general.service.impl.RatingServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ratings")
public class RatingRestController {

    @Autowired
    private RatingServiceImpl ratingService;

    @Autowired
    private RatingMapper ratingMapper;

    @GetMapping
    public ResponseEntity<List<RatingDto>> getAllRatings() {
        List<Rating> ratings = ratingService.findAllRatings();
        return ResponseEntity.ok(ratingMapper.toDto(ratings));
    }

    @PostMapping
    public ResponseEntity<RatingDto> createRating(@RequestBody RatingDto ratingDto) {
        Rating rating = ratingMapper.toEntity(ratingDto);
        Rating savedRating = ratingService.saveRating(rating);
        return ResponseEntity.status(HttpStatus.CREATED).body(ratingMapper.toDto(savedRating));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RatingDto> getRatingById(@PathVariable String id) {
        return ratingService.findRatingById(id)
                .map(rating -> ResponseEntity.ok(ratingMapper.toDto(rating)))
                .orElseThrow(() -> new RatingNotFoundException("Rating no encontrado con ID: " + id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RatingDto> updateRating(@PathVariable String id, @RequestBody RatingDto ratingDto) {
        Rating rating = ratingMapper.toEntity(ratingDto);
        return ratingService.updateRating(id, rating)
                .map(updatedRating -> ResponseEntity.ok(ratingMapper.toDto(updatedRating)))
                .orElseThrow(() -> new RatingNotFoundException("Rating no encontrado para actualizar con ID: " + id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRating(@PathVariable String id) {
        Optional<Rating> BorradoRatingOptional = ratingService.findRatingById(id);
        return BorradoRatingOptional.map(rating -> {
            ratingService.deleteRatingById(id);
            return ResponseEntity.ok("Borrado");
        }).orElseThrow(() -> new RatingNotFoundException("Rating no encontrado para eliminar con ID: " + id));
    }

    @GetMapping("/by-ids")
    public ResponseEntity<List<RatingDto>> getRatingsByIds(@RequestParam List<String> ids) {
        if (ids == null || ids.isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }

        List<Rating> ratings = ratingService.findRatingsByIds(ids);
        return ResponseEntity.ok(ratingMapper.toDto(ratings));
    }

    @GetMapping("company/{companyId}")
    public ResponseEntity<List<RatingDto>> getRatingsByCompanyId(@PathVariable String companyId) {
        List<Rating> ratings = ratingService.findRatingsByCompanyId(companyId);
        return ResponseEntity.ok(ratingMapper.toDto(ratings));
    }

}
