package com.generalservicesplatform.general.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDto {
    private Long id;
    private String name;
    private String description;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String country;
    private String zipCode;
    private String email;// Calificación promedio de la compañía
    private List<Long> serviceIds; // Lista de IDs de servicios asociados
}
