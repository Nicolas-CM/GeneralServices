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
    "solicitudId": "1",
    "messages": [
      {
        "sender": "luisuser",
        "receiver": "carlosuser",
        "content": "Hola, ¿ya estás en camino?",
        "timestamp": "2024-11-21T08:15:00.000+00:00",
        "isViewed": false
      },
      {
        "sender": "carlosuser",
        "receiver": "luisuser",
        "content": "Sí, llegaré en 15 minutos.",
        "timestamp": "2024-11-21T08:16:45.000+00:00",
        "isViewed": false
      },
      {
        "sender": "luisuser",
        "receiver": "carlosuser",
        "content": "Perfecto, te espero.",
        "timestamp": "2024-11-21T08:18:30.000+00:00",
        "isViewed": false
      }
    ],
    "_class": "com.generalservicesplatform.general.model.Chat"
  },
  {
    "solicitudId": "3",
    "messages": [
      {
        "sender": "luisuser",
        "receiver": "martauser",
        "content": "Buenos días, ¿cuándo podrías venir?",
        "timestamp": "2024-11-21T09:00:00.000+00:00",
        "isViewed": false
      },
      {
        "sender": "martauser",
        "receiver": "luisuser",
        "content": "Buenos días, puedo llegar a las 10:30 AM.",
        "timestamp": "2024-11-21T09:05:00.000+00:00",
        "isViewed": false
      },
      {
        "sender": "luisuser",
        "receiver": "martauser",
        "content": "Está bien, aquí te espero.",
        "timestamp": "2024-11-21T09:10:30.000+00:00",
        "isViewed": false
      }
    ],
    "_class": "com.generalservicesplatform.general.model.Chat"
  },
  {
    "solicitudId": "7",
    "messages": [
      {
        "sender": "luisuser",
        "receiver": "pedrouser",
        "content": "Hola, necesito un reporte del avance.",
        "timestamp": "2024-11-21T10:00:00.000+00:00",
        "isViewed": false
      },
      {
        "sender": "pedrouser",
        "receiver": "luisuser",
        "content": "Claro, he avanzado un 70%. Terminamos hoy.",
        "timestamp": "2024-11-21T10:05:00.000+00:00",
        "isViewed": false
      },
      {
        "sender": "luisuser",
        "receiver": "pedrouser",
        "content": "Gracias, espero la notificación.",
        "timestamp": "2024-11-21T10:10:00.000+00:00",
        "isViewed": false
      }
    ],
    "_class": "com.generalservicesplatform.general.model.Chat"
  }
]);
