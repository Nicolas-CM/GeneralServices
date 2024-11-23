# Plataforma de Servicios Generales

## Integrantes

### Davide Flamini
### Nicolas Cuellar

### Andres Cabezas
### Miguel Angel Martinez (Solo medio participe en la funcionalidad del chat)

# Descripción del Proyecto

Nuestra propuesta es una plataforma digital diseñada para conectar a usuarios con proveedores de servicios generales, abarcando áreas como reparaciones, limpieza, plomería, electricidad, entre otros. Esta solución busca eliminar las barreras que enfrentan las personas al intentar encontrar servicios confiables, rápidos y de calidad en cualquier momento. La plataforma combina facilidad de uso con herramientas eficientes que permiten gestionar de manera integral tanto las solicitudes de servicios como la interacción entre usuarios y proveedores.

El propósito principal del proyecto es ofrecer un entorno confiable que simplifique el proceso de búsqueda y contratación de servicios generales, maximizando la satisfacción del cliente y promoviendo la transparencia mediante un sistema de calificaciones y reseñas.

## Contexto Tecnológico

### Backend: Spring Boot

El backend de la aplicación está construido en Spring Boot, lo que garantiza una arquitectura robusta, escalable y segura. Este se encarga de:

- Manejar la lógica de negocio, incluyendo la autenticación y la autorización basada en permisos.
- Gestionar las interacciones con la base de datos para almacenar y recuperar información, como usuarios, solicitudes y cotizaciones.
- Exponer endpoints RESTful que permiten a la aplicación frontend comunicarse de manera eficiente con el backend.

### Frontend: React

La interfaz de usuario está desarrollada con React, proporcionando:

- Una experiencia de usuario intuitiva y responsiva.
- Componentes dinámicos que facilitan la navegación y la interacción con las funcionalidades principales.
- Gestión del estado de la aplicación mediante herramientas modernas como React Context y Redux, según la necesidad.

## Estructura de Usuarios

### Usuarios Finales (Clientes)

- Perfil orientado a la gestión de solicitudes de servicios.
- Menú simplificado con opciones como: Ver Perfil, Gestionar Solicitudes, Historial de Servicios.

### Compañías

- Perfil profesional con enfoque en la creación y gestión de solicitudes.
- Acceso a un tablero que muestra solicitudes pendientes y el historial de servicios realizados.

### Administradores

- Panel de administración para gestionar usuarios, permisos y roles.
- Herramientas para monitorear el desempeño de la plataforma.

## Objetivo Final

El objetivo de esta aplicación es revolucionar el acceso a servicios generales, proporcionando una herramienta digital que conecte a las personas con los proveedores adecuados de manera rápida y eficiente, asegurando calidad, confianza y satisfacción en cada experiencia.

## Requerimientos del Proyecto

### Registro de Usuarios y Compañías

**Usuarios:**

- Creación de un perfil con información básica (nombre, correo electrónico, etc.).
- Gestión de datos personales y preferencias (por ejemplo, dirección de contacto, preferencias de notificación).

**Compañías:**

- Creación de un perfil profesional con detalles sobre los servicios que ofrecen (categorías de servicio, precios, disponibilidad, etc.).
- Gestión del portafolio de servicios y respuesta a solicitudes de los usuarios.

### Solicitudes de Servicio

**Los usuarios pueden:**

- Publicar solicitudes detalladas con la descripción del servicio requerido.
- Especificar requisitos adicionales, como fecha preferida, presupuesto estimado y otros detalles relevantes.
- Editar o cancelar solicitudes antes de que sean aceptadas por una compañía.

### Sistema de Calificación y Reseñas

**Los usuarios pueden:**

- Calificar a las compañías en función de la calidad del servicio recibido, la puntualidad, la profesionalidad, etc.
- Dejar reseñas detalladas que ayuden a otros usuarios a tomar decisiones informadas al elegir una compañía.

### Gestión de Solicitudes y Servicios

**Usuarios:**

- Ver el historial de solicitudes realizadas y servicios recibidos.
- Gestionar solicitudes activas (cancelar si es necesario).

**Compañías:**

- Ver un tablero con las solicitudes pendientes y las que han sido completadas.
- Gestionar el estado de las solicitudes enviadas y la aceptación o rechazo de solicitudes.

### Gestión de Roles y Permisos (Administradores)

**Administradores:**

- Acceder a un panel de administración para gestionar los usuarios y compañías registrados.
- Gestionar permisos y roles de los usuarios (usuarios, compañías, administradores).
- Monitorear el desempeño general de la plataforma, visualizando métricas como el número de solicitudes publicadas, calificaciones, etc.

### Interacción en Tiempo Real

- **Notificaciones Push:** Notificar a las compañías cuando un nuevo usuario publique una solicitud que coincida con sus servicios.
- **Sistema de Chat:** Permitir comunicación en tiempo real entre usuarios y compañías para discutir detalles de las solicitudes. Almacenar el historial de conversaciones para consultas futuras.

## Seguridad y Autenticación

**Autenticación de Usuarios y Compañías:**

- Los usuarios y compañías deben poder registrarse e iniciar sesión de manera segura en la plataforma.
- El sistema debe soportar autenticación basada en JWT (JSON Web Token) para asegurar las sesiones y proteger la información del usuario.

## Interfaz de Usuario

**Frontend (React):**

- La plataforma debe ser completamente responsiva, accesible desde diferentes dispositivos (móviles, tabletas y escritorios).
- Las pantallas deben ser fáciles de navegar y los usuarios deben poder acceder rápidamente a las funcionalidades principales como el registro, la gestión de solicitudes y la visualización de cotizaciones.

## Funcionalidad de Búsqueda y Filtros

**Usuarios:**

- Deben poder buscar compañías por categoría de servicio (electricidad, plomería, reparaciones, etc.).
- Deben poder filtrar compañías según ubicación, precio y calificación.

## Integración con Base de Datos Relacional y NoSQL

**Base de Datos Relacional:**

- El backend debe manejar y almacenar datos estructurados de usuarios, compañías, solicitudes y calificaciones.

**Base de Datos NoSQL:**

- Guardar las notificaciones, el chat y las calificaciones.


## Ejecución-front

- **Instalar dependencias:** ```npm install```
- **Ejecutar programa:** ```npm start```

---
