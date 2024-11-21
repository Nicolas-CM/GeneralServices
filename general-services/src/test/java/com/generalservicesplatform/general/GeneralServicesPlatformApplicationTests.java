/*
 * 
 * package com.generalservicesplatform.general;
 * 
 * import static org.junit.jupiter.api.Assertions.assertEquals;
 * import static org.junit.jupiter.api.Assertions.assertThrows;
 * import static org.junit.jupiter.api.Assertions.assertTrue;
 * import static org.mockito.ArgumentMatchers.any;
 * import static org.mockito.Mockito.*;
 * 
 * import com.generalservicesplatform.general.model.Permission;
 * import com.generalservicesplatform.general.model.Role;
 * import com.generalservicesplatform.general.model.User;
 * import com.generalservicesplatform.general.repository.PermissionRepository;
 * import com.generalservicesplatform.general.repository.RoleRepository;
 * import com.generalservicesplatform.general.repository.UserRepository;
 * import
 * com.generalservicesplatform.general.service.impl.PermissionServiceImpl;
 * import com.generalservicesplatform.general.service.impl.RoleServiceImpl;
 * import com.generalservicesplatform.general.service.impl.UserServiceImpl;
 * import org.junit.jupiter.api.BeforeEach;
 * import org.junit.jupiter.api.Test;
 * import org.mockito.InjectMocks;
 * import org.mockito.Mock;
 * import org.mockito.MockitoAnnotations;
 * 
 * import java.util.Arrays;
 * import java.util.Collections;
 * import java.util.List;
 * import java.util.Optional;
 * 
 * class GeneralServicesPlatformApplicationTests {
 * 
 * @Mock
 * private RoleRepository roleRepository;
 * 
 * @InjectMocks
 * private RoleServiceImpl roleService;
 * 
 * @BeforeEach
 * public void setup() {
 * MockitoAnnotations.openMocks(this);
 * }
 * 
 * @Test
 * void testSaveRole_Success() {
 * // Arrange
 * Role role = new Role();
 * role.setId(1);
 * role.setName("Admin");
 * role.setDescription("Administrador del sistema");
 * 
 * when(roleRepository.save(any(Role.class))).thenReturn(role);
 * 
 * // Act
 * Role savedRole = roleService.saveRole(role);
 * 
 * // Assert
 * assertEquals(role.getId(), savedRole.getId());
 * assertEquals(role.getName(), savedRole.getName());
 * assertEquals(role.getDescription(), savedRole.getDescription());
 * }
 * 
 * @Test
 * void testSaveRole_NullRole() {
 * // Arrange
 * Role role = null;
 * 
 * when(roleRepository.save(any(Role.class))).thenThrow(new
 * IllegalArgumentException("Role cannot be null"));
 * 
 * // Act & Assert
 * IllegalArgumentException exception =
 * assertThrows(IllegalArgumentException.class, () -> {
 * roleService.saveRole(role);
 * });
 * assertEquals("Role cannot be null", exception.getMessage());
 * }
 * 
 * @Test
 * void testFindById_Success() {
 * // Arrange
 * Role role = new Role();
 * role.setId(1);
 * role.setName("Admin");
 * role.setDescription("Administrador del sistema");
 * 
 * when(roleRepository.findById(1)).thenReturn(Optional.of(role));
 * 
 * // Act
 * Optional<Role> foundRoleOptional = roleService.findRoleById(1);
 * 
 * // Assert
 * assertTrue(foundRoleOptional.isPresent(), "Role should be present");
 * Role foundRole = foundRoleOptional.get();
 * assertEquals(role.getId(), foundRole.getId());
 * assertEquals(role.getName(), foundRole.getName());
 * assertEquals(role.getDescription(), foundRole.getDescription());
 * }
 * 
 * @Test
 * void testFindById_NotFound() {
 * // Arrange
 * when(roleRepository.findById(1)).thenReturn(Optional.empty());
 * 
 * // Act
 * Optional<Role> foundRoleOptional = roleService.findRoleById(1);
 * 
 * // Assert
 * assertTrue(foundRoleOptional.isEmpty(), "Role should not be present");
 * }
 * 
 * @Test
 * void testUpdateRole_Success() {
 * // Arrange
 * Role role = new Role();
 * role.setId(1);
 * role.setName("Admin");
 * role.setDescription("Administrador del sistema");
 * 
 * when(roleRepository.findById(1)).thenReturn(Optional.of(role));
 * when(roleRepository.save(any(Role.class))).thenReturn(role);
 * 
 * // Act
 * role.setName("Super Admin");
 * Optional<Role> updatedRoleOptional = roleService.updateRole(1, role);
 * 
 * // Assert
 * assertTrue(updatedRoleOptional.isPresent(), "Role should be present");
 * Role updatedRole = updatedRoleOptional.get();
 * assertEquals(role.getId(), updatedRole.getId());
 * assertEquals("Super Admin", updatedRole.getName());
 * assertEquals(role.getDescription(), updatedRole.getDescription());
 * }
 * 
 * @Test
 * void testUpdateRole_NotFound() {
 * // Arrange
 * Role role = new Role();
 * role.setId(1);
 * role.setName("Admin");
 * 
 * when(roleRepository.findById(1)).thenReturn(Optional.empty());
 * 
 * // Act
 * Optional<Role> updatedRoleOptional = roleService.updateRole(1, role);
 * 
 * // Assert
 * assertTrue(updatedRoleOptional.isEmpty(), "Role should not be present");
 * }
 * 
 * @Test
 * void testDeleteRole_Success() {
 * // Arrange
 * Role role = new Role();
 * role.setId(1);
 * role.setName("Admin");
 * role.setDescription("Administrador del sistema");
 * 
 * when(roleRepository.findById(1)).thenReturn(Optional.of(role));
 * doNothing().when(roleRepository).deleteById(1);
 * 
 * // Act
 * roleService.deleteRoleById(1);
 * 
 * // Assert
 * verify(roleRepository, times(1)).deleteById(1);
 * }
 * 
 * @Test
 * void testDeleteRole_NotFound() {
 * // Arrange
 * doNothing().when(roleRepository).deleteById(1);
 * 
 * // Act
 * roleService.deleteRoleById(1);
 * 
 * // Assert
 * verify(roleRepository, times(1)).deleteById(1);
 * }
 * 
 * @Test
 * void testFindAllRoles_WhenRolesExist() {
 * // Arrange
 * Role role1 = new Role();
 * role1.setId(1);
 * role1.setName("Admin");
 * role1.setDescription("Administrador del sistema");
 * 
 * Role role2 = new Role();
 * role2.setId(2);
 * role2.setName("User");
 * role2.setDescription("Usuario del sistema");
 * 
 * List<Role> roles = Arrays.asList(role1, role2);
 * 
 * when(roleRepository.findAll()).thenReturn(roles);
 * 
 * // Act
 * List<Role> foundRoles = roleService.findAllRoles();
 * 
 * // Assert
 * assertEquals(2, foundRoles.size(), "The number of roles should be 2");
 * assertTrue(foundRoles.contains(role1), "The list should contain role1");
 * assertTrue(foundRoles.contains(role2), "The list should contain role2");
 * }
 * 
 * @Test
 * void testFindAllRoles_WhenNoRolesExist() {
 * // Arrange
 * when(roleRepository.findAll()).thenReturn(Collections.emptyList());
 * 
 * // Act
 * List<Role> foundRoles = roleService.findAllRoles();
 * 
 * // Assert
 * assertTrue(foundRoles.isEmpty(), "The list of roles should be empty");
 * }
 * 
 * }
 * 
 * class PermissionServiceTests {
 * 
 * @Mock
 * private PermissionRepository permissionRepository;
 * 
 * @InjectMocks
 * private PermissionServiceImpl permissionService;
 * 
 * @BeforeEach
 * public void setup() {
 * MockitoAnnotations.openMocks(this);
 * }
 * 
 * // Tests para
 * 
 * @Test
 * void testFindAllPermissions_WhenPermissionsExist() {
 * // Arrange
 * Permission permission1 = new Permission();
 * permission1.setId(1);
 * permission1.setName("READ");
 * 
 * Permission permission2 = new Permission();
 * permission2.setId(2);
 * permission2.setName("WRITE");
 * 
 * List<Permission> permissions = List.of(permission1, permission2);
 * when(permissionRepository.findAll()).thenReturn(permissions);
 * 
 * // Act
 * List<Permission> foundPermissions = permissionService.findAllPermissions();
 * 
 * // Assert
 * assertEquals(2, foundPermissions.size());
 * assertTrue(foundPermissions.contains(permission1));
 * assertTrue(foundPermissions.contains(permission2));
 * }
 * 
 * @Test
 * void testFindAllPermissions_WhenNoPermissionsExist() {
 * // Arrange
 * when(permissionRepository.findAll()).thenReturn(Collections.emptyList());
 * 
 * // Act
 * List<Permission> foundPermissions = permissionService.findAllPermissions();
 * 
 * // Assert
 * assertTrue(foundPermissions.isEmpty());
 * }
 * 
 * @Test
 * void testFindPermissionById_Success() {
 * // Arrange
 * Permission permission = new Permission();
 * permission.setId(1);
 * permission.setName("READ");
 * 
 * when(permissionRepository.findById(1)).thenReturn(Optional.of(permission));
 * 
 * // Act
 * Optional<Permission> foundPermissionOptional =
 * permissionService.findPermissionById(1);
 * 
 * // Assert
 * assertTrue(foundPermissionOptional.isPresent());
 * assertEquals(permission, foundPermissionOptional.get());
 * }
 * 
 * @Test
 * void testFindPermissionById_NotFound() {
 * // Arrange
 * when(permissionRepository.findById(any(Integer.class))).thenReturn(Optional.
 * empty());
 * 
 * // Act
 * Optional<Permission> foundPermissionOptional =
 * permissionService.findPermissionById(99);
 * 
 * // Assert
 * assertTrue(foundPermissionOptional.isEmpty());
 * }
 * 
 * @Test
 * void testSavePermission_Success() {
 * // Arrange
 * Permission permission = new Permission();
 * permission.setId(1);
 * permission.setName("READ");
 * 
 * when(permissionRepository.save(any(Permission.class))).thenReturn(permission)
 * ;
 * 
 * // Act
 * Permission savedPermission = permissionService.savePermission(permission);
 * 
 * // Assert
 * assertEquals(permission.getId(), savedPermission.getId());
 * assertEquals(permission.getName(), savedPermission.getName());
 * }
 * 
 * @Test
 * void testSavePermission_NullPermission() {
 * // Arrange
 * when(permissionRepository.save(any(Permission.class))).thenThrow(new
 * IllegalArgumentException("Permission cannot be null"));
 * 
 * // Act & Assert
 * Exception exception = assertThrows(IllegalArgumentException.class, () -> {
 * permissionService.savePermission(null);
 * });
 * 
 * assertEquals("Permission cannot be null", exception.getMessage());
 * }
 * 
 * @Test
 * void testDeletePermissionById_Success() {
 * // Arrange
 * doNothing().when(permissionRepository).deleteById(1);
 * 
 * // Act
 * permissionService.deletePermissionById(1);
 * 
 * // Assert
 * verify(permissionRepository, times(1)).deleteById(1);
 * }
 * 
 * @Test
 * void testDeletePermissionById_NullId() {
 * // Arrange
 * doThrow(new
 * IllegalArgumentException("ID cannot be null")).when(permissionRepository).
 * deleteById(null);
 * 
 * // Act & Assert
 * Exception exception = assertThrows(IllegalArgumentException.class, () -> {
 * permissionService.deletePermissionById(null);
 * });
 * 
 * assertEquals("ID cannot be null", exception.getMessage());
 * }
 * }
 * 
 * 
 * class UserServiceTests {
 * 
 * @Mock
 * private UserRepository userRepository;
 * 
 * @InjectMocks
 * private UserServiceImpl userService;
 * 
 * @BeforeEach
 * public void setup() {
 * MockitoAnnotations.openMocks(this);
 * }
 * 
 * @Test
 * void testFindAllUsers_WhenUsersExist() {
 * // Arrange
 * User user1 = new User();
 * user1.setId(1);
 * user1.setUsername("user1");
 * 
 * User user2 = new User();
 * user2.setId(2);
 * user2.setUsername("user2");
 * 
 * List<User> users = List.of(user1, user2);
 * when(userRepository.findAll()).thenReturn(users);
 * 
 * // Act
 * List<User> foundUsers = userService.findAllUsers();
 * 
 * // Assert
 * assertEquals(2, foundUsers.size());
 * assertTrue(foundUsers.contains(user1));
 * assertTrue(foundUsers.contains(user2));
 * }
 * 
 * @Test
 * void testFindAllUsers_WhenNoUsersExist() {
 * // Arrange
 * when(userRepository.findAll()).thenReturn(Collections.emptyList());
 * 
 * // Act
 * List<User> foundUsers = userService.findAllUsers();
 * 
 * // Assert
 * assertTrue(foundUsers.isEmpty());
 * }
 * 
 * @Test
 * void testFindUserById_Success() {
 * // Arrange
 * User user = new User();
 * user.setId(1);
 * user.setUsername("user1");
 * 
 * when(userRepository.findById(1)).thenReturn(Optional.of(user));
 * 
 * // Act
 * Optional<User> foundUserOptional = userService.findUserById(1);
 * 
 * // Assert
 * assertTrue(foundUserOptional.isPresent());
 * assertEquals(user, foundUserOptional.get());
 * }
 * 
 * @Test
 * void testFindUserById_NotFound() {
 * // Arrange
 * when(userRepository.findById(anyInt())).thenReturn(Optional.empty());
 * 
 * // Act
 * Optional<User> foundUserOptional = userService.findUserById(99);
 * 
 * // Assert
 * assertTrue(foundUserOptional.isEmpty());
 * }
 * 
 * @Test
 * void testSaveUser_Success() {
 * // Arrange
 * User user = new User();
 * user.setId(1);
 * user.setUsername("user1");
 * 
 * when(userRepository.save(any(User.class))).thenReturn(user);
 * 
 * // Act
 * User savedUser = userService.saveUser(user);
 * 
 * // Assert
 * assertEquals(user.getId(), savedUser.getId());
 * assertEquals(user.getUsername(), savedUser.getUsername());
 * }
 * 
 * @Test
 * void testSaveUser_NullUser() {
 * // Arrange
 * when(userRepository.save(any(User.class))).thenThrow(new
 * IllegalArgumentException("User cannot be null"));
 * 
 * // Act & Assert
 * Exception exception = assertThrows(IllegalArgumentException.class, () -> {
 * userService.saveUser(null);
 * });
 * 
 * assertEquals("User cannot be null", exception.getMessage());
 * }
 * 
 * @Test
 * void testDeleteUserById_Success() {
 * // Arrange
 * doNothing().when(userRepository).deleteById(1);
 * 
 * // Act
 * userService.deleteUserById(1);
 * 
 * // Assert
 * verify(userRepository, times(1)).deleteById(1);
 * }
 * 
 * @Test
 * void testDeleteUserById_NullId() {
 * // Arrange
 * doThrow(new
 * IllegalArgumentException("ID cannot be null")).when(userRepository).
 * deleteById(null);
 * 
 * // Act & Assert
 * Exception exception = assertThrows(IllegalArgumentException.class, () -> {
 * userService.deleteUserById(null);
 * });
 * 
 * assertEquals("ID cannot be null", exception.getMessage());
 * }
 * 
 * @Test
 * void testFindByUsername_Success() {
 * // Arrange
 * User user = new User();
 * user.setId(1);
 * user.setUsername("user1");
 * 
 * when(userRepository.findByUsername("user1")).thenReturn(Optional.of(user));
 * 
 * // Act
 * Optional<User> foundUserOptional = userService.findByUsername("user1");
 * 
 * // Assert
 * assertTrue(foundUserOptional.isPresent());
 * assertEquals(user, foundUserOptional.get());
 * }
 * 
 * @Test
 * void testFindByUsername_NotFound() {
 * // Arrange
 * when(userRepository.findByUsername(any(String.class))).thenReturn(Optional.
 * empty());
 * 
 * // Act
 * Optional<User> foundUserOptional = userService.findByUsername("nonexistent");
 * 
 * // Assert
 * assertTrue(foundUserOptional.isEmpty());
 * }
 * }
 * 
 */
