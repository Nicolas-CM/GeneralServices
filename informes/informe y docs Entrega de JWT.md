# **Informe y Documentación**

Implementamos un sistema de autenticación basado en JWT para una aplicación REST utilizando Spring Security, Mappers y DTOs. El objetivo fue mejorar la seguridad y gestión de las solicitudes y respuestas en la aplicación. 

#### **Logros**

1. **Integración de Controladores REST (35%)**
   - Se crearon controladores para las principales funciones de autenticación y gestión de usuarios, siguiendo las especificaciones REST. Además, utilizamos DTOs para el manejo adecuado de datos y se implementó la librería MapStruct para las transformaciones entre entidades y DTOs (entityToDto y dtoToEntity).
   - Configuramos un manejo adecuado de excepciones, con respuestas de error personalizadas y códigos de estado HTTP.

2. **Integración de JWT y Spring Security (20%)**
   - Configuramos JWT para incluir detalles del usuario como roles, fecha de inicio y expiración del token. Además, se implementó un filtro de seguridad (SecurityFilter) para gestionar el acceso a los servicios públicos y restringidos a través de autenticación JWT.

3. **Pruebas con Postman (25%)**
   - Se desarrollaron pruebas en Postman para verificar el funcionamiento de los controladores REST. Se implementaron variables de entorno y scripts de pre-solicitud (pre-request) y post-respuesta (post-response) para automatizar el proceso de pruebas.
   - Las pruebas permitieron validar la autenticación, la expiración de tokens y la restricción de acceso a rutas protegidas.

4. **Despliegue del Backend (10%)**
   - No Se desplegó el backend en un servidor Tomcat. 

#### **Dificultades Encontradas**

1. **Configuración de JWT**: Integrar JWT en Spring Security y configurar la codificación y decodificación del token representó un reto, principalmente en el manejo de la expiración de tokens y en la configuración del filtro de seguridad.

2. **Mapeo de Entidades con MapStruct**: Inicialmente, enfrentamos dificultades con la configuración de MapStruct para mapear las relaciones complejas entre las entidades y los DTOs. Ajustamos las configuraciones para optimizar el proceso y reducir errores.

3. **Pruebas en Postman**: A pesar de que Postman es una herramienta sencilla de usar, tuvimos problemas con las variables de entorno y la automatización de algunos scripts de pre-solicitud para la generación dinámica de tokens.

4. **Despliegue en Tomcat**: Configurar la aplicación para que se ejecute en un servidor Tomcat fue un desafío adicional. No se desplegó el backend en un servidor Tomcat, ya que al intentar hacerlo, se produjo un error 404.

#### **Conclusión**

Este proyecto fue una excelente oportunidad para reforzar conocimientos en autenticación con JWT, gestión de seguridad en Spring Security y mapeo de entidades. A través de los desafíos que encontramos, logramos mejorar la estructura y seguridad del sistema, lo que fortaleció nuestras habilidades en desarrollo de APIs REST seguras. Tomcat no es muy intuitivo.

#### **Ejecución del Proyecto**

- **Para Ejecutar la Aplicación**: Ejecuta el comando para Spring Boot (`gradle clean bootRun`) que inicializa los servicios REST.
- **Base de Datos**: Utilizamos H2 para el almacenamiento en memoria. La base de datos se inicializa automáticamente con datos básicos.
  - **URL**: `jdbc:h2:mem:testdb`
  - **Usuario**: `sa`
  - **Contraseña**: `password`
- **Para Ejecutar Postman**: Ingresa a la aplicación `Postman`. Exporta el .json del Postman que se encuentra en la [dirección](https://github.com/Computacion-2/proyecto-del-curso-adn/blob/main/informes/Postman/General-Services.postman_collection.json)  `informes/Postman/General-Services.postman_collection.json` con las variables de entorno definidas para hacer las pruebas más automatizadas.
