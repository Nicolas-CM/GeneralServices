package com.generalservicesplatform.general.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageDto {
    private String solicitudId; // ID de la solicitud
    private String sender; // Remitente del mensaje
    private String receiver; // Receptor del mensaje
    private String content; // Contenido del mensaje
    private LocalDateTime timestamp;
}
