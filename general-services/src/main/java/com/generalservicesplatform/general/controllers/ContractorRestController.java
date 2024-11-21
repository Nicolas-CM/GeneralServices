package com.generalservicesplatform.general.controllers;

import com.generalservicesplatform.general.model.Company;
import com.generalservicesplatform.general.model.Contractor;
import com.generalservicesplatform.general.model.User;
import com.generalservicesplatform.general.dto.CompanyDto;
import com.generalservicesplatform.general.dto.ContractorDto;
import com.generalservicesplatform.general.mapper.CompanyMapper;
import com.generalservicesplatform.general.mapper.ContractorMapper;
import com.generalservicesplatform.general.service.impl.CompanyServiceImpl;
import com.generalservicesplatform.general.service.impl.ContractorServiceImpl;
import com.generalservicesplatform.general.service.impl.UserServiceImpl;
import com.generalservicesplatform.general.exceptions.ContractorNotFoundException;
import com.generalservicesplatform.general.exceptions.UserNotFoundException;
import com.generalservicesplatform.general.exceptions.BadRequestException;
import com.generalservicesplatform.general.exceptions.CompanyNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/contractors")
public class ContractorRestController {

    @Autowired
    private ContractorServiceImpl contractorService;

    @Autowired
    private ContractorMapper contractorMapper; // Mapper de MapStruct

    @Autowired
    private CompanyServiceImpl companyService;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private CompanyMapper companyMapper;

    // Obtener todos los contratistas
    @GetMapping
    public ResponseEntity<List<ContractorDto>> getAllContractors() {
        List<Contractor> contractors = contractorService.findAllContractors();
        List<Contractor> activeContractors = contractors.stream()
                .filter(Contractor::getStatus)
                .collect(Collectors.toList());
        return ResponseEntity.ok(contractorMapper.toDto(activeContractors));
    }

    // Crear un nuevo contratista
    @PostMapping
    public ResponseEntity<ContractorDto> createContractor(@RequestBody ContractorDto contractorDto) {
        // Validación simple para el nombre
        if (contractorDto.getName() == null || contractorDto.getName().trim().isEmpty()) {
            throw new BadRequestException("El nombre del contratista es obligatorio.");
        }
        Contractor contractor = contractorMapper.toEntity(contractorDto);
        Contractor savedContractor = contractorService.saveContractor(contractor);
        return ResponseEntity.status(HttpStatus.CREATED).body(contractorMapper.toDto(savedContractor));
    }

    // Obtener un contratista por ID
    @GetMapping("/{id}")
    public ResponseEntity<ContractorDto> getContractorById(@PathVariable Long id) {
        return contractorService.findContractorById(id)
                .map(contractor -> ResponseEntity.ok(contractorMapper.toDto(contractor)))
                .orElseThrow(() -> new ContractorNotFoundException("Contratista no encontrado con ID: " + id));
    }

    // Actualizar un contratista
    @PutMapping("/{id}")
    public ResponseEntity<ContractorDto> updateContractor(@PathVariable Long id,
            @RequestBody ContractorDto contractorDto) {
        // Validación simple para el nombre
        if (contractorDto.getName() == null || contractorDto.getName().trim().isEmpty()) {
            throw new BadRequestException("El nombre del contratista es obligatorio.");
        }
        Contractor contractor = contractorMapper.toEntity(contractorDto);
        return contractorService.updateContractor(id, contractor)
                .map(updatedContractor -> ResponseEntity.ok(contractorMapper.toDto(updatedContractor)))
                .orElseThrow(() -> new ContractorNotFoundException(
                        "Contratista no encontrado para actualizar con ID: " + id));
    }

    // Actualizar un contratista
    @PutMapping("available/{id}")
    public ResponseEntity<ContractorDto> updateContractorAvailability(@PathVariable Long id,
            @RequestBody ContractorDto contractorDto) {
        // Validación simple para el nombre
        if (contractorDto.getAvailable() == null) {
            throw new BadRequestException("El campo de disponibilidad del contratista es obligatorio.");
        }
        Contractor contractor = contractorMapper.toEntity(contractorDto);
        return contractorService.updateContractorAvailability(id, contractor)
                .map(updatedContractor -> ResponseEntity.ok(contractorMapper.toDto(updatedContractor)))
                .orElseThrow(() -> new ContractorNotFoundException(
                        "Contratista no encontrado para actualizar con ID: " + id));
    }


