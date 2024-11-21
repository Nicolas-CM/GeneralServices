// Inserciones para la colección Notification
db.Notification.insertMany([
    {
      senderUsername: "compania1",
      receiverUsername: "cliente1",
      message: "Tu solicitud ha sido aceptada.",
      timestamp: new Date().toISOString(),
      isViewed: false
    },
    {
      senderUsername: "compania2",
      receiverUsername: "cliente2",
      message: "Tu pedido ha sido procesado.",
      timestamp: new Date().toISOString(),
      isViewed: false
    },
    {
      senderUsername: "compania3",
      receiverUsername: "cliente3",
      message: "Revisa el estado de tu solicitud en el portal.",
      timestamp: new Date().toISOString(),
      isViewed: true
    },
    {
      senderUsername: "compania4",
      receiverUsername: "cliente4",
      message: "La cotización solicitada está lista.",
      timestamp: new Date().toISOString(),
      isViewed: false
    },
    {
      senderUsername: "compania5",
      receiverUsername: "cliente5",
      message: "Tu servicio ha sido completado con éxito.",
      timestamp: new Date().toISOString(),
      isViewed: false
    },
    {
      senderUsername: "compania6",
      receiverUsername: "cliente6",
      message: "Consulta las actualizaciones de tu solicitud.",
      timestamp: new Date().toISOString(),
      isViewed: true
    },
    {
      senderUsername: "compania7",
      receiverUsername: "cliente7",
      message: "Gracias por confiar en nuestros servicios.",
      timestamp: new Date().toISOString(),
      isViewed: false
    },
    {
      senderUsername: "compania8",
      receiverUsername: "cliente8",
      message: "Tu cuenta ha sido activada.",
      timestamp: new Date().toISOString(),
      isViewed: true
    },
    {
      senderUsername: "compania9",
      receiverUsername: "cliente9",
      message: "Hemos recibido tu solicitud, pronto recibirás una respuesta.",
      timestamp: new Date().toISOString(),
      isViewed: false
    },
    {
      senderUsername: "compania10",
      receiverUsername: "cliente10",
      message: "Tus productos están siendo enviados.",
      timestamp: new Date().toISOString(),
      isViewed: true
    }
  ]);
  
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  // Inserciones para la colección Rating
  db.Rating.insertMany([
    {
      ratingValue: 5,
      companyId: "compania1",
      comment: "Excelente atención y servicio rápido.",
      _class: "Rating"
    },
    {
      ratingValue: 4,
      companyId: "compania2",
      comment: "El servicio fue bueno, pero el tiempo de espera fue largo.",
      _class: "Rating"
    },
    {
      ratingValue: 3,
      companyId: "compania3",
      comment: "Cumplió con lo prometido, pero no hubo comunicación constante.",
      _class: "Rating"
    },
    {
      ratingValue: 5,
      companyId: "compania4",
      comment: "Gran experiencia, muy satisfecho con el servicio.",
      _class: "Rating"
    },
    {
      ratingValue: 2,
      companyId: "compania5",
      comment: "El servicio fue deficiente, no se cumplió con lo acordado.",
      _class: "Rating"
    },
    {
      ratingValue: 4,
      companyId: "compania6",
      comment: "Muy bueno, pero la interfaz web podría mejorar.",
      _class: "Rating"
    },
    {
      ratingValue: 1,
      companyId: "compania7",
      comment: "Mala experiencia, no me dieron soporte adecuado.",
      _class: "Rating"
    },
    {
      ratingValue: 5,
      companyId: "compania8",
      comment: "Increíble servicio, muy profesionales.",
      _class: "Rating"
    },
    {
      ratingValue: 3,
      companyId: "compania9",
      comment: "El servicio fue aceptable, aunque no excelente.",
      _class: "Rating"
    },
    {
      ratingValue: 4,
      companyId: "compania10",
      comment: "Muy bien, aunque el proceso fue un poco lento.",
      _class: "Rating"
    }
  ]);
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  /// Inserciones para la colección Chat
  db.Chat.insertMany([
    {
      solicitud_id: "solicitud1",
      messages: [
        {
          sender: "compania1",
          receiver: "cliente1",
          content: "¿Cómo podemos ayudarte con tu solicitud?",
          timestamp: new Date().toISOString(),
          isViewed: false
        },
        {
          sender: "cliente1",
          receiver: "compania1",
          content: "Necesito más detalles sobre los servicios que ofrecen.",
          timestamp: new Date().toISOString(),
          isViewed: false
        }
      ],
      _class: "Chat"
    },
    {
      solicitud_id: "solicitud2",
      messages: [
        {
          sender: "compania2",
          receiver: "cliente2",
          content: "Te hemos enviado la cotización a tu correo.",
          timestamp: new Date().toISOString(),
          isViewed: false
        },
        {
          sender: "cliente2",
          receiver: "compania2",
          content: "Gracias por la información, voy a revisarlo.",
          timestamp: new Date().toISOString(),
          isViewed: false
        }
      ],
      _class: "Chat"
    },
    {
      solicitud_id: "solicitud3",
      messages: [
        {
          sender: "compania3",
          receiver: "cliente3",
          content: "¿Podrías confirmar tu disponibilidad para el servicio?",
          timestamp: new Date().toISOString(),
          isViewed: true
        },
        {
          sender: "cliente3",
          receiver: "compania3",
          content: "Sí, estaré disponible a partir de mañana.",
          timestamp: new Date().toISOString(),
          isViewed: true
        }
      ],
      _class: "Chat"
    },
    {
      solicitud_id: "solicitud4",
      messages: [
        {
          sender: "compania4",
          receiver: "cliente4",
          content: "Hemos recibido tu solicitud, pronto recibirás una respuesta.",
          timestamp: new Date().toISOString(),
          isViewed: false
        },
        {
          sender: "cliente4",
          receiver: "compania4",
          content: "Perfecto, gracias por la actualización.",
          timestamp: new Date().toISOString(),
          isViewed: false
        }
      ],
      _class: "Chat"
    },
    {
      solicitud_id: "solicitud5",
      messages: [
        {
          sender: "compania5",
          receiver: "cliente5",
          content: "Tu pedido ha sido enviado, te llegará pronto.",
          timestamp: new Date().toISOString(),
          isViewed: false
        },
        {
          sender: "cliente5",
          receiver: "compania5",
          content: "Gracias, estaré atento a la entrega.",
          timestamp: new Date().toISOString(),
          isViewed: true
        }
      ],
      _class: "Chat"
    },
    {
      solicitud_id: "solicitud6",
      messages: [
        {
          sender: "compania6",
          receiver: "cliente6",
          content: "Tu servicio está listo para ser entregado.",
          timestamp: new Date().toISOString(),
          isViewed: true
        },
        {
          sender: "cliente6",
          receiver: "compania6",
          content: "Excelente, ¿dónde puedo recogerlo?",
          timestamp: new Date().toISOString(),
          isViewed: false
        }
      ],
      _class: "Chat"
    },
    {
      solicitud_id: "solicitud7",
      messages: [
        {
          sender: "compania7",
          receiver: "cliente7",
          content: "Tu proyecto está en progreso, pronto recibirás más detalles.",
          timestamp: new Date().toISOString(),
          isViewed: false
        },
        {
          sender: "cliente7",
          receiver: "compania7",
          content: "Estoy esperando con ansias, gracias.",
          timestamp: new Date().toISOString(),
          isViewed: false
        }
      ],
      _class: "Chat"
    },
    {
      solicitud_id: "solicitud8",
      messages: [
        {
          sender: "compania8",
          receiver: "cliente8",
          content: "Gracias por tu preferencia, tu solicitud está siendo procesada.",
          timestamp: new Date().toISOString(),
          isViewed: false
        },
        {
          sender: "cliente8",
          receiver: "compania8",
          content: "Perfecto, espero recibir noticias pronto.",
          timestamp: new Date().toISOString(),
          isViewed: true
        }
      ],
      _class: "Chat"
    },
    {
      solicitud_id: "solicitud9",
      messages: [
        {
          sender: "compania9",
          receiver: "cliente9",
          content: "Tu solicitud está siendo procesada.",
          timestamp: new Date().toISOString(),
          isViewed: false
        },
        {
          sender: "cliente9",
          receiver: "compania9",
          content: "¡Gracias por la actualización!",
          timestamp: new Date().toISOString(),
          isViewed: true
        }
      ],
      _class: "Chat"
    }
  ]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  // Inserciones para la colección Message
  db.Message.insertMany([
    {
      unaLista: 1,
      sender: "compania1",
      receiver: "cliente1",
      content: "Gracias por elegir nuestros servicios, ¿cómo podemos ayudarte?",
      timestamp: new Date().toISOString(),
      isViewed: false
    },
    {
      unaLista: 2,
      sender: "cliente1",
      receiver: "compania1",
      content: "Estoy interesado en un servicio de mantenimiento, ¿me pueden ayudar?",
      timestamp: new Date().toISOString(),
      isViewed: false
    },
    {
      unaLista: 3,
      sender: "compania2",
      receiver: "cliente2",
      content: "Por supuesto, tenemos opciones de mantenimiento preventivo. ¿Cuál prefieres?",
      timestamp: new Date().toISOString(),
      isViewed: false
    },
    {
      unaLista: 4,
      sender: "cliente2",
      receiver: "compania2",
      content: "Me interesa el mantenimiento preventivo anual.",
      timestamp: new Date().toISOString(),
      isViewed: false
    },
    {
      unaLista: 5,
      sender: "compania3",
      receiver: "cliente3",
      content: "Tu solicitud fue procesada exitosamente, por favor espera la confirmación de envío.",
      timestamp: new Date().toISOString(),
      isViewed: true
    },
    {
      unaLista: 6,
      sender: "cliente3",
      receiver: "compania3",
      content: "Gracias, estaré esperando la confirmación.",
      timestamp: new Date().toISOString(),
      isViewed: true
    },
    {
      unaLista: 7,
      sender: "compania4",
      receiver: "cliente4",
      content: "Estamos listos para comenzar tu proyecto.",
      timestamp: new Date().toISOString(),
      isViewed: true
    },
    {
      unaLista: 8,
      sender: "cliente4",
      receiver: "compania4",
      content: "Perfecto, ¿cuándo podemos empezar?",
      timestamp: new Date().toISOString(),
      isViewed: true
    },
    {
      unaLista: 9,
      sender: "compania5",
      receiver: "cliente5",
      content: "Tu producto ha sido enviado, espera el número de seguimiento.",
      timestamp: new Date().toISOString(),
      isViewed: false
    },
    {
      unaLista: 10,
      sender: "cliente5",
      receiver: "compania5",
      content: "Gracias, estaré atento al número de seguimiento.",
      timestamp: new Date().toISOString(),
      isViewed: false
    }
  ]);
  