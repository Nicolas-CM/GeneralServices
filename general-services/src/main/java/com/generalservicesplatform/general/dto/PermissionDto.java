package com.generalservicesplatform.general.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PermissionDto {
    private Integer id;
    private String name;
    private String resource;
    private List<Integer> roleIds; // Lista de IDs de roles asociados
}
