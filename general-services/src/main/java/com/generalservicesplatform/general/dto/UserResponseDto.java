package com.generalservicesplatform.general.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

//PARA ENVIAR LOS USUARIOS DEL BACKEND AL FRONTEND
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {
    private Integer id;
    private String username;
    private String name;
    private String lastName;
    private String email;
    private String password;
    private List<RoleDto> roles;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String country;
    private String zipCode;
    protected Boolean status;
    private CompanyDto company;
}
