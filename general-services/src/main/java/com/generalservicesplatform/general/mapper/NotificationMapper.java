package com.generalservicesplatform.general.mapper;

import com.generalservicesplatform.general.dto.NotificationDto;
import com.generalservicesplatform.general.model.Notification;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Mapper
public interface NotificationMapper {

    NotificationMapper INSTANCE = Mappers.getMapper(NotificationMapper.class);

    @Mapping(target = "id", ignore = true) // El ID es generado por MongoDB
    @Mapping(target = "timestamp", expression = "java(getCurrentTimestamp())")
    Notification toEntity(NotificationDto dto);

    // Método auxiliar para generar el timestamp
    default String getCurrentTimestamp() {
        return LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
    }
}