    // Eliminar un contratista
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteContractor(@PathVariable Long id) {
        Optional<Contractor> BorradoContractorOptional = contractorService.findContractorById(id);
        return BorradoContractorOptional.map(contractor -> {
            contractorService.deleteContractorById(id); // Elimina el contratista
            return ResponseEntity.ok("Borrado");// Devuelve el contratista eliminado
        }).orElseThrow(() -> new ContractorNotFoundException("Contratista no encontrado para eliminar con ID: " + id));
    }

    // Cambiar a POST y usar RequestBody
    @PostMapping("/by-ids")
    public ResponseEntity<List<ContractorDto>> getContractorsByIds(@RequestBody List<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }

        List<Contractor> contractors = contractorService.findContractorsByIds(ids);
        return ResponseEntity.ok(contractorMapper.toDto(contractors));
    }

    // Obtener contratistas por userId del dueño de la compañía
    @GetMapping("/owner/{username}")
    public ResponseEntity<List<ContractorDto>> getContractorsByUserId(@PathVariable String username) {

        // Encuentra el usuario por su username
        Optional<User> userOptional = userService.findByUsername(username);
        if (userOptional.isEmpty()) {
            throw new UserNotFoundException("No se encontró un usuario con el nombre de usuario: " + username);
        }

        // Encuentra la compañía por el userId del dueño
        Integer userId = userOptional.get().getId();
        Long userIdAsInteger = userId.longValue();

        Optional<Company> companyOptional = companyService.findByUserId(userId);
        if (companyOptional.isEmpty()) {
            throw new CompanyNotFoundException("No se encontró una compañía para el userId: " + userId);
        }

        // Encuentra los contratistas por el companyId
        Long companyId = companyOptional.get().getId();
        List<Contractor> contractors = contractorService.findByCompanyId(companyId);
        List<Contractor> activeContractors = contractors.stream()
                .filter(Contractor::getStatus)
                .collect(Collectors.toList());
        return ResponseEntity.ok(contractorMapper.toDto(activeContractors));
    }


     // Obtener contratistas por userId del dueño de la compañía
     @GetMapping("/available/{username}")
     public ResponseEntity<List<ContractorDto>> getContractorsAvailableByUserId(@PathVariable String username) {
 
         // Encuentra el usuario por su username
         Optional<User> userOptional = userService.findByUsername(username);
         if (userOptional.isEmpty()) {
             throw new UserNotFoundException("No se encontró un usuario con el nombre de usuario: " + username);
         }
 
         // Encuentra la compañía por el userId del dueño
         Integer userId = userOptional.get().getId();
         Long userIdAsInteger = userId.longValue();
 
         Optional<Company> companyOptional = companyService.findByUserId(userId);
         if (companyOptional.isEmpty()) {
             throw new CompanyNotFoundException("No se encontró una compañía para el userId: " + userId);
         }
 
         // Encuentra los contratistas por el companyId
         Long companyId = companyOptional.get().getId();
         List<Contractor> contractors = contractorService.findByCompanyId(companyId);
         List<Contractor> activeContractors = contractors.stream()
                 .filter(Contractor::getStatus)
                 .collect(Collectors.toList());
        List<Contractor> availableContractors = activeContractors.stream()
                .filter(Contractor::getAvailable)
                .collect(Collectors.toList());
         return ResponseEntity.ok(contractorMapper.toDto(availableContractors));
     }

    // Obtener una compañía por contractorId
    @GetMapping("/company-by-contractor/{contractorId}")
    public ResponseEntity<CompanyDto> getCompanyByContractorId(@PathVariable Long contractorId) {
        // Encuentra el contratista por el contractorId
        System.out.println("contractorId: " + contractorId);
        Contractor contractor = contractorService.findContractorById(contractorId)
                .orElseThrow(
                        () -> new ContractorNotFoundException("Contratista no encontrado con ID: " + contractorId));

        // Encuentra la compañía asociada al contratista
        Company company = contractor.getCompany();
        if (company == null) {
            throw new CompanyNotFoundException("No se encontró una compañía para el contractorId: " + contractorId);
        }

        // Convierte la compañía a DTO y devuelve la respuesta
        CompanyDto companyDto = companyMapper.toDto(company);
        return ResponseEntity.ok(companyDto);
    }
}
