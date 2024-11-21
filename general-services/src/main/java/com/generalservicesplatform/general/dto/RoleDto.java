package com.generalservicesplatform.general.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleDto {
    private Integer id;
    private String name;
    private String description;
    private List<Integer> selectedPermissions; // IDs de los permisos seleccionados
}
