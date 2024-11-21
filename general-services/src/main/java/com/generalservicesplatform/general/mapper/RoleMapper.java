package com.generalservicesplatform.general.mapper;

import com.generalservicesplatform.general.dto.RoleDto;
import com.generalservicesplatform.general.model.Permission;
import com.generalservicesplatform.general.model.Role;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = { PermissionMapper.class })
public interface RoleMapper {
    @Mapping(target = "selectedPermissions", source = "permissions", qualifiedByName = "permissionsToIds")
    RoleDto toDto(Role role);

    @Mapping(target = "permissions", source = "selectedPermissions", qualifiedByName = "idsToPermissions")
    Role toEntity(RoleDto roleDto);

    List<RoleDto> toDto(List<Role> roles);

    List<Role> toEntity(List<RoleDto> roleDtos);

    @Named("permissionsToIds")
    static List<Integer> permissionsToIds(List<Permission> permissions) {
        if (permissions == null) {
            return null;
        }
        return permissions.stream()
                .map(Permission::getId)
                .collect(Collectors.toList());
    }

    @Named("idsToPermissions")
    static List<Permission> idsToPermissions(List<Integer> ids) {
        if (ids == null) {
            return null;
        }

        return ids.stream()
                .map(id -> {
                    Permission permission = new Permission();
                    permission.setId(id);
                    return permission;
                })
                .collect(Collectors.toList());
    }
}