package com.generalservicesplatform.general.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.generalservicesplatform.general.model.UserRole;
import com.generalservicesplatform.general.model.UserRolePK;

public interface UserRoleRepository extends JpaRepository<UserRole, UserRolePK> {
}
