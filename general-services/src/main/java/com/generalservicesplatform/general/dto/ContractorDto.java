package com.generalservicesplatform.general.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContractorDto {
    private Long id;
    private String name;
    private Long companyId; // Agregado para la relación con la compañía
    private Boolean available;
    private Boolean status;
}
