package com.generalservicesplatform.general.model;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ratings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rating implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double ratingValue; // Valor de la calificación (e.g., 1 a 5 estrellas)

    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false) // Asociación obligatoria con la compañía
    private Company company;

    private String comment; // Comentario opcional sobre la compañía
}
