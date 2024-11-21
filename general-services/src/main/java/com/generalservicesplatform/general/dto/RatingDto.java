package com.generalservicesplatform.general.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RatingDto {
    private Long id;
    private Double ratingValue; // Valor de la calificación (e.g., 1 a 5 estrellas)
    private Long companyId;
    private String comment; // Comentario opcional sobre el servicio o contratista
    private String description;
}
