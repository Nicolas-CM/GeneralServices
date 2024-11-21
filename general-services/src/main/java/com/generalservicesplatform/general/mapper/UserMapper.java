package com.generalservicesplatform.general.mapper;

import com.generalservicesplatform.general.model.User;
import com.generalservicesplatform.general.dto.UserDto;
import com.generalservicesplatform.general.model.UserRole;
import com.generalservicesplatform.general.model.Role;
import com.generalservicesplatform.general.dto.RoleDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(source = "roles", target = "roles", qualifiedByName = "mapRoles")
    UserDto toDto(User user);

    @Mapping(source = "roles", target = "roles", qualifiedByName = "mapRolesToEntity")
    User toEntity(UserDto userDto);

    List<UserDto> toDto(List<User> users);

    // Método personalizado para mapear roles
    @Named("mapRoles")
    default List<RoleDto> mapRoles(List<UserRole> roles) {
        return roles.stream().map(userRole -> {
            RoleDto roleDto = new RoleDto();
            roleDto.setId(userRole.getRole().getId());
            roleDto.setName(userRole.getRole().getName());
            roleDto.setDescription(userRole.getRole().getDescription());
            return roleDto;
        }).collect(Collectors.toList());
    }

    @Named("mapRolesToEntity")
    default List<UserRole> mapRolesToEntity(List<RoleDto> roles) {
        return roles.stream().map(roleDto -> {
            UserRole userRole = new UserRole();
            Role role = new Role();
            role.setId(roleDto.getId());
            role.setName(roleDto.getName());
            userRole.setRole(role);
            return userRole;
        }).collect(Collectors.toList());
    }
}
