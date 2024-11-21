// src/main/java/com/generalservicesplatform/general/configs/WebSocketConfig.java
package com.generalservicesplatform.general.configs;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import org.springframework.beans.factory.annotation.Value;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketConfig.class);

    @Value("${server.port}")
    private String port;

    @Value("${server.servlet.context-path}")
    private String contextPath;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        String endpoint = "/ws";

        // Configura el endpoint de WebSocket
        registry.addEndpoint(endpoint)
                .setAllowedOrigins("http://localhost:3000")
                .withSockJS();

        // Construye la URL completa
        String protocol = "http"; // Cambia a "https" si tu aplicación usa HTTPS
        String fullUrl = protocol + "://localhost:" + port + contextPath + endpoint;

        // Imprime la URL completa del WebSocket
        logger.info("\n \n \n \n \n  WebSocket endpoint full URL: {}", fullUrl);
    }
}