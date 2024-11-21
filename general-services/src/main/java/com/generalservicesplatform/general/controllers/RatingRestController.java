package com.generalservicesplatform.general.controllers;

import com.generalservicesplatform.general.model.Company;
import com.generalservicesplatform.general.model.Rating;
import com.generalservicesplatform.general.model.User;
import com.generalservicesplatform.general.repository.NotificationRepository;
import com.generalservicesplatform.general.dto.NotificationDto;
import com.generalservicesplatform.general.dto.RatingDto;
import com.generalservicesplatform.general.mapper.RatingMapper;
import com.generalservicesplatform.general.service.impl.RatingServiceImpl;
import com.generalservicesplatform.general.service.impl.UserServiceImpl;

import com.generalservicesplatform.general.service.impl.CompanyServiceImpl;
import com.generalservicesplatform.general.exceptions.RatingNotFoundException;
import com.generalservicesplatform.general.exceptions.BadRequestException;
import com.generalservicesplatform.general.exceptions.CompanyNotFoundException;
import com.generalservicesplatform.general.model.Notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ratings")
public class RatingRestController {

    @Autowired
    private RatingServiceImpl ratingService;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private RatingMapper ratingMapper; // Mapper de MapStruct

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private CompanyServiceImpl companyService;

    @Autowired
    private NotificationRepository notificationRepository;

    // Obtener todos los ratings
    @GetMapping
    public ResponseEntity<List<RatingDto>> getAllRatings() {
        List<Rating> ratings = ratingService.findAllRatings();
        return ResponseEntity.ok(ratingMapper.toDto(ratings));
    }

    // Crear un nuevo rating
    @PostMapping
    public ResponseEntity<RatingDto> createRating(@RequestBody RatingDto ratingDto) {
        // Validación simple para el valor del rating
        if (ratingDto.getRatingValue() < 1 || ratingDto.getRatingValue() > 5) {
            throw new BadRequestException("El valor del rating debe estar entre 1 y 5.");
        }

        // Convertir el DTO a entidad y guardar el rating
        Rating rating = ratingMapper.toEntity(ratingDto);
        Rating savedRating = ratingService.saveRating(rating);

        // Obtener el dueño de la empresa
        Company company = companyService.findCompanyById(rating.getCompany().getId())
                .orElseThrow(() -> new CompanyNotFoundException(
                        "Empresa no encontrada con ID: " + rating.getCompany().getId()));

        String companyOwnerUsername = company.getUser().getUsername();

        // Crear la notificación
        NotificationDto notificationDto = new NotificationDto(
                "Anónimo", // En este caso es un usuario anónimo
                companyOwnerUsername,
                "Has recibido un nuevo comentario en tu empresa");

        // Enviar la notificación a través de WebSocket
        messagingTemplate.convertAndSend("/topic/notifications/" + companyOwnerUsername, notificationDto);

        // Persistir la notificación en MongoDB
        Notification notification = new Notification(
                notificationDto.getSenderUsername(),
                notificationDto.getReceiverUsername(),
                notificationDto.getMessage(),
                LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        notificationRepository.save(notification);

        return ResponseEntity.status(HttpStatus.CREATED).body(ratingMapper.toDto(savedRating));
    }

    // Obtener un rating por ID
    @GetMapping("/{id}")
    public ResponseEntity<RatingDto> getRatingById(@PathVariable Long id) {
        return ratingService.findRatingById(id)
                .map(rating -> ResponseEntity.ok(ratingMapper.toDto(rating)))
                .orElseThrow(() -> new RatingNotFoundException("Rating no encontrado con ID: " + id));
    }

    // Actualizar un rating
    @PutMapping("/{id}")
    public ResponseEntity<RatingDto> updateRating(@PathVariable Long id, @RequestBody RatingDto ratingDto) {
        // Validación simple para el valor del rating
        if (ratingDto.getRatingValue() < 1 || ratingDto.getRatingValue() > 5) {
            throw new BadRequestException("El valor del rating debe estar entre 1 y 5.");
        }
        Rating rating = ratingMapper.toEntity(ratingDto);
        return ratingService.updateRating(id, rating)
                .map(updatedRating -> ResponseEntity.ok(ratingMapper.toDto(updatedRating)))
                .orElseThrow(() -> new RatingNotFoundException("Rating no encontrado para actualizar con ID: " + id));
    }

    // Eliminar un rating
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRating(@PathVariable Long id) {
        Optional<Rating> BorradoRatingOptional = ratingService.findRatingById(id);
        return BorradoRatingOptional.map(rating -> {
            ratingService.deleteRatingById(id); // Elimina el rating
            return ResponseEntity.ok("Borrado"); // Devuelve el rating eliminado
        }).orElseThrow(() -> new RatingNotFoundException("Rating no encontrado para eliminar con ID: " + id));
    }

    // Obtener ratings por una lista de IDs
    @GetMapping("/by-ids")
    public ResponseEntity<List<RatingDto>> getRatingsByIds(@RequestParam List<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }

        List<Rating> ratings = ratingService.findRatingsByIds(ids);
        return ResponseEntity.ok(ratingMapper.toDto(ratings));
    }

}
