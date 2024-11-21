// src/main/java/com/generalservicesplatform/general/dto/NotificationDto.java
package com.generalservicesplatform.general.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDto {
    private String senderUsername;
    private String receiverUsername;
    private String message;
}