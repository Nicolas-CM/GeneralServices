package com.generalservicesplatform.general.controllers;

import com.generalservicesplatform.general.model.Notification;
import com.generalservicesplatform.general.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notifications")
public class NotificationRestController {

    @Autowired
    private NotificationRepository notificationRepository;

    // Obtener todas las notificaciones
    @GetMapping
    public ResponseEntity<List<Notification>> getAllNotifications() {
        List<Notification> notifications = notificationRepository.findAll();
        return ResponseEntity.ok(notifications);
    }

    // Obtener notificaciones por username del receptor
    @GetMapping("/receiver/{username}")
    public ResponseEntity<List<Notification>> getNotificationsByReceiverUsername(@PathVariable String username) {
        List<Notification> notifications = notificationRepository.findByReceiverUsername(username);
        return ResponseEntity.ok(notifications);
    }

    // Obtener notificaciones no vistas por username del receptor
    @GetMapping("/receiver/{username}/unviewed")
    public ResponseEntity<List<Notification>> getUnviewedNotificationsByReceiverUsername(
            @PathVariable String username) {
        List<Notification> notifications = notificationRepository.findByReceiverUsernameAndIsViewed(username, false);
        return ResponseEntity.ok(notifications);
    }

    // Obtener notificaciones vistas por username del receptor
    @GetMapping("/receiver/{username}/viewed")
    public ResponseEntity<List<Notification>> getViewedNotificationsByReceiverUsername(@PathVariable String username) {
        List<Notification> notifications = notificationRepository.findByReceiverUsernameAndIsViewed(username, true);
        return ResponseEntity.ok(notifications);
    }

    // Obtener una notificación por ID
    @GetMapping("/{id}")
    public ResponseEntity<Notification> getNotificationById(@PathVariable String id) {
        Optional<Notification> notification = notificationRepository.findById(id);
        return notification.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear una nueva notificación
    @PostMapping
    public ResponseEntity<Notification> createNotification(@RequestBody Notification notification) {
        Notification savedNotification = notificationRepository.save(notification);
        return ResponseEntity.status(201).body(savedNotification);
    }

    // Endpoint para marcar una notificación como vista
    @PutMapping("/viewed/{id}")
    public ResponseEntity<Notification> markAsViewed(@PathVariable String id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notificación no encontrada con ID: " + id));

        // Cambiar el estado a 'vista'
        notification.setViewed(true);
        notificationRepository.save(notification);

        return ResponseEntity.ok(notification);
    }

    // Eliminar una notificación
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable String id) {
        if (!notificationRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        notificationRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Obtener notificaciones por username del remitente
    @GetMapping("/sender/{username}")
    public ResponseEntity<List<Notification>> getNotificationsBySenderUsername(@PathVariable String username) {
        List<Notification> notifications = notificationRepository.findBySenderUsername(username);
        return ResponseEntity.ok(notifications);
    }

    // Obtener notificaciones no vistas por username del remitente
    @GetMapping("/sender/{username}/unviewed")
    public ResponseEntity<List<Notification>> getUnviewedNotificationsBySenderUsername(@PathVariable String username) {
        List<Notification> notifications = notificationRepository.findBySenderUsernameAndIsViewed(username, false);
        return ResponseEntity.ok(notifications);
    }

    // Obtener notificaciones vistas por username del remitente
    @GetMapping("/sender/{username}/viewed")
    public ResponseEntity<List<Notification>> getViewedNotificationsBySenderUsername(@PathVariable String username) {
        List<Notification> notifications = notificationRepository.findBySenderUsernameAndIsViewed(username, true);
        return ResponseEntity.ok(notifications);
    }

    // Obtener notificaciones por username del receptor y remitente
    @GetMapping("/receiver/{receiverUsername}/sender/{senderUsername}")
    public ResponseEntity<List<Notification>> getNotificationsByReceiverAndSenderUsername(
            @PathVariable String receiverUsername, @PathVariable String senderUsername) {
        List<Notification> notifications = notificationRepository
                .findByReceiverUsernameAndSenderUsername(receiverUsername, senderUsername);
        return ResponseEntity.ok(notifications);
    }
}