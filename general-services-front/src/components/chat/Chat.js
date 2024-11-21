// src/components/chat/Chat.js
import React, { useState, useEffect } from "react";
import axios from "../../configs/AxiosConfig";
import { useParams } from "react-router-dom"; // Importar useParams para acceder a los parámetros de la URL
import { Box, Typography, TextField, Button } from "@mui/material";

const Chat = () => {
  const { solicitudId } = useParams(); // Obtener el ID de la solicitud desde la URL
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Obtener los mensajes del chat de la solicitud
    axios
      .get(`/chats/${solicitudId}/messages`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los mensajes del chat:", error);
      });
  }, [solicitudId]); // Dependencia en solicitudId para recargar si cambia

  const handleSendMessage = () => {
    // Enviar el nuevo mensaje
    const message = {
      solicitudId,
      sender: "usuario", // Debes obtener el usuario actual
      receiver: "contratista", // El receptor del mensaje
      content: newMessage,
    };

    axios
      .post(`/chats/${solicitudId}/messages`, message)
      .then((response) => {
        setMessages([...messages, response.data]);
        setNewMessage("");
      })
      .catch((error) => {
        console.error("Error al enviar el mensaje:", error);
      });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5">Chat de la Solicitud {solicitudId}</Typography>
      <Box sx={{ marginTop: 2 }}>
        {messages.map((msg, index) => (
          <Box key={index} sx={{ marginBottom: 2 }}>
            <Typography variant="body1">
              <strong>{msg.sender}:</strong> {msg.content}
            </Typography>
          </Box>
        ))}
      </Box>
      <TextField
        label="Escribe un mensaje"
        fullWidth
        multiline
        rows={4}
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" onClick={handleSendMessage}>
        Enviar
      </Button>
    </Box>
  );
};

export default Chat;
