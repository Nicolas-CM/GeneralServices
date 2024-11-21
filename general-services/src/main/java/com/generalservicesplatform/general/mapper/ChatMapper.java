package com.generalservicesplatform.general.mapper;

import com.generalservicesplatform.general.dto.ChatMessageDto;
import com.generalservicesplatform.general.model.Message;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ChatMapper {

    ChatMapper INSTANCE = Mappers.getMapper(ChatMapper.class);

    // Mapear de ChatMessageDto a Message (Entidad)
    @Mapping(target = "id", ignore = true) // El ID es generado por MongoDB
    @Mapping(target = "timestamp", expression = "java(java.time.LocalDateTime.now())") // Timestamp actual
    @Mapping(target = "viewed", constant = "false") // Inicialmente no visto
    Message toEntity(ChatMessageDto dto);

    // Mapear de Message a ChatMessageDto
    ChatMessageDto toDto(Message message);
}
