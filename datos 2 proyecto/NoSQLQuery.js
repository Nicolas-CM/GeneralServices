// Consultas para la colección Notification

// 1. Encuentra notificaciones enviadas por un usuario específico
db.Notification.find({ senderUsername: "usuarioEjemplo" })

// 2. Encuentra notificaciones no vistas para un usuario específico
db.Notification.find({ receiverUsername: "usuarioEjemplo", isViewed: false })

// 3. Marca todas las notificaciones como vistas para un usuario específico
db.Notification.updateMany(
  { receiverUsername: "usuarioEjemplo" },
  { $set: { isViewed: true } }
)

// Consultas para la colección Rating

// 1. Encuentra todas las calificaciones asociadas a una compañía
db.Rating.find({ companyId: "idCompañiaEjemplo" })

// 2. Encuentra todas las calificaciones con un valor mayor o igual a 4
db.Rating.find({ ratingValue: { $gte: 4 } })

// 3. Busca comentarios que contengan una palabra específica
db.Rating.find({ comment: { $regex: "palabraClave", $options: "i" } })

// 4. Calcula el promedio de las calificaciones para una compañía específica
db.Rating.aggregate([
  { $match: { companyId: "idCompañiaEjemplo" } },
  { $group: { _id: "$companyId", averageRating: { $avg: "$ratingValue" } } }
])

// Consultas para la colección Chat

// 1. Encuentra el chat relacionado con una solicitud específica
db.Chat.find({ solicitud_id: "idSolicitudEjemplo" })

// 2. Obtén todos los mensajes dentro de un chat específico
db.Chat.findOne(
  { _id: "idChatEjemplo" },
  { messages: 1, _id: 0 }
)

// Consultas para la colección Message

// 1. Encuentra mensajes enviados por un usuario específico dentro de un chat
db.Chat.find(
  { "messages.sender": "usuarioEjemplo" },
  { messages: { $elemMatch: { sender: "usuarioEjemplo" } } }
)

// 2. Encuentra mensajes no vistos dentro de un chat específico
db.Chat.find(
  { _id: "idChatEjemplo" },
  { messages: { $elemMatch: { isViewed: false } } }
)

// 3. Marca todos los mensajes de un chat como vistos
db.Chat.updateOne(
  { _id: "idChatEjemplo" },
  { $set: { "messages.$[].isViewed": true } }
)

// Relación entre colecciones

// 1. Encuentra todas las notificaciones relacionadas con usuarios que tienen mensajes en un chat específico
db.Notification.find({
  receiverUsername: { $in: db.Chat.distinct("messages.receiver", { _id: "idChatEjemplo" }) }
})

// 2. Obtén todas las calificaciones de las compañías relacionadas con un chat específico
db.Rating.find({
  companyId: { $in: db.Chat.distinct("solicitud_id", { _id: "idChatEjemplo" }) }
})
