package com.generalservicesplatform.general.service.impl;

import com.generalservicesplatform.general.model.Chat;
import com.generalservicesplatform.general.model.Message;
import com.generalservicesplatform.general.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    // Crear un nuevo chat para una solicitud
    public Chat createChat(String solicitudId) {
        Chat chat = new Chat(solicitudId);
        return chatRepository.save(chat);
    }

    // Obtener un chat por solicitudId
    public Optional<Chat> getChatBySolicitudId(String solicitudId) {
        return chatRepository.findBySolicitudId(solicitudId);
    }

    // Agregar un mensaje a un chat existente
    public Message addMessageToChat(String solicitudId, String sender, String receiver, String content) {
        Chat chat = chatRepository.findBySolicitudId(solicitudId)
                .orElseThrow(() -> new RuntimeException("Chat no encontrado para solicitudId: " + solicitudId));

        Message message = new Message(sender, receiver, content, LocalDateTime.now());
        chat.getMessages().add(message);
        chatRepository.save(chat);

        return message;
    }

    // Obtener todos los mensajes de un chat
    public List<Message> getMessagesFromChat(String solicitudId) {
        Chat chat = chatRepository.findBySolicitudId(solicitudId)
                .orElseThrow(() -> new RuntimeException("Chat no encontrado para solicitudId: " + solicitudId));

        return chat.getMessages();
    }
    public Chat saveChat(Chat chat) {
        return chatRepository.save(chat);
    }
    
}
