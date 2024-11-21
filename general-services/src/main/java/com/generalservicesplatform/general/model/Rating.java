package com.generalservicesplatform.general.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "ratings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rating {
    @Id
    private String id;

    private Double ratingValue; // Valor de la calificación (e.g., 1 a 5 estrellas)

    private String companyId; // ID de la compañía

    private String comment; // Comentario opcional sobre la compañía
}
