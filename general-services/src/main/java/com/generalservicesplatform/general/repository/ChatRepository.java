package com.generalservicesplatform.general.repository;

import com.generalservicesplatform.general.model.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatRepository extends MongoRepository<Chat, String> {
    Optional<Chat> findBySolicitudId(String solicitudId);
}
