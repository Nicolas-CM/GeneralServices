# **Informe y Documentación**

Desarrollamos un proyecto basado en el patrón MVC utilizando Spring Boot, Thymeleaf y Spring Security para una plataforma de gestión de usuarios. La plataforma permite el registro, inicio de sesión y administración de usuarios con roles y permisos a través de una interfaz de usuario basada en HTML.

#### **Logros**

1. **Integración de Servicios (20%)**  
   - Implementamos todos los servicios clave, incluyendo los de autenticación y gestión de usuarios. Se utilizaron servicios para crear, actualizar y eliminar roles, usuarios y permisos. Cada servicio se integró correctamente con el backend, logrando una funcionalidad estable.

2. **Integración de Controladores (20%)**  
   - Desarrollamos controladores para gestionar las operaciones de autenticación, roles y permisos. Los controladores facilitan el registro de nuevos usuarios, la asignación de roles y la gestión de permisos, permitiendo que los usuarios administradores puedan modificar los accesos de los usuarios.

3. **Integración con Spring Security (10%)**  
   - Configuramos Spring Security para controlar el acceso a las funcionalidades según los permisos de los usuarios. Implementamos el `AuthenticationProvider` y el `AuthenticationManager`, logrando que solo los usuarios autorizados puedan acceder a ciertas áreas del sistema según sus roles asignados.

4. **Desarrollo de Templates (40%)**  
   - Diseñamos vistas utilizando Thymeleaf para las operaciones de autenticación y gestión de usuarios. Las pantallas incluyen formularios de inicio de sesión, registro de usuarios, listado de usuarios, creación de roles y asignación de permisos. Aplicamos estilos CSS para mejorar la presentación de las vistas, asegurando una interfaz de usuario funcional y estética.

#### **Dificultades Encontradas**

1. **Problemas con la Configuración de Spring Security**: Tuvimos dificultades iniciales con la configuración de `AuthenticationManager` y el control de permisos a nivel de controlador, lo cual fue solucionado tras varias revisiones de la documentación oficial.

2. **Integración de Vistas y Controladores**: Algunas vistas requerían controladores y servicios que aún no se habían implementado, lo que generó retrasos en el desarrollo. Sin embargo, al final se logró implementar todas las funcionalidades necesarias para el correcto funcionamiento del sistema.

3. **Estilos CSS**: La incorporación de estilos en las vistas fue desafiante debido a limitaciones de tiempo. Logramos implementar un diseño básico que cumple con los requisitos, pero queda espacio para mejorar la presentación visual.

#### **Conclusión**

Este proyecto fue una excelente oportunidad para aprender e implementar el patrón MVC utilizando Spring Boot, Thymeleaf y Spring Security. A pesar de los desafíos técnicos y de integración, logramos entregar una plataforma funcional con los servicios de autenticación y gestión de usuarios requeridos.