// src/main/java/com/generalservicesplatform/general/controllers/WebSocketController.java
package com.generalservicesplatform.general.controllers;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import com.generalservicesplatform.general.dto.NotificationDto;
import com.generalservicesplatform.general.model.Notification;
import com.generalservicesplatform.general.repository.NotificationRepository;

@Controller
public class WebSocketController {

    @Autowired
    private NotificationRepository notificationRepository;

    @MessageMapping("/sendNotification")
    @SendTo("/topic/notifications")
    public NotificationDto sendNotification(NotificationDto notificationDto) {
        // Guardar la notificación en MongoDB
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        Notification notification = new Notification(notificationDto.getSenderUsername(),
                notificationDto.getReceiverUsername(),
                notificationDto.getMessage(),
                timestamp);

        // Guardar en la base de datos
        notificationRepository.save(notification);

        // Devolver la notificación
        return notificationDto;
    }
}
