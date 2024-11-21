package com.generalservicesplatform.general;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.generalservicesplatform.general.service.MongoService;

@SpringBootApplication
public class GeneralServicesPlatformApplication {

    public static void main(String[] args) {
        SpringApplication.run(GeneralServicesPlatformApplication.class, args);
    }

    @Autowired
    private MongoService mongoService;

    @Bean
    public CommandLineRunner run(JdbcTemplate jdbcTemplate) {
        return args -> {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

            String[] passwords = {
                    "password123",
                    "password456",
                    "password789",
                    "password012",
                    "password345",
                    "password678",
                    "password901",
                    "password234",
                    "password567",
                    "password890"
            };

            for (String password : passwords) {
                String encodedPassword = passwordEncoder.encode(password);
                System.out.println(encodedPassword);
            }
            // Verificar datos en 'roles'
            System.out.println("==== Datos en la tabla 'roles' ====");
            jdbcTemplate.query("SELECT * FROM role", (rs, rowNum) -> {
                System.out.println("Role ID: " + rs.getInt("id") +
                        ", Name: " + rs.getString("name") +
                        ", Description: " + rs.getString("description"));
                return null;
            });

            // Verificar datos en 'permissions'
            System.out.println("\n==== Datos en la tabla 'permissions' ====");
            jdbcTemplate.query("SELECT * FROM permission", (rs, rowNum) -> {
                System.out.println("Permission ID: " + rs.getInt("id") +
                        ", Name: " + rs.getString("name") +
                        ", Resource: " + rs.getString("resource"));
                return null;
            });

            // Verificar datos en la tabla intermedia 'role_permission' para mostrar
            // relaciones
            System.out.println("\n==== Datos en la tabla 'role_permission' ====");
            jdbcTemplate.query("SELECT * FROM role_permission", (rs, rowNum) -> {
                System.out.println("Role ID: " + rs.getInt("role_id") +
                        ", Permission ID: " + rs.getInt("permission_id"));
                return null;
            });

            // Verificar datos en 'categories'
            System.out.println("\n==== Datos en la tabla 'categories' ====");
            jdbcTemplate.query("SELECT * FROM categories", (rs, rowNum) -> {
                System.out.println("Category ID: " + rs.getInt("id") +
                        ", Name: " + rs.getString("name") +
                        ", Description: " + rs.getString("description"));
                return null;
            });

            // Verificar datos en 'companies'
            System.out.println("\n==== Datos en la tabla 'companies' ====");
            jdbcTemplate.query("SELECT * FROM companies", (rs, rowNum) -> {
                System.out.println("Company ID: " + rs.getInt("id") +
                        ", Name: " + rs.getString("name") +
                        ", Description: " + rs.getString("description") +
                        ", Address: " + rs.getString("address") +
                        ", City: " + rs.getString("city") +
                        ", Country: " + rs.getString("country") +
                        ", Phone: " + rs.getString("phone") +
                        ", State: " + rs.getString("state") +
                        ", Zip Code: " + rs.getString("zip_code"));
                return null;
            });

            // Verificar datos en 'contractors'
            System.out.println("\n==== Datos en la tabla 'contractors' ====");
            jdbcTemplate.query("SELECT * FROM contractors", (rs, rowNum) -> {
                System.out.println("Contractor ID: " + rs.getInt("id") +
                        ", Name: " + rs.getString("name") +
                        ", Company ID: " + rs.getInt("company_id") +
                        ", Available: " + rs.getBoolean("available"));
                return null;
            });

            // Verificar datos en 'services'
            System.out.println("\n==== Datos en la tabla 'services' ====");
            jdbcTemplate.query("SELECT * FROM services", (rs, rowNum) -> {
                System.out.println("Service ID: " + rs.getInt("id") +
                        ", Name: " + rs.getString("name") +
                        ", Description: " + rs.getString("description") +
                        ", Category ID: " + rs.getInt("category_id"));
                return null;
            });

            // Verificar datos en 'company_service'
            System.out.println("\n==== Datos en la tabla 'company_service' ====");
            jdbcTemplate.query("SELECT * FROM company_service", (rs, rowNum) -> {
                System.out.println("Company ID: " + rs.getInt("company_id") +
                        ", Service ID: " + rs.getInt("service_id"));
                return null;
            });

            // Verificar datos en 'app_user'
            System.out.println("\n==== Datos en la tabla 'app_user' ====");
            jdbcTemplate.query("SELECT * FROM app_user", (rs, rowNum) -> {
                System.out.println("User ID: " + rs.getInt("id") +
                        ", Username: " + rs.getString("username") +
                        ", Name: " + rs.getString("name") +
                        ", Last Name: " + rs.getString("last_name") +
                        ", Email: " + rs.getString("email") +
                        ", Phone: " + rs.getString("phone") +
                        ", Address: " + rs.getString("address") +
                        ", City: " + rs.getString("city") +
                        ", State: " + rs.getString("state") +
                        ", Country: " + rs.getString("country") +
                        ", Zip Code: " + rs.getString("zip_code"));
                return null;
            });

            // Verificar datos en 'requests'
            System.out.println("\n==== Datos en la tabla 'requests' ====");
            jdbcTemplate.query("SELECT * FROM requests", (rs, rowNum) -> {
                System.out.println("Request ID: " + rs.getInt("id") +
                        ", Date: " + rs.getDate("date") +
                        ", Contractor ID: " + rs.getInt("contractor_id") +
                        ", Service ID: " + rs.getInt("service_id") +
                        ", Status: " + rs.getString("status"));
                return null;
            });

            // Verificar datos en 'billings'
            System.out.println("\n==== Datos en la tabla 'billings' ====");
            jdbcTemplate.query("SELECT * FROM billings", (rs, rowNum) -> {
                System.out.println("Billing ID: " + rs.getInt("id") +
                        ", Amount: " + rs.getDouble("amount") +
                        ", Payment Date: " + rs.getDate("payment_date") +
                        ", Contractor ID: " + rs.getInt("contractor_id") +
                        ", Request ID: " + rs.getInt("request_id") +
                        ", User ID: " + rs.getInt("user_id"));
                return null;
            });


            // Verificar datos en 'user_role'
            System.out.println("\n==== Datos en la tabla 'user_role' ====");
            jdbcTemplate.query("SELECT * FROM user_role", (rs, rowNum) -> {
                System.out.println("User ID: " + rs.getInt("user_id") +
                        ", Role ID: " + rs.getInt("role_id"));
                return null;
            });
            mongoService.checkConnection();
        };
    }
}
