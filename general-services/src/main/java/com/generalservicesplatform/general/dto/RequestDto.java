package com.generalservicesplatform.general.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestDto {
    private Long id;
    private Long userId; // ID del usuario asociado
    private String username; // Nuevo atributo para el username del cliente
    private Long serviceId; // ID del servicio asociado
    private Long contractorId; // ID del contratista asociado
    private LocalDate date;
    private String status; // En progreso, Cancelado, Completado, En Espera
    private String description;
    private Long companyId; // ID de la compañía asociada
}