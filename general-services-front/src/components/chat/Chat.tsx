// src/components/chat/Chat.js
import React, { useState, useEffect, useRef } from "react";
import axios from "../../configs/AxiosConfig";
import { useParams } from "react-router-dom"; // Importar useParams para acceder a los parámetros de la URL
import { Box, Typography, TextField, Button } from "@mui/material";
import useUsername from "../../hooks/useUsername";
import {
  Paper,
  List,
  ListItem,
} from "@mui/material";

import StompService from "../../Utils/StompService";

const Chat = () => {
  const { solicitudId } = useParams(); // Obtener el ID de la solicitud desde la URL
  const { username } = useUsername();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [receiver, setReceiver] = useState("");
  const lastMessageRef = useRef(null);


  useEffect(() => {
    // Obtener los mensajes del chat de la solicitud
    axios
      .get(`/chats/${solicitudId}/messages`)
      .then((response) => {
        console.log("Mensajes del chat:", response.data);
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los mensajes del chat:", error);
      });
  }, [solicitudId]); // Dependencia en solicitudId para recargar si cambia

  useEffect(() => {
    if (lastMessageRef.current) {
      // @ts-expect-error TS(2339): Property 'scrollIntoView' does not exist on type '... Remove this comment to see the full error message
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  useEffect(() => {
    // Obtener el username del receptor basado en el rol del usuario actual
    const userRoles = sessionStorage.getItem("roles");
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    if (userRoles.includes("ALL-CLIENT")) {
      // Si el usuario es cliente, obtener el username de la compañía
      axios
        .get(`companies/owner/username/by-solicitud/${solicitudId}`)
        .then((response) => {
          setReceiver(response.data);
          console.log("Receiver ALLCLIENT:---------------------------- ", response.data);
        })
        .catch((error) => {
          console.error("Error al obtener el username del receptor:", error);
        });
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    } else if (userRoles.includes("ALL-COMPANY")) {
      // Si el usuario es compañía, obtener el username del cliente
      axios
        .get(`requests/${solicitudId}`)
        .then((response) => {
          const userId = response.data.userId;
          // Obtener el username del cliente usando el userId
          axios
            .get(`/users/${userId}`)
            .then((userResponse) => {
              setReceiver(userResponse.data.username);
              console.log("Receiver:---------------------------- ", userResponse.data.username);

            })
            .catch((error) => {
              console.error("Error al obtener el username del cliente:", error);
            });
        })
        .catch((error) => {
          console.error("Error al obtener el username del cliente:", error);
        });
    }
  }, [solicitudId]);

  useEffect(() => {
    if (!username || !solicitudId) return;

    const onChatMessageReceived = (message: any) => {
      const newMessage = JSON.parse(message.body);
      // @ts-expect-error TS(2345): Argument of type '(prevMessages: never[]) => any[]... Remove this comment to see the full error message
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    StompService.subscribeToChat(username, solicitudId, onChatMessageReceived);

    return () => {
      StompService.unsubscribe(`chat_${username}_${solicitudId}`);
    };
  }, [username, solicitudId]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !solicitudId || !username || !receiver) {
      console.error("Faltan datos para enviar el mensaje.");
      return;
    }

    // Enviar el nuevo mensaje
    const message = {
      solicitudId,
      sender: username, // Debes obtener el usuario actual
      receiver: receiver, // El receptor del mensaje
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    axios
      .post(`/chats/${solicitudId}/messages`, message)
      .then((response) => {
        // @ts-expect-error TS(2322): Type 'any' is not assignable to type 'never'.
        setMessages([...messages, response.data]);
        setNewMessage("");
      })
      .catch((error) => {
        console.error("Error al enviar el mensaje:", error);
      });
  };


  // Función para formatear la hora
  const formatTimestamp = (timestamp: any) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes()}`;
  };

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#f0f4f8",
        borderRadius: 3,
        maxWidth: 600,
        margin: "auto",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          marginBottom: 3,
          color: "#1976d2",
          textAlign: "center",
        }}
      >
        Chat de la Solicitud {solicitudId}
      </Typography>

      {/* Contenedor de mensajes */}
      <Paper
        sx={{
          padding: 2,
          maxHeight: 450,
          overflowY: "auto",
          marginBottom: 2,
          backgroundColor: "#ffffff",
          borderRadius: 3,
        }}
      >
        <List>
          {messages.map((msg, index) => (
            <ListItem
              key={index}
              ref={index === messages.length - 1 ? lastMessageRef : null} // Asigna la referencia al último mensaje
              sx={{
                display: "flex",
                justifyContent:
                  // @ts-expect-error TS(2339): Property 'sender' does not exist on type 'never'.
                  msg.sender === username ? "flex-end" : "flex-start",
                marginBottom: 2,
              }}
            >
              <Box
                sx={{
                  backgroundColor:
                    // @ts-expect-error TS(2339): Property 'sender' does not exist on type 'never'.
                    msg.sender === username ? "#e3f2fd" : "#f1f5f9",
                  borderRadius: 3,
                  padding: 2,
                  maxWidth: "80%",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    bottom: -10,
                    // @ts-expect-error TS(2339): Property 'sender' does not exist on type 'never'.
                    ...(msg.sender === username
                      ? { right: 10, borderLeft: "10px solid #e3f2fd" }
                      : { left: 10, borderRight: "10px solid #f1f5f9" }),
                    borderTop: "10px solid transparent",
                    borderBottom: "10px solid transparent",
                  },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    // @ts-expect-error TS(2339): Property 'sender' does not exist on type 'never'.
                    color: msg.sender === username ? "#1976d2" : "#2c3e50",
                    marginBottom: 0.5,
                  }}
                >
                  // @ts-expect-error TS(2339): Property 'sender' does not exist on type 'never'.
                  {msg.sender}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#455a64",
                    marginBottom: 1,
                  }}
                >
                  // @ts-expect-error TS(2339): Property 'content' does not exist on type 'never'.
                  {msg.content}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#90a4ae",
                    display: "block",
                    textAlign: "right",
                  }}
                >
                  // @ts-expect-error TS(2339): Property 'timestamp' does not exist on type 'never... Remove this comment to see the full error message
                  {formatTimestamp(msg.timestamp)}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Campo para enviar mensajes */}
      <TextField
        label="Escribe un mensaje"
        fullWidth
        multiline
        rows={4}
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
            setNewMessage(""); // Limpiar el campo de mensaje después de enviarlo
          }
        }}
        sx={{
          marginBottom: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
            "&.Mui-focused fieldset": {
              borderColor: "#1976d2",
            },
          },
        }}
        variant="outlined"
      />

      {/* Botón para enviar el mensaje */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => {
          // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
          handleSendMessage(newMessage);
          setNewMessage("");
        }}
        sx={{
          borderRadius: 3,
          padding: 1.5,
          textTransform: "none",
          fontWeight: 600,
          boxShadow: "0 3px 5px rgba(0,0,0,0.1)",
          "&:hover": {
            backgroundColor: "#1565c0",
          },
        }}
      >
        Enviar Mensaje
      </Button>
    </Box>
  );
};

export default Chat;
