// src/main/java/com/generalservicesplatform/general/controllers/WebSocketController.java
package com.generalservicesplatform.general.controllers;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import com.generalservicesplatform.general.dto.NotificationDto;
import com.generalservicesplatform.general.dto.ChatMessageDto;
import com.generalservicesplatform.general.model.Notification;
import com.generalservicesplatform.general.model.Message;
import com.generalservicesplatform.general.model.Chat;
import com.generalservicesplatform.general.repository.NotificationRepository;
import com.generalservicesplatform.general.repository.ChatRepository;

@Controller
public class WebSocketController {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private ChatRepository chatRepository;

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
    @MessageMapping("/sendChatMessage")
    @SendTo("/topic/chat/{solicitudId}")
    public ChatMessageDto sendChatMessage(ChatMessageDto chatMessageDto) {
        // Buscar el chat asociado a la solicitud
        Chat chat = chatRepository.findBySolicitudId(chatMessageDto.getSolicitudId())
                .orElseThrow(() -> new RuntimeException("Chat no encontrado para solicitudId: " + chatMessageDto.getSolicitudId()));

        // Crear un nuevo mensaje
        Message message = new Message(
                chatMessageDto.getSender(),
                chatMessageDto.getReceiver(),
                chatMessageDto.getContent(),
                LocalDateTime.now()
        );

        // Agregar el mensaje al chat y guardar en la base de datos
        chat.getMessages().add(message);
        chatRepository.save(chat);

        // Devolver el mensaje como DTO
        return chatMessageDto;
    }
}
