# **Informe y Documentación**

Desarrollamos un backend para una plataforma que conecta usuarios con proveedores de servicios generales, como reparaciones, limpieza, plomería y electricidad. La plataforma permite a los usuarios solicitar servicios, recibir cotizaciones y elegir al proveedor que mejor se adapte a sus necesidades.

#### **Logros**

1. **Integración de JPA (20%)**
   - Configuramos todas las entidades del modelo y definimos las relaciones entre ellas. A pesar de algunos ajustes necesarios, el sistema está funcionando correctamente.

2. **Pruebas Unitarias (20%)**
   - Implementamos pruebas unitarias con JUnit y Mockito para validar métodos de consulta, inserción, actualización y eliminación de nuestras clases Service. Logramos una cobertura adecuada y corregimos errores identificados durante las pruebas.
   - Para visualizar los resultados de las pruebas con JaCoCo se debe ingresar al html en la ubicación `general-services/build/reports/jacoco/test/html/index.html`

3. **Carga de Esquema y Datos Iniciales (20%)**
   - Creamos scripts para la inicialización del esquema y carga de datos. Ajustamos las definiciones de la base de datos después de detectar errores en los inserts, mejorando la estructura final.

4. **Integración de Backend (25%)**
   - Establecimos repositorios para todas las entidades y desarrollamos servicios para la autenticación. La integración de Spring Boot se completó exitosamente.

5. **Herramientas para Revisar Cobertura (5%)**
   - Configuramos JaCoCo para revisar la cobertura de pruebas y generamos reportes que nos ayudaron a mejorar la calidad del código.

#### **Dificultades Encontradas**

1. **Curva de Aprendizaje con Spring y JPA**: La configuración de entidades y relaciones en Spring y JPA resultó ser un desafío significativo. Hubo una curva de aprendizaje considerable para entender y aplicar correctamente las configuraciones y anotaciones necesarias.

2. **Problemas con la Base de Datos**: Enfrentamos problemas con los inserts debido a definiciones incorrectas en el esquema de la base de datos. Esto nos llevó a revisar y corregir el diseño de la base de datos, lo cual, aunque desafiante, mejoró la robustez de la aplicación.

3. **Problemas con los test**: Se encontraron huecos de aprendizaje al implementar los Mockito ya que, teníamos un error con el @SpringBootTest, la cual no debería colocarse si se está utilizando el Mock

#### **Conclusión**

A pesar de los desafíos, el proyecto fue de gran ayuda ya que nos permitió aprender y aplicar conocimientos en Spring Boot y JPA. Superar los errores, ayudan a mejorar en el marco de trabajo de Spring.

### Informe de Proyecto: Plataforma de Servicios Generales

**FACULTAD DE INGENIERÍA**  
**DEPARTAMENTO COMPUTACIÓN Y SISTEMAS INTELIGENTES**  
**Taller 2: Computación en Internet II**  
**Docente: Alejandro Muñoz Bravo**  
**Entrega: Sábado, 31 de agosto de 2024**

---

#### **Ejecución del Proyecto**

- **Para Ejecutar la Aplicación**: Ejecuta la clase `GeneralServicesPlatformApplication`.
- **Base de Datos**: Se utiliza H2 para la base de datos, que se inicializa automáticamente. Los datos iniciales están en el archivo `data.sql`, ubicado en la carpeta `resources`.
  - **URL**: `jdbc:h2:file:./testdb`
  - **Usuario**: `sa`
  - **Contraseña**: `password`
- **Para Ejecutar las Pruebas**: Ejecuta el comando `gradle test`. 
Para visualizar los reportes de JaCoCo debes entrar al html de la dirección `general-services/build/reports/jacoco/test/html/index.html`



