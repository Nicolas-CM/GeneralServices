package com.generalservicesplatform.general.controllers;

import com.generalservicesplatform.general.model.ServiceModel;
import com.generalservicesplatform.general.dto.ServiceDto;
import com.generalservicesplatform.general.mapper.ServiceMapper;
import com.generalservicesplatform.general.service.impl.ServiceServiceImpl;
import com.generalservicesplatform.general.exceptions.ServiceNotFoundException;
import com.generalservicesplatform.general.exceptions.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/services")
public class ServiceRestController {

    @Autowired
    private ServiceServiceImpl serviceService;

    @Autowired
    private ServiceMapper serviceMapper; // Mapper de MapStruct

    // Obtener todos los servicios
    @GetMapping
    public ResponseEntity<List<ServiceDto>> getAllServices() {
        List<ServiceModel> services = serviceService.findAllServices();
        return ResponseEntity.ok(serviceMapper.toDto(services));
    }

    // Crear un nuevo servicio
    @PostMapping
    public ResponseEntity<ServiceDto> createService(@RequestBody ServiceDto serviceDto) {
        // Validaciones de entrada
        if (serviceDto.getName() == null || serviceDto.getName().isEmpty()) {
            throw new BadRequestException("El nombre del servicio no puede estar vacío.");
        }

        ServiceModel service = serviceMapper.toEntity(serviceDto);
        ServiceModel savedService = serviceService.saveService(service);
        return ResponseEntity.status(HttpStatus.CREATED).body(serviceMapper.toDto(savedService));
    }

    // Obtener un servicio por ID
    @GetMapping("/{id}")
    public ResponseEntity<ServiceDto> getServiceById(@PathVariable Long id) {
        return serviceService.findServiceById(id)
                .map(service -> ResponseEntity.ok(serviceMapper.toDto(service)))
                .orElseThrow(() -> new ServiceNotFoundException("Servicio no encontrado con ID: " + id));
    }

    // Actualizar un servicio
    @PutMapping("/{id}")
    public ResponseEntity<ServiceDto> updateService(@PathVariable Long id, @RequestBody ServiceDto serviceDto) {
        // Validaciones de entrada
        if (serviceDto.getName() == null || serviceDto.getName().isEmpty()) {
            throw new BadRequestException("El nombre del servicio no puede estar vacío.");
        }

        ServiceModel service = serviceMapper.toEntity(serviceDto);
        return serviceService.updateService(id, service)
                .map(updatedService -> ResponseEntity.ok(serviceMapper.toDto(updatedService)))
                .orElseThrow(
                        () -> new ServiceNotFoundException("Servicio no encontrado para actualizar con ID: " + id));
    }

    // Eliminar un servicio
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteService(@PathVariable Long id) {
        Optional<ServiceModel> BorradoServiceOptional = serviceService.findServiceById(id);
        return BorradoServiceOptional.map(service -> {
            serviceService.deleteServiceById(id); // Elimina el servicio
            return ResponseEntity.ok("Borrado"); // Devuelve el servicio eliminado
        }).orElseThrow(() -> new ServiceNotFoundException("Servicio no encontrado para eliminar con ID: " + id));
    }

    // Obtener servicios por userId
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ServiceDto>> getServicesByUserId(@PathVariable Integer userId) {
        List<ServiceModel> services = serviceService.findServicesByUserId(userId);
        return ResponseEntity.ok(serviceMapper.toDto(services));
    }

    // Obtener servicios por una lista de IDs
    @PostMapping("/by-ids")
    public ResponseEntity<List<ServiceDto>> getServicesByIds(@RequestBody List<Long> ids) {
        List<ServiceModel> services = serviceService.findServicesByIds(ids);
        return ResponseEntity.ok(serviceMapper.toDto(services));
    }

}
