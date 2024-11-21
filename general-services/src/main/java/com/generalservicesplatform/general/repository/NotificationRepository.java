package com.generalservicesplatform.general.repository;

import com.generalservicesplatform.general.model.Notification;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {
    // Puedes agregar métodos personalizados si los necesitas

    List<Notification> findByReceiverUsername(String receiverUsername);

    // Método para obtener todas las notificaciones no vistas de un usuario
    List<Notification> findByReceiverUsernameAndIsViewed(String receiverUsername, boolean isViewed);

    // Método para obtener una notificación por su ID
    Optional<Notification> findById(String id);

    // Método para obtener todas las notificaciones por el username del remitente
    List<Notification> findBySenderUsername(String senderUsername);

    // Método para obtener todas las notificaciones por el username del remitente y
    // el estado de vista
    List<Notification> findBySenderUsernameAndIsViewed(String senderUsername, boolean isViewed);

    // Método para obtener todas las notificaciones por el username del receptor y
    // el remitente
    List<Notification> findByReceiverUsernameAndSenderUsername(String receiverUsername, String senderUsername);
}