package com.generalservicesplatform.general.mapper;

import com.generalservicesplatform.general.dto.UserRequestDto;
import com.generalservicesplatform.general.model.User;
import com.generalservicesplatform.general.model.UserRole;
import com.generalservicesplatform.general.model.Role;
import com.generalservicesplatform.general.dto.RoleDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import java.util.stream.Collectors;

// PARA RECIBIR EL USER DESDE EL FRONTEND AL BACKEND

@Mapper(componentModel = "spring")
public interface UserRequestMapper {

    User toEntity(UserRequestDto userDto);

}
