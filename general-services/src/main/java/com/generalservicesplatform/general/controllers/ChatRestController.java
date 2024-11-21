package com.generalservicesplatform.general.controllers;

import com.generalservicesplatform.general.dto.ChatMessageDto;
import com.generalservicesplatform.general.mapper.ChatMapper;
import com.generalservicesplatform.general.model.Chat;
import com.generalservicesplatform.general.model.Message;
import com.generalservicesplatform.general.service.impl.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/chats")
public class ChatRestController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // Crear un nuevo chat o reiniciar uno existente
    @PostMapping
    public ResponseEntity<Chat> createOrResetChat(@RequestParam String solicitudId) {
        Optional<Chat> existingChat = chatService.getChatBySolicitudId(solicitudId);

        if (existingChat.isPresent()) {
            // Si el chat ya existe, se reinicia eliminando los mensajes
            Chat chat = existingChat.get();
            chat.getMessages().clear();
            Chat updatedChat = chatService.saveChat(chat);
            return ResponseEntity.ok(updatedChat);
        } else {
            // Si no existe, se crea un nuevo chat
            Chat newChat = chatService.createChat(solicitudId);
            return ResponseEntity.status(201).body(newChat);
        }
    }

    // Obtener un chat por solicitudId
    @GetMapping("/{solicitudId}")
    public ResponseEntity<Chat> getChatBySolicitudId(@PathVariable String solicitudId) {
        Optional<Chat> chat = chatService.getChatBySolicitudId(solicitudId);
        return chat.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Agregar un mensaje a un chat
    @PostMapping("/{solicitudId}/messages")
    public ResponseEntity<ChatMessageDto> addMessageToChat(
            @PathVariable String solicitudId,
            @RequestBody ChatMessageDto chatMessageDto) {
        // Convertir DTO a entidad
        Message message = ChatMapper.INSTANCE.toEntity(chatMessageDto);

        // Guardar el mensaje en el chat
        Message savedMessage = chatService.addMessageToChat(
                solicitudId,
                message.getSender(),
                message.getReceiver(),
                message.getContent());

        // Convertir la entidad guardada a DTO
        ChatMessageDto savedMessageDto = ChatMapper.INSTANCE.toDto(savedMessage);

        messagingTemplate.convertAndSend("/topic/chat/" + savedMessage.getReceiver(), savedMessageDto);

        return ResponseEntity.status(201).body(savedMessageDto);
    }

    // Obtener todos los mensajes de un chat
    @GetMapping("/{solicitudId}/messages")
    public ResponseEntity<List<ChatMessageDto>> getMessagesFromChat(@PathVariable String solicitudId) {

        // Verificar si el chat existe, si no, crearlo
        Optional<Chat> chatOptional = chatService.getChatBySolicitudId(solicitudId);
        if (!chatOptional.isPresent()) {
            chatService.createChat(solicitudId);
        }

        List<Message> messages = chatService.getMessagesFromChat(solicitudId);

        // Convertir entidades a DTOs
        List<ChatMessageDto> messageDtos = messages.stream()
                .map(ChatMapper.INSTANCE::toDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(messageDtos);
    }
}
