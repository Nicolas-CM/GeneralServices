package com.generalservicesplatform.general.controllers;

import com.generalservicesplatform.general.model.Company;
import com.generalservicesplatform.general.model.Contractor;
import com.generalservicesplatform.general.model.Notification;
import com.generalservicesplatform.general.model.User;
import com.generalservicesplatform.general.model.Request;
import com.generalservicesplatform.general.dto.RequestDto;
import com.generalservicesplatform.general.dto.NotificationDto;
import com.generalservicesplatform.general.mapper.RequestMapper;
import com.generalservicesplatform.general.service.impl.CompanyServiceImpl;
import com.generalservicesplatform.general.service.impl.RequestServiceImpl;
import com.generalservicesplatform.general.service.impl.UserServiceImpl;
import com.generalservicesplatform.general.service.interfaces.ContractorService;
import com.generalservicesplatform.general.exceptions.RequestNotFoundException;
import com.generalservicesplatform.general.exceptions.UserNotFoundException;
import com.generalservicesplatform.general.exceptions.BadRequestException;
import com.generalservicesplatform.general.exceptions.CompanyNotFoundException;
import com.generalservicesplatform.general.repository.NotificationRepository;

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
@RequestMapping("/api/requests")
public class RequestRestController {

    @Autowired
    private RequestServiceImpl requestService;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private RequestMapper requestMapper; // Mapper de MapStruct

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private CompanyServiceImpl companyService;

    @Autowired
    private ContractorService contractorService;
    @Autowired
    private NotificationRepository notificationRepository;

    // Obtener todas las solicitudes
    // Obtener todas las solicitudes
    @GetMapping
    public ResponseEntity<List<RequestDto>> getAllRequests() {
        List<Request> requests = requestService.findAllRequests();
        return ResponseEntity.ok(requestMapper.toDto(requests));
    }

