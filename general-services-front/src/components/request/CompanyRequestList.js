import React, { useEffect, useState } from "react";
// Import de Material-UI y otros
import {
  Button, Table, TableBody, TableCell, TableHead, TableRow, Typography,
  Box, ButtonGroup, Paper, TableContainer, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, Alert, IconButton,
  Collapse, CircularProgress
} from "@mui/material";
import { ChatBubbleOutline, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

// Import de librerías y hooks

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";

// Import de configuraciones, hooks y componentes locales
import axios from "../../configs/AxiosConfig";
import useUsername from "../../hooks/useUsername";
import BillingForm from "../billing/BillingForm";
import ContractorToAssignList from "../contractor/ContractorAssignList";

import {
  fetchCompanyRequests,
  fetchAvailableContractors,
  fetchRelatedData,
  acceptRequest,
  rejectRequest,
  cancelCompanyRequest,
  completeRequest,
  setFilter,
  setShowBillingForm,
  setShowContractorList,
  setSelectedRequestId,
} from "../../store/slices/requestsSlice";

const CompanyRequestList = () => {
  const dispatch = useDispatch();
  const { username, error: usernameError } = useUsername();

  const {
    requests,
    contractors,
    services,
    availableContractors,
    filter,
    error,
    status,
    showBillingForm,
    showContractorList,
    selectedRequestId,
  } = useSelector((state) => state.requests);

  const navigate = useNavigate(); // Para redirigir a la página de chat

  const [userNames, setUserNames] = useState({});
  const [expandedRequestId, setExpandedRequestId] = useState(null); // Estado para manejar la solicitud expandida

  const fetchUserNames = async (userIds) => {
    try {
      const response = await axios.post("/users/by-ids", userIds);
      const users = response.data.reduce((acc, user) => {
        acc[user.id] = user; // Almacenar toda la información del usuario
        return acc;
      }, {});
      setUserNames(users);
    } catch (error) {
      console.error("Error al obtener los nombres de los solicitantes:", error);
    }
  };

  useEffect(() => {
    if (requests.length > 0) {
      const userIds = [...new Set(requests.map((request) => request.userId))];
      fetchUserNames(userIds);
    }
  }, [requests]);

  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [selectedRequestToCancel, setSelectedRequestToCancel] = useState(null);
  const [isRejectAction, setIsRejectAction] = useState(false);

  useEffect(() => {
    const fetchCompanyRequests = async (username) => {
      try {
        const response = await axios.get(`requests/company/owner/${username}`);
        // Manejar la respuesta aquí, por ejemplo, actualizando el estado local
        console.log(response.data);
      } catch (error) {
        console.error("Error al obtener las solicitudes de la compañía:", error);
      }
    };
  
    if (username) {
      fetchCompanyRequests(username);
    }
  }, [username]);

  useEffect(() => {
    if (requests.length > 0) {
      dispatch(fetchRelatedData(requests));
    }
  }, [requests, dispatch]);

  const getContractorName = (contractorId) => {
    const contractor = contractors.find((c) => c.id === contractorId);
    return contractor ? contractor.name : "No disponible";
  };

  const getServiceName = (serviceId) => {
    const service = services.find((s) => s.id === serviceId);
    return service ? service.name : "No disponible";
  };

  const handleCancel = (requestId) => {
    setSelectedRequestToCancel(requestId);
    setIsRejectAction(false);
    setOpenCancelDialog(true);
  };


  const handleComplete = (requestId) => {
    dispatch(setSelectedRequestId(requestId));
    dispatch(setShowBillingForm(true));
  };

  const handleBillingComplete = async () => {
    dispatch(completeRequest(selectedRequestId));
  };

  const handleAccept = (requestId) => {
    dispatch(fetchAvailableContractors(username));
    dispatch(setSelectedRequestId(requestId));
    dispatch(setShowContractorList(true));
  };

  const handleContractorSelect = (contractorId) => {
    dispatch(
      acceptRequest({
        requestId: selectedRequestId,
        contractorId,
      })
    );
  };

  const handleReject = (requestId) => {
    setSelectedRequestToCancel(requestId);
    setIsRejectAction(true);
    setOpenCancelDialog(true);
  };


  const handleFilterChange = (status) => {
    dispatch(setFilter(status));
  };

  const filteredRequests =
    filter === "All"
      ? requests
      : requests.filter((request) => request.status === filter);

  const handleToggleExpand = (requestId) => {
    // Si la solicitud ya está expandida, la colapsamos; si no, la expandimos
    setExpandedRequestId(expandedRequestId === requestId ? null : requestId);
  };

  if (usernameError) {
    return <div>{usernameError}</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (status === 'loading') {
    return <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <CircularProgress color="primary" />
      <Typography sx={{ marginLeft: 2, color: "#4392f1", fontWeight: "bold" }}>
        Cargando...
      </Typography>
    </Box>;

  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Pendiente":
        return "#fbc02d"; // Amarillo
      case "En Progreso":
        return "#2196f3"; // Azul
      case "Completada":
        return "#4caf50"; // Verde
      case "Cancelada":
        return "#e57373"; // Rojo
      default:
        return "#000"; // Negro o color por defecto
    }
  };

  if (requests.length === 0) {
    return (
      <Box sx={{ padding: 3, textAlign: "center", marginTop: 4 }}>
        <Alert
          severity="info"
          sx={{
            backgroundColor: "#e3f2fd",
            color: "#1976d2",
            fontWeight: "bold",
            fontSize: "1.2rem",
            maxWidth: 600,
            margin: "0 auto",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          No tienes solicitudes en tu historial. Para hacer una nueva solicitud
          ve a la pestaña de Home.
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#f4f6f8",
        borderRadius: 2,
        marginBottom: 1,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#4392f1" }}
      >
        Solicitudes de la Compañía
      </Typography>

      <Box mb={3}>
        <ButtonGroup variant="outlined" fullWidth>
          <Button
            onClick={() => handleFilterChange("All")}
            sx={{
              color: filter === "All" ? "#fff" : "#4392f1",
              backgroundColor: filter === "All" ? "#4392f1" : "transparent",
              borderColor: "#4392f1",
              "&:hover": {
                backgroundColor: filter === "All" ? "#357ae8" : "transparent",
              },
            }}
          >
            Todos
          </Button>
          <Button
            onClick={() => handleFilterChange("Pendiente")}
            sx={{
              color: filter === "Pendiente" ? "#fff" : "#4392f1",
              backgroundColor:
                filter === "Pendiente" ? "#4392f1" : "transparent",
              borderColor: "#4392f1",
              "&:hover": {
                backgroundColor:
                  filter === "Pendiente" ? "#357ae8" : "transparent",
              },
            }}
          >
            Pendiente
          </Button>
          <Button
            onClick={() => handleFilterChange("En Progreso")}
            sx={{
              color: filter === "En Progreso" ? "#fff" : "#4392f1",
              backgroundColor:
                filter === "En Progreso" ? "#4392f1" : "transparent",
              borderColor: "#4392f1",
              "&:hover": {
                backgroundColor:
                  filter === "En Progreso" ? "#357ae8" : "transparent",
              },
            }}
          >
            En Progreso
          </Button>
          <Button
            onClick={() => handleFilterChange("Completada")}
            sx={{
              color: filter === "Completada" ? "#fff" : "#4392f1",
              backgroundColor:
                filter === "Completada" ? "#4392f1" : "transparent",
              borderColor: "#4392f1",
              "&:hover": {
                backgroundColor:
                  filter === "Completada" ? "#357ae8" : "transparent",
              },
            }}
          >
            Completada
          </Button>
          <Button
            onClick={() => handleFilterChange("Cancelada")}
            sx={{
              color: filter === "Cancelada" ? "#fff" : "#4392f1",
              backgroundColor:
                filter === "Cancelada" ? "#4392f1" : "transparent",
              borderColor: "#4392f1",
              "&:hover": {
                backgroundColor:
                  filter === "Cancelada" ? "#357ae8" : "transparent",
              },
            }}
          >
            Cancelada
          </Button>
        </ButtonGroup>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#ece8ef" }}>
            <TableRow>
              <TableCell />
              <TableCell sx={{ fontWeight: "bold", color: "#4392f1" }}>
                ID
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#4392f1" }}>
                Servicio
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#4392f1" }}>
                Contratista
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#4392f1" }}>
                Solicitante
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#4392f1" }}>
                Fecha
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#4392f1" }}>
                Estado
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#4392f1" }}>
                Acciones
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#4392f1" }}>
                Chat
              </TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequests.map((request) => (
              <React.Fragment key={request.id}>
                <TableRow onClick={() => handleToggleExpand(request.id)}>
                  <TableCell>
                    <IconButton>
                      {expandedRequestId === request.id ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>{request.id}</TableCell>
                  <TableCell>{getServiceName(request.serviceId)}</TableCell>
                  <TableCell>
                    {getContractorName(request.contractorId)}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {userNames[request.userId]
                      ? `${userNames[request.userId].name} ${userNames[request.userId].lastName
                      }`
                      : "No disponible"}
                  </TableCell>
                  <TableCell>
                    {format(parseISO(request.date), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: getStatusColor(request.status),
                    }}
                  >
                    {request.status}
                  </TableCell>
                  <TableCell>
                    {request.status === "Pendiente" && (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleAccept(request.id)}
                          sx={{ marginRight: 1 }}
                        >
                          Aceptar
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleReject(request.id)}
                        >
                          Rechazar
                        </Button>
                      </>
                    )}
                    {request.status === "En Progreso" && (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleComplete(request.id)}
                          sx={{ marginRight: 1 }}
                        >
                          Completar
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleCancel(request.id)}
                        >
                          Cancelar
                        </Button>
                      </>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        const userRoles = sessionStorage.getItem("roles"); // Obtener los roles del usuario
                        if (userRoles.includes("ALL-CLIENT")) {
                          navigate(`/client/chat/${request.id}`); // Redirigir a la ruta del chat del cliente
                        } else if (userRoles.includes("ALL-COMPANY")) {
                          navigate(`/company/chat/${request.id}`); // Redirigir a la ruta del chat de la compañía
                        } else {
                          navigate("/login"); // Si no tiene rol, redirigir a login
                        }
                      }} // Redirigir al chat
                      sx={{ color: "#4392f1" }}
                    >
                      <ChatBubbleOutline />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={8}
                  >
                    <Collapse
                      in={expandedRequestId === request.id}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box
                        sx={{
                          padding: 2,
                          borderRadius: 2,
                          backgroundColor: "background.paper",
                          marginBottom: 2,
                        }}
                      >
                        <Typography
                          variant="h6"
                          color="primary.main"
                          sx={{ fontWeight: "bold", marginBottom: 2 }}
                        >
                          Descripción de la Solicitud
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{ marginBottom: 3 }}
                        >
                          {request.description}
                        </Typography>

                        <Typography
                          variant="h6"
                          color="primary.main"
                          sx={{ fontWeight: "bold", marginBottom: 2 }}
                        >
                          Información del Usuario Solicitante
                        </Typography>
                        {userNames[request.userId] ? (
                          <Box
                            component="dl"
                            sx={{
                              display: "grid",
                              gridTemplateColumns: "auto 1fr",
                              gap: 1,
                            }}
                          >
                            <Typography
                              component="dt"
                              variant="body2"
                              sx={{ fontWeight: "bold", color: "text.primary" }}
                            >
                              Nombre:
                            </Typography>
                            <Typography component="dd" variant="body2">
                              {userNames[request.userId].name}
                            </Typography>

                            <Typography
                              component="dt"
                              variant="body2"
                              sx={{ fontWeight: "bold", color: "text.primary" }}
                            >
                              Apellido:
                            </Typography>
                            <Typography component="dd" variant="body2">
                              {userNames[request.userId].lastName}
                            </Typography>

                            <Typography
                              component="dt"
                              variant="body2"
                              sx={{ fontWeight: "bold", color: "text.primary" }}
                            >
                              Email:
                            </Typography>
                            <Typography component="dd" variant="body2">
                              {userNames[request.userId].email}
                            </Typography>

                            <Typography
                              component="dt"
                              variant="body2"
                              sx={{ fontWeight: "bold", color: "text.primary" }}
                            >
                              Teléfono:
                            </Typography>
                            <Typography component="dd" variant="body2">
                              {userNames[request.userId].phone}
                            </Typography>

                            <Typography
                              component="dt"
                              variant="body2"
                              sx={{ fontWeight: "bold", color: "text.primary" }}
                            >
                              Dirección:
                            </Typography>
                            <Typography component="dd" variant="body2">
                              {userNames[request.userId].address}
                            </Typography>

                            <Typography
                              component="dt"
                              variant="body2"
                              sx={{ fontWeight: "bold", color: "text.primary" }}
                            >
                              Ciudad:
                            </Typography>
                            <Typography component="dd" variant="body2">
                              {userNames[request.userId].city}
                            </Typography>

                            <Typography
                              component="dt"
                              variant="body2"
                              sx={{ fontWeight: "bold", color: "text.primary" }}
                            >
                              Estado:
                            </Typography>
                            <Typography component="dd" variant="body2">
                              {userNames[request.userId].state}
                            </Typography>

                            <Typography
                              component="dt"
                              variant="body2"
                              sx={{ fontWeight: "bold", color: "text.primary" }}
                            >
                              País:
                            </Typography>
                            <Typography component="dd" variant="body2">
                              {userNames[request.userId].country}
                            </Typography>

                            <Typography
                              component="dt"
                              variant="body2"
                              sx={{ fontWeight: "bold", color: "text.primary" }}
                            >
                              Código Postal:
                            </Typography>
                            <Typography component="dd" variant="body2">
                              {userNames[request.userId].zipCode}
                            </Typography>
                          </Box>
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            Información no disponible
                          </Typography>
                        )}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showBillingForm && (
        <Box sx={{ marginTop: 3 }}>
          <BillingForm
            show={showBillingForm}
            onClose={() => dispatch(setShowBillingForm(false))}
            requestId={selectedRequestId}
            userId={requests.find((r) => r.id === selectedRequestId)?.userId}
            contractorId={
              requests.find((r) => r.id === selectedRequestId)?.contractorId
            }
            onComplete={handleBillingComplete}
          />
        </Box>
      )}

      {showContractorList && (
        <Box sx={{ marginTop: 3 }}>
          <ContractorToAssignList
            contractors={availableContractors}
            onSelect={handleContractorSelect}
            onClose={() => dispatch(setShowContractorList(false))}
          />
        </Box>
      )}

      <Dialog
        open={openCancelDialog}
        onClose={() => setOpenCancelDialog(false)}
      >
        <DialogTitle>Confirmar Acción</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas realizar esta acción?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              const request = requests.find(
                (r) => r.id === selectedRequestToCancel
              );
              if (request) {
                if (isRejectAction) {
                  dispatch(rejectRequest(selectedRequestToCancel));
                } else {
                  dispatch(
                    cancelCompanyRequest({
                      requestId: selectedRequestToCancel,
                      contractorId: request.contractorId,
                    })
                  );
                }
                setOpenCancelDialog(false);
                setSelectedRequestToCancel(null);
              } else {
                console.error(
                  "No se encontró el contractorId para la solicitud seleccionada."
                );
              }
            }}
            color="primary"
            variant="contained"
          >
            Confirmar
          </Button>
          <Button
            onClick={() => setOpenCancelDialog(false)}
            color="secondary"
            variant="outlined"
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CompanyRequestList;
