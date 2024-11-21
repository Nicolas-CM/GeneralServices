package com.generalservicesplatform.general.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "chats")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Chat {

    public Chat(String solicitudId) {
        this.solicitudId = solicitudId;
        this.messages = new ArrayList<>();
    }

    @Id
    private String id;
    private String solicitudId;
    private List<Message> messages;
}
