package com.generalservicesplatform.general.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//PARA RECIBIR LOS USUARIOS DEL FRONTEND AL BACKEND
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDto {
    private Integer id;
    private String username;
    private String password; // Asegúrate de manejar la seguridad de las contraseñas
    private String email;
    private String name;
    private String lastName;
    private String phone;
    private String address;
    private String city;
    private String state;
    private Boolean status;
    private String country;
    private String zipCode;
    private Integer roleId; // Id del Rol
}