package com.generalservicesplatform.general.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "notifications")
@Data
@NoArgsConstructor // Genera un constructor sin argumentos
public class Notification {

    // Constructor con parámetros
    public Notification(String senderUsername, String receiverUsername, String message, String timestamp) {
        this.senderUsername = senderUsername;
        this.receiverUsername = receiverUsername;
        this.message = message;
        this.timestamp = timestamp;
        this.isViewed = false;
    }

    @Id
    private String id;
    private String senderUsername;
    private String receiverUsername;
    private String message;
    private String timestamp;
    private boolean isViewed;

}
