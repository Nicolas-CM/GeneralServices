package com.generalservicesplatform.general.mapper;

import com.generalservicesplatform.general.model.User;
import com.generalservicesplatform.general.dto.UserResponseDto;
import com.generalservicesplatform.general.model.UserRole;
import com.generalservicesplatform.general.model.Role;
import com.generalservicesplatform.general.dto.RoleDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import java.util.stream.Collectors;

////PARA ENVIAR LOS USUARIOS DEL BACKEND AL FRONTEND
@Mapper(componentModel = "spring")
public interface UserResponseMapper {

    @Mapping(source = "roles", target = "roles", qualifiedByName = "mapRoles")
    UserResponseDto toDto(User user);

    List<UserResponseDto> toDto(List<User> users);

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

}
