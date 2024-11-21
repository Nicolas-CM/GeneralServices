package com.generalservicesplatform.general.controllers;

import com.generalservicesplatform.general.model.Company;
import com.generalservicesplatform.general.model.ServiceModel;
import com.generalservicesplatform.general.model.User;

import com.generalservicesplatform.general.model.Request;
import com.generalservicesplatform.general.dto.CompanyDto;
import com.generalservicesplatform.general.mapper.CompanyMapper;
import com.generalservicesplatform.general.service.impl.CompanyServiceImpl;
import com.generalservicesplatform.general.service.impl.RequestServiceImpl;
import com.generalservicesplatform.general.service.impl.ServiceServiceImpl;
import com.generalservicesplatform.general.service.impl.UserServiceImpl;
import com.generalservicesplatform.general.exceptions.CompanyNotFoundException;
import com.generalservicesplatform.general.exceptions.RequestNotFoundException;
import com.generalservicesplatform.general.exceptions.ServiceNotFoundException;
import com.generalservicesplatform.general.exceptions.UserNotFoundException;
import com.generalservicesplatform.general.exceptions.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/companies")
public class CompanyRestController {

    @Autowired
    private CompanyServiceImpl companyService;

    @Autowired
    private CompanyMapper companyMapper; // Mapper de MapStruct

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private ServiceServiceImpl serviceService;

    @Autowired
    private RequestServiceImpl requestService;

    // Obtener todas las compañías
    @GetMapping
    public ResponseEntity<List<CompanyDto>> getAllCompanies() {
        List<Company> companies = companyService.findAllCompanies();
        return ResponseEntity.ok(companyMapper.toDto(companies));
    }

    // Crear una nueva compañía
    @PostMapping
    public ResponseEntity<CompanyDto> createCompany(@RequestBody CompanyDto companyDto) {

        // Validación simple para el nombre
        if (companyDto.getName() == null || companyDto.getName().trim().isEmpty()) {
            throw new BadRequestException("El nombre de la compañía es obligatorio.");
        }

        // Verificar si el nombre de la compañía ya existe
        if (companyService.findByName(companyDto.getName()).isPresent()) {
            throw new BadRequestException("El nombre de la compañía ya existe.");
        }

        Company company = companyMapper.toEntity(companyDto);
        Company savedCompany = companyService.saveCompany(company);
        return ResponseEntity.status(HttpStatus.CREATED).body(companyMapper.toDto(savedCompany));
    }

    // Obtener una compañía por ID
    @GetMapping("/{id}")
    public ResponseEntity<CompanyDto> getCompanyById(@PathVariable Long id) {
        return companyService.findCompanyById(id)
                .map(company -> ResponseEntity.ok(companyMapper.toDto(company)))
                .orElseThrow(() -> new CompanyNotFoundException("Compañía no encontrada con ID: " + id));
    }

    @GetMapping("/owner/{username}")
    public ResponseEntity<CompanyDto> getCompanyByUserUserName(@PathVariable String username) {
        Long userIdAsInteger = getUserId(username);

        Optional<Company> companyOptional = companyService.findByUserId(userIdAsInteger.intValue());
        return companyOptional.map(company -> ResponseEntity.ok(companyMapper.toDto(company)))
                .orElseThrow(() -> new CompanyNotFoundException(
                        "No se encontró una compañía para el userId: " + userIdAsInteger));
    }

    // Actualizar una compañía
    @PutMapping("/{id}")
    public ResponseEntity<CompanyDto> updateCompany(@PathVariable Long id, @RequestBody CompanyDto companyDto) {
        // Validación simple para el nombre
        if (companyDto.getName() == null || companyDto.getName().trim().isEmpty()) {
            throw new BadRequestException("El nombre de la compañía es obligatorio.");
        }
        Company company = companyMapper.toEntity(companyDto);
        return companyService.updateCompany(id, company)
                .map(updatedCompany -> ResponseEntity.ok(companyMapper.toDto(updatedCompany)))
                .orElseThrow(
                        () -> new CompanyNotFoundException("Compañía no encontrada para actualizar con ID: " + id));
    }

    // Eliminar una compañía
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCompany(@PathVariable Long id) {
        Optional<Company> BorradoCompanyOptional = companyService.findCompanyById(id);
        return BorradoCompanyOptional.map(company -> {
            companyService.deleteCompanyById(id); // Elimina la compañía
            return ResponseEntity.ok("Borrado"); // Devuelve la compañía eliminada
        }).orElseThrow(() -> new CompanyNotFoundException("Compañía no encontrada para eliminar con ID: " + id));
    }

    // Eliminar un servicio de una compañía
    @DeleteMapping("owner/{username}/services/{serviceId}")
    public ResponseEntity<String> deleteServiceFromCompany(@PathVariable String username,
            @PathVariable Long serviceId) {

        Long userIdAsInteger = getUserId(username);

        Optional<Company> companyOptional = companyService.findByUserId(userIdAsInteger.intValue());
        if (companyOptional.isEmpty()) {
            throw new CompanyNotFoundException("No se encontró una compañía para el userId: " + userIdAsInteger);
        }

        Optional<ServiceModel> serviceOptional = serviceService.findServiceById(serviceId);
        if (serviceOptional.isEmpty()) {
            throw new ServiceNotFoundException("No se encontró un servicio con el ID: " + serviceId);
        }

        companyService.deleteServiceFromCompany(companyOptional.get(), serviceOptional.get());
        return ResponseEntity.ok("Relación eliminada");
    }

    // Obtener compañías por ID del servicio
    @GetMapping("/services/{serviceId}")
    public ResponseEntity<List<CompanyDto>> getCompaniesByServiceId(@PathVariable Long serviceId) {
        List<Company> companies = companyService.findCompaniesByServiceId(serviceId);
        if (companies.isEmpty()) {
            throw new CompanyNotFoundException("No se encontraron compañías con el ID del servicio: " + serviceId);
        }
        List<CompanyDto> companyDtos = companies.stream()
                .map(companyMapper::toDto)
                .toList();
        return ResponseEntity.ok(companyDtos);
    }

    // Obtener compañías por una lista de IDs
    @PostMapping("/by-ids")
    public ResponseEntity<List<CompanyDto>> getCompaniesByIds(@RequestBody List<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }

        List<Company> companies = companyService.findCompaniesByIds(ids);
        return ResponseEntity.ok(companyMapper.toDto(companies));
    }

    public Long getUserId(String username) {
        // Encuentra el usuario por su username
        Optional<User> userOptional = userService.findByUsername(username);
        if (userOptional.isEmpty()) {
            throw new UserNotFoundException("No se encontró un usuario con el nombre de usuario: " + username);
        }
        return userOptional.get().getId().longValue();

    }

    // Obtener el username del dueño de la empresa a partir de una solicitudId
    @GetMapping("/owner/username/by-solicitud/{solicitudId}")
    public ResponseEntity<String> getCompanyOwnerUsernameBySolicitudId(@PathVariable Long solicitudId) {
        // Encuentra la solicitud por su ID
        Request request = requestService.findRequestById(solicitudId)
                .orElseThrow(
                        () -> new RequestNotFoundException("No se encontró una solicitud con el ID: " + solicitudId));

        // Encuentra la compañía asociada a la solicitud
        Company company = request.getCompany();
        if (company == null) {
            throw new CompanyNotFoundException("No se encontró una compañía para la solicitudId: " + solicitudId);
        }

        // Encuentra el usuario dueño de la compañía
        User owner = company.getUser();
        if (owner == null) {
            throw new UserNotFoundException(
                    "No se encontró un usuario dueño para la compañía con ID: " + company.getId());
        }

        // Devuelve el username del dueño de la compañía
        return ResponseEntity.ok(owner.getUsername());
    }

}