    @PostMapping
    public ResponseEntity<RequestDto> createRequest(@RequestBody RequestDto requestDto) {
        // Buscar al usuario asociado con la solicitud
        User user = userService.findByUsername(requestDto.getUsername())
                .orElseThrow(() -> new UserNotFoundException(
                        "Usuario no encontrado con username: " + requestDto.getUsername()));

        // Crear la solicitud y guardarla
        Request request = requestMapper.toEntity(requestDto);
        request.setContractor(null); // Asignar contractor a null inicialmente
        request.setUser(user);
        Request savedRequest = requestService.saveRequest(request);

        String userUsername = user.getUsername();

        // Obtener la compañía asociada con la solicitud
        Company company = companyService.findCompanyById(requestDto.getCompanyId())
                .orElseThrow(() -> new CompanyNotFoundException(
                        "Compañía no encontrada con ID: " + requestDto.getCompanyId()));
        String companyOwnerUsername = company.getUser().getUsername();

        // Crear la notificación
        NotificationDto notificationDto = new NotificationDto(
                userUsername, // El username del usuario que crea la solicitud
                companyOwnerUsername, // El username del dueño de la empresa
                "Tienes una nueva solicitud en tu empresa, revísala en la pestaña Solicitudes");

        // Enviar la notificación a través de WebSocket
        messagingTemplate.convertAndSend("/topic/notifications/" + companyOwnerUsername, notificationDto);

        // Persistir la notificación en MongoDB
        Notification notification = new Notification(
                notificationDto.getSenderUsername(),
                notificationDto.getReceiverUsername(),
                notificationDto.getMessage(),
                LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        notificationRepository.save(notification); // Guardamos la notificación en la base de datos MongoDB

        return ResponseEntity.status(HttpStatus.CREATED).body(requestMapper.toDto(savedRequest));
    }

    // Obtener solicitudes por userId
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<RequestDto>> getRequestsByUserId(@PathVariable Long userId) {
        List<Request> requests = requestService.findRequestsByUserId(userId);
        if (requests.isEmpty()) {
            throw new RequestNotFoundException("No se encontraron solicitudes para este usuario");
        }
        return ResponseEntity.ok(requestMapper.toDto(requests));
    }

    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<RequestDto>> getRequestsByCompanyId(@PathVariable Long companyId) {
        List<Request> requests = requestService.findRequestsByCompanyId(companyId);
        if (requests.isEmpty()) {
            throw new RequestNotFoundException("No se encontraron solicitudes para esta compañía");
        }
        return ResponseEntity.ok(requestMapper.toDto(requests));
    }

    // Obtener solicitudes por contractorId
    @GetMapping("/contractor/{contractorId}")
    public ResponseEntity<List<RequestDto>> getRequestsByContractorId(@PathVariable Long contractorId) {
        List<Request> requests = requestService.findRequestsByContractorId(contractorId);
        if (requests.isEmpty()) {
            throw new RequestNotFoundException("No se encontraron solicitudes para este contratista");
        }
        return ResponseEntity.ok(requestMapper.toDto(requests));
    }

    // Obtener una solicitud por ID
    @GetMapping("/{id}")
    public ResponseEntity<RequestDto> getRequestById(@PathVariable Long id) {
        return requestService.findRequestById(id)
                .map(request -> ResponseEntity.ok(requestMapper.toDto(request)))
                .orElseThrow(() -> new RequestNotFoundException("Solicitud no encontrada"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RequestDto> updateRequest(@PathVariable Long id, @RequestBody RequestDto requestDto) {
        // Aquí puedes agregar validaciones si es necesario

        // Convertir el DTO a entidad
        Request request = requestMapper.toEntity(requestDto);

        // Buscar la solicitud real a actualizar
        Request realRequest = requestService.findRequestById(id)
                .orElseThrow(() -> new RequestNotFoundException("Solicitud no encontrada"));

        // Obtener los usernames del usuario y el dueño de la empresa
        String userUsername = userService.findUserById(realRequest.getUser().getId()).get().getUsername();
        String companyOwnerUsername = realRequest.getCompany().getUser().getUsername();

        // Crear y enviar la notificación si el estado es "Cancelada"
        if ("Cancelada".equals(requestDto.getStatus())) {
            NotificationDto notificationDto = new NotificationDto(
                    userUsername,
                    companyOwnerUsername,
                    "El usuario " + userUsername + " ha cancelado la solicitud " + realRequest.getId());

            // Enviar la notificación por WebSocket
            messagingTemplate.convertAndSend("/topic/notifications/" + companyOwnerUsername, notificationDto);

            // Persistir la notificación en MongoDB
            Notification notification = new Notification(
                    notificationDto.getSenderUsername(),
                    notificationDto.getReceiverUsername(),
                    notificationDto.getMessage(),
                    LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
            notificationRepository.save(notification); // Guardar la notificación en MongoDB
        }

        // Actualizar la solicitud
        return requestService.updateRequest(id, request)
                .map(updatedRequest -> ResponseEntity.ok(requestMapper.toDto(updatedRequest)))
                .orElseThrow(
                        () -> new RequestNotFoundException("Solicitud no encontrada para actualizar"));
    }

    @PutMapping("/company/{id}")
    public ResponseEntity<RequestDto> updateRequestFromCompany(@PathVariable Long id,
            @RequestBody RequestDto requestDto) {
        // Aquí puedes agregar validaciones si es necesario

        // Convertir el DTO a entidad Request
        Request request = requestMapper.toEntity(requestDto);

        // Buscar la solicitud real a actualizar
        Request realRequest = requestService.findRequestById(id)
                .orElseThrow(() -> new RequestNotFoundException("Solicitud no encontrada"));

        // Obtener el nombre de usuario del usuario asociado con la solicitud
        String userUsername = userService.findUserById(realRequest.getUser().getId())
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado"))
                .getUsername();

        // Crear la notificación
        NotificationDto notificationDto = new NotificationDto(
                realRequest.getCompany().getName(), // Remitente
                userUsername, // Receptor
                "La Compañía " + realRequest.getCompany().getName() + " ha cancelado tu solicitud "
                        + realRequest.getId());

        // Enviar la notificación a través de WebSocket
        messagingTemplate.convertAndSend("/topic/notifications/" + userUsername, notificationDto);

        // Persistir la notificación en MongoDB
        Notification notification = new Notification(
                notificationDto.getSenderUsername(),
                notificationDto.getReceiverUsername(),
                notificationDto.getMessage(),
                LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        notificationRepository.save(notification); // Guardar la notificación en MongoDB

        // Actualizar la solicitud en la base de datos
        return requestService.updateRequest(id, request)
                .map(updatedRequest -> ResponseEntity.ok(requestMapper.toDto(updatedRequest)))
                .orElseThrow(() -> new RequestNotFoundException("Solicitud no encontrada para actualizar"));
    }

    @PutMapping("assign/{id}")
    public ResponseEntity<RequestDto> assignContractorToRequest(@PathVariable Long id,
            @RequestBody RequestDto requestDto) {
        // Aquí puedes agregar validaciones si es necesario

        // Convertir el DTO a entidad Request
        Request request = requestMapper.toEntity(requestDto);

        // Buscar la solicitud en la base de datos
        Optional<Request> requestOptional = requestService.findRequestById(id);

        if (requestDto.getContractorId() != null) {
            if (requestOptional.isEmpty()) {
                throw new RequestNotFoundException("Solicitud no encontrada con ID: " + id);
            } else {
                // Buscar el contratista por ID
                System.out.println("NO ASIGNADO Y ID RECIBIDO DEL FRONT" + requestDto.getContractorId());
                Contractor contractor = contractorService.findContractorById(requestDto.getContractorId())
                        .orElseThrow(() -> new BadRequestException(
                                "Contratista no encontrado con ID: " + requestDto.getContractorId()));

                // Marcar al contratista como no disponible

                System.out.println("Contratistaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa: " + contractor.getName());
                System.out.println("ASIGNADO ASGINADO");
                contractor.setAvailable(false);

                // Asignar el contratista a la solicitud
                request.setContractor(contractor);

                System.out.println("CONTRATISTA ASIGNADO A LA SOLICITUD " + request.getContractor().getName()+ "\n\n\n\n\n");

                // Obtener el username del dueño de la compañía
                String companyOwnerUsername = requestOptional.get().getCompany().getUser().getUsername();
                // Obtener el userId del usuario asociado a la solicitud
                Long userId = requestOptional.get().getUser().getId().longValue();

                // Buscar al usuario asociado a la solicitud
                User user = userService.findUserById(userId.intValue())
                        .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado con ID: " + userId));

                // Crear la notificación
                NotificationDto notificationDto = new NotificationDto(
                        companyOwnerUsername, // Remitente
                        user.getUsername(), // Receptor
                        "Se ha asignado el contratista " + contractor.getName() + " a su solicitud " + id);

                // Enviar la notificación por WebSocket
                messagingTemplate.convertAndSend("/topic/notifications/" + user.getUsername(), notificationDto);

                // Persistir la notificación en MongoDB
                Notification notification = new Notification(
                        notificationDto.getSenderUsername(),
                        notificationDto.getReceiverUsername(),
                        notificationDto.getMessage(),
                        LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
                notificationRepository.save(notification); // Guardar la notificación en MongoDB
            }
        }

        // Actualizar la solicitud en la base de datos
        return requestService.assignContractorToRequest(id, request)
                .map(updatedRequest -> ResponseEntity.ok(requestMapper.toDto(updatedRequest)))
                .orElseThrow(() -> new RequestNotFoundException("Solicitud no encontrada para actualizar"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRequest(@PathVariable Long id) {
        Optional<Request> requestOptional = requestService.findRequestById(id);
        return requestOptional.map(request -> {
            // Obtener el username del dueño de la compañía
            String companyOwnerUsername = request.getCompany().getUser().getUsername();
            // Obtener el userId del usuario asociado a la solicitud
            Long userId = request.getUser().getId().longValue();

            // Buscar al usuario asociado a la solicitud
            User user = userService.findUserById(userId.intValue())
                    .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado con ID: " + userId));

            // Crear la notificación
            NotificationDto notificationDto = new NotificationDto(
                    companyOwnerUsername, // Remitente
                    user.getUsername(), // Receptor
                    "Su solicitud " + id + " con " + request.getCompany().getName()
                            + " ha sido rechazada. Por favor intenta con otra compañía");

            // Enviar la notificación por WebSocket
            messagingTemplate.convertAndSend("/topic/notifications/" + user.getUsername(), notificationDto);

            // Persistir la notificación en MongoDB
            Notification notification = new Notification(
                    notificationDto.getSenderUsername(),
                    notificationDto.getReceiverUsername(),
                    notificationDto.getMessage(),
                    LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
            notificationRepository.save(notification); // Guardar la notificación en MongoDB

            // Eliminar la solicitud
            requestService.deleteRequestById(id);

            return ResponseEntity.ok("Solicitud eliminada y notificación enviada"); // Devuelve el mensaje de éxito
        }).orElseThrow(() -> new RequestNotFoundException("Solicitud no encontrada para eliminar con ID: " + id));
    }

    // Obtener solicitudes por una lista de IDs
    @PostMapping("/by-ids")
    public ResponseEntity<List<RequestDto>> getRequestsByIds(@RequestBody List<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }

        List<Request> requests = requestService.findRequestsByIds(ids);
        return ResponseEntity.ok(requestMapper.toDto(requests));
    }

    @GetMapping("company/owner/{username}")
    public ResponseEntity<List<RequestDto>> getRequestByUserUserName(@PathVariable String username) {
        Long userIdAsInteger = getUserId(username);

        Optional<Company> companyOptional = companyService.findByUserId(userIdAsInteger.intValue());
        if (companyOptional.isEmpty()) {
            throw new CompanyNotFoundException("No se encontró una compañía para el userId: " + userIdAsInteger);
        }

        // Encuentra los contratistas por el companyId
        Long companyId = companyOptional.get().getId();

        List<Request> requests = requestService.findRequestsByCompanyId(companyId);

        System.out.println("\n \n\nAquiiiiiiiiiiiiiii");

        for (Request request : requests) {
            System.out.println("Request ID: " + request.getId());
            System.out.println("Service ID: " + request.getService().getId());
            System.out.println("Company ID: " + request.getCompany().getId());
            System.out.println("Contractor ID: "
                    + (request.getContractor() != null ? request.getContractor().getId() : "No Contractor"));
            System.out.println("User ID: " + request.getUser().getId());
            System.out.println("Date: " + request.getDate());
            System.out.println("Status: " + request.getStatus());
            System.out.println("Description: " + request.getDescription());
            System.out.println("----------");
        }

        if (requests.isEmpty()) {
            throw new RequestNotFoundException("No se encontraron solicitudes para esta compañía");
        }

        return ResponseEntity.ok(requestMapper.toDto(requests));

    }

    public Long getUserId(String username) {
        // Encuentra el usuario por su username
        Optional<User> userOptional = userService.findByUsername(username);
        if (userOptional.isEmpty()) {
            throw new UserNotFoundException("No se encontró un usuario con el nombre de usuario: " + username);
        }
        return userOptional.get().getId().longValue();

    }

}
