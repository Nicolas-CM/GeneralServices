package com.generalservicesplatform.general.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BillingDto {
    private Long id;
    private Long requestId; // Para el mapeo con Request
    private Long contractorId; // Para el mapeo con Contractor
    private Long userId; // Para el mapeo con User
    private Double amount;
    private LocalDate paymentDate;
    private String paymentMethod;

}
