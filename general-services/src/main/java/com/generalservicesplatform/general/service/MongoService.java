package com.generalservicesplatform.general.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
public class MongoService {

    @Autowired
    private MongoTemplate mongoTemplate;

    public void checkConnection() {
        try {
            // Intentamos leer el nombre de la base de datos
            String dbName = mongoTemplate.getDb().getName();
            System.out.println("Conectado a la base de datos: " + dbName);
        } catch (Exception e) {
            System.err.println("Error de conexión: " + e.getMessage());
        }
    }
}
