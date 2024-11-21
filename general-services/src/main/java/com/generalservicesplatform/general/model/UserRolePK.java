package com.generalservicesplatform.general.model;

import java.io.Serializable;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Embeddable
@Data // Genera getters, setters, toString, equals, y hashCode
@NoArgsConstructor // Genera un constructor sin argumentos
@AllArgsConstructor // Genera un constructor con todos los argumentos
public class UserRolePK implements Serializable {

    @Column(name = "user_id", insertable = false, updatable = false)
    private Integer userId;

    @Column(name = "role_id", insertable = false, updatable = false)
    private Integer roleId;
}
