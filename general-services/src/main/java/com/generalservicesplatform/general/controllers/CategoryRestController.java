package com.generalservicesplatform.general.controllers;

import com.generalservicesplatform.general.model.Category;
import com.generalservicesplatform.general.dto.CategoryDto;
import com.generalservicesplatform.general.mapper.CategoryMapper;
import com.generalservicesplatform.general.service.impl.CategoryServiceImpl;
import com.generalservicesplatform.general.exceptions.CategoryNotFoundException;
import com.generalservicesplatform.general.exceptions.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categories")
public class CategoryRestController {

    @Autowired
    private CategoryServiceImpl categoryService;

    @Autowired
    private CategoryMapper categoryMapper; // Mapper de MapStruct

    // Obtener todas las categorías
    @GetMapping
    public ResponseEntity<List<CategoryDto>> getAllCategories() {
        List<Category> categories = categoryService.findAllCategories();
        return ResponseEntity.ok(categoryMapper.toDto(categories));
    }

    // Crear una nueva categoría
    @PostMapping
    public ResponseEntity<CategoryDto> createCategory(@RequestBody CategoryDto categoryDto) {
        // Validación simple para el nombre
        if (categoryDto.getName() == null || categoryDto.getName().trim().isEmpty()) {
            throw new BadRequestException("El nombre de la categoría es obligatorio.");
        }
        Category category = categoryMapper.toEntity(categoryDto);
        Category savedCategory = categoryService.saveCategory(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryMapper.toDto(savedCategory));
    }

    // Obtener una categoría por ID
    @GetMapping("/{id}")
    public ResponseEntity<CategoryDto> getCategoryById(@PathVariable Long id) {
        return categoryService.findCategoryById(id)
                .map(category -> ResponseEntity.ok(categoryMapper.toDto(category)))
                .orElseThrow(() -> new CategoryNotFoundException("Categoría no encontrada con ID: " + id));
    }

    // Actualizar una categoría
    @PutMapping("/{id}")
    public ResponseEntity<CategoryDto> updateCategory(@PathVariable Long id, @RequestBody CategoryDto categoryDto) {
        // Validación simple para el nombre
        if (categoryDto.getName() == null || categoryDto.getName().trim().isEmpty()) {
            throw new BadRequestException("El nombre de la categoría es obligatorio.");
        }
        Category category = categoryMapper.toEntity(categoryDto);
        return categoryService.updateCategory(id, category)
                .map(updatedCategory -> ResponseEntity.ok(categoryMapper.toDto(updatedCategory)))
                .orElseThrow(
                        () -> new CategoryNotFoundException("Categoría no encontrada para actualizar con ID: " + id));
    }

    // Eliminar una categoría
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) {
        Optional<Category> BorradoCategoryOptional = categoryService.findCategoryById(id);
        return BorradoCategoryOptional.map(category -> {
            categoryService.deleteCategoryById(id); // Elimina la categoría
            return ResponseEntity.ok("Borrado");// Devuelve la categoría eliminada
        }).orElseThrow(() -> new CategoryNotFoundException("Categoría no encontrada para eliminar con ID: " + id));
    }

    // Cambiar a POST y usar RequestBody
    @PostMapping("/by-ids")
    public ResponseEntity<List<CategoryDto>> getCategoriesByIds(@RequestBody List<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }

        List<Category> categories = categoryService.findCategoriesByIds(ids);
        return ResponseEntity.ok(categoryMapper.toDto(categories));
    }

}
