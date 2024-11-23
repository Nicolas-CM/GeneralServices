package com.generalservicesplatform.general.controllers;

import com.generalservicesplatform.general.model.Billing;
import com.generalservicesplatform.general.model.User;
import com.generalservicesplatform.general.repository.NotificationRepository;
import com.generalservicesplatform.general.dto.BillingDto;
import com.generalservicesplatform.general.dto.NotificationDto;
import com.generalservicesplatform.general.model.Notification;
import com.generalservicesplatform.general.mapper.BillingMapper;
import com.generalservicesplatform.general.service.impl.BillingServiceImpl;
import com.generalservicesplatform.general.service.impl.ContractorServiceImpl;
import com.generalservicesplatform.general.service.impl.UserServiceImpl;
import com.generalservicesplatform.general.exceptions.BillingNotFoundException;
import com.generalservicesplatform.general.exceptions.BadRequestException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/billings")
public class BillingRestController {

    @Autowired
    private BillingServiceImpl billingService;

    @Autowired
    private BillingMapper billingMapper; // Mapper de MapStruct

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private ContractorServiceImpl contractorService;

    @Autowired
    private NotificationRepository notificationRepository;

    // Obtener todas las facturas
    @GetMapping
    public ResponseEntity<List<BillingDto>> getAllBillings() {
        List<Billing> billings = billingService.findAllBillings();
        return ResponseEntity.ok(billingMapper.toDto(billings));
    }

    // Crear una nueva factura
    @PostMapping
    public ResponseEntity<BillingDto> createBilling(@RequestBody BillingDto billingDto) {
        // Validación simple para el monto
        if (billingDto.getAmount() == null || billingDto.getAmount() <= 0) {
            throw new BadRequestException("El monto de la factura es obligatorio y debe ser mayor que cero.");
        }
        Billing billing = billingMapper.toEntity(billingDto);
        Billing savedBilling = billingService.saveBilling(billing);

        System.out.println("ID del contratista: " + billingDto.getContractorId()
                + ":::::::::::::::::::::::::::::::::::::::::::::::::::::::");

        String companyName = contractorService.findContractorById(billingDto.getContractorId()).get().getCompany()
                .getName();
        System.out.println(
                "Nombre de la empresa: " + companyName + ":::::::::::::::::::::::::::::::::::::::::::::::::::::::");
        // Obtener el username del usuario asociado a la factura

        String userUsername = userService.findUserById(billingDto.getUserId().intValue()).get().getUsername();

        // Crear la notificación
        NotificationDto notificationDto = new NotificationDto(
                companyName,
                userUsername,
                "Se ha creado una nueva factura con ID: " + savedBilling.getId());

        // Enviar la notificación a través de WebSocket
        messagingTemplate.convertAndSend("/topic/notifications/" + userUsername, notificationDto);

        // Persistir la notificación en MongoDB
        Notification notification = new Notification(
                notificationDto.getSenderUsername(),
                notificationDto.getReceiverUsername(),
                notificationDto.getMessage(),
                LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        notificationRepository.save(notification);

        return ResponseEntity.status(HttpStatus.CREATED).body(billingMapper.toDto(savedBilling));
    }

    // Obtener una factura por ID
    @GetMapping("/{id}")
    public ResponseEntity<BillingDto> getBillingById(@PathVariable Long id) {
        return billingService.findBillingById(id)
                .map(billing -> ResponseEntity.ok(billingMapper.toDto(billing)))
                .orElseThrow(() -> new BillingNotFoundException("Factura no encontrada con ID: " + id));
    }

    // Actualizar una factura
    @PutMapping("/{id}")
    public ResponseEntity<BillingDto> updateBilling(@PathVariable Long id, @RequestBody BillingDto billingDto) {
        // Validación simple para el monto
        if (billingDto.getAmount() == null || billingDto.getAmount() <= 0) {
            throw new BadRequestException("El monto de la factura es obligatorio y debe ser mayor que cero.");
        }
        Billing billing = billingMapper.toEntity(billingDto);
        return billingService.updateBilling(id, billing)
                .map(updatedBilling -> ResponseEntity.ok(billingMapper.toDto(updatedBilling)))
                .orElseThrow(() -> new BillingNotFoundException("Factura no encontrada para actualizar con ID: " + id));
    }

    // Eliminar una factura
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBilling(@PathVariable Long id) {
        Optional<Billing> billingToDelete = billingService.findBillingById(id);
        return billingToDelete.map(billing -> {
            billingService.deleteBillingById(id); // Elimina la factura
            return ResponseEntity.ok("Borrado");// Devuelve la factura eliminada
        }).orElseThrow(() -> new BillingNotFoundException("Factura no encontrada para eliminar con ID: " + id));
    }

    // Obtener facturas por una lista de IDs
    @PostMapping("/by-ids")
    public ResponseEntity<List<BillingDto>> getBillingsByIds(@RequestBody List<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }

        List<Billing> billings = billingService.findBillingsByIds(ids);
        return ResponseEntity.ok(billingMapper.toDto(billings));
    }

    // Obtener facturas por ID de usuario
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BillingDto>> getBillingsByUserId(@PathVariable Long userId) {
        List<Billing> billings = billingService.findBillingsByUserId(userId);

        if (billings.isEmpty()) {
            throw new BillingNotFoundException("No se encontraron facturas para el usuario con ID: " + userId);
        }

        return ResponseEntity.ok(billingMapper.toDto(billings));
    }

}
