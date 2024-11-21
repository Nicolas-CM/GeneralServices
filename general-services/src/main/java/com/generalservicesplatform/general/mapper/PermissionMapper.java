package com.generalservicesplatform.general.mapper;

import com.generalservicesplatform.general.dto.PermissionDto;
import com.generalservicesplatform.general.model.Permission;
import com.generalservicesplatform.general.model.Role;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    @Mapping(source = "roles", target = "roleIds", qualifiedByName = "rolesToIds")
    PermissionDto toDto(Permission permission);

    @Mapping(source = "roleIds", target = "roles", qualifiedByName = "idsToRoles")
    Permission toEntity(PermissionDto permissionDto);

    List<PermissionDto> toDto(List<Permission> permissions);

    List<Permission> toEntity(List<PermissionDto> permissionDtos);

    @Named("rolesToIds")
    static List<Integer> rolesToIds(List<Role> roles) {
        if (roles == null) {
            return null;
        }
        return roles.stream()
                .map(Role::getId)
                .collect(Collectors.toList());
    }

    @Named("idsToRoles")
    static List<Role> idsToRoles(List<Integer> ids) {
        if (ids == null) {
            return null;
        }

        return ids.stream()
                .map(id -> {
                    Role role = new Role();
                    role.setId(id);
                    return role;
                })
                .collect(Collectors.toList());
    }
}