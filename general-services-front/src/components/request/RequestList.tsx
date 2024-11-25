import React, { useEffect, useState } from "react";
import axios from "../../configs/AxiosConfig";
import useUsername from "../../hooks/useUsername";
import { format, parseISO } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
  ButtonGroup,
  Paper,
  TableContainer,
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Collapse,
  IconButton,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { ChatBubbleOutline } from "@mui/icons-material";

import {
  fetchUserIdByUsername,
  fetchUserRequests,
  fetchRelatedData,
  cancelRequest,
  setFilter,
} from "../../store/slices/requestsSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store"; // Import AppDispatch


interface Request {
  id: string;
  serviceId: string;
  contractorId: string;
  companyId: string;
  date: string;
  status: string;
}

interface Contractor {
  id: string;
  name: string;
}

interface Service {
  id: string;
  name: string;
}

interface Company {
  id: string;
  name: string;
  description: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  email: string;
}

interface RootState {
  requests: {
    userId: string | null;
    requests: Request[];
    contractors: Contractor[];
    services: Service[];
    companies: Company[];
    filter: string;
    error: string | null;
    status: string;
  };
}




const UserRequestList = () => {


  const dispatch: AppDispatch = useDispatch();
  const { username, error: usernameError } = useUsername();
  const [expandedRequestId, setExpandedRequestId] = useState(null);
  const [companyInfo, setCompanyInfo] = useState<Record<string, Company>>({});

  const {
    userId,
    requests,
    contractors,
    services,
    companies,
    filter,
    error,
    status,
  } = useSelector((state: RootState) => state.requests);

  const navigate = useNavigate();

  const fetchCompanyInfo = async (companyIds: string[]): Promise<void> => {
    try {
      const response = await axios.post("/companies/by-ids", { companyIds });
      const companiesData: Company[] = response.data;
      const companiesMap = companiesData.reduce((acc: Record<string, Company>, company) => {
        acc[company.id] = company;
        return acc;
      }, {});
      setCompanyInfo(companiesMap);
    } catch (error) {
      console.error("Error al obtener la información de las compañías:", error);
    }
  };


  useEffect(() => {
    if (requests.length > 0) {
      const companyIds = [
        ...new Set(requests.map((request: any) => request.companyId)),
      ];
      fetchCompanyInfo(companyIds);
    }
  }, [requests]);

  useEffect(() => {
    if (username) {

      dispatch(fetchUserIdByUsername(username));
    }
  }, [username, dispatch]);

  useEffect(() => {
    if (userId) {

      dispatch(fetchUserRequests(userId));
    }
  }, [userId, dispatch]);

  // Obtener datos relacionados cuando tengamos las solicitudes
  useEffect(() => {
    if (requests.length > 0) {

      dispatch(fetchRelatedData(requests));
    }
  }, [requests.length, dispatch]);

  const getContractorName = (contractorId: string): string => {
    const contractor = contractors.find((c) => c.id === contractorId);
    return contractor ? contractor.name : "No disponible";
  };

  const getServiceName = (serviceId: string): string => {
    const service = services.find((s) => s.id === serviceId);
    return service ? service.name : "No disponible";
  };

  const getCompanyName = (companyId: string): string => {
    const company = companies.find((c) => c.id === companyId);
    return company ? company.name : "No disponible";
  };


  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const handleCancel = (requestId: any) => {
    setSelectedRequestId(requestId);
    setCancelDialogOpen(true);
  };

  const confirmCancel = () => {
    if (selectedRequestId) {
      dispatch(cancelRequest(selectedRequestId));
    }
    setCancelDialogOpen(false);
  };

  const handleFilterChange = (newFilter: any) => {
    dispatch(setFilter(newFilter));
  };

  const filteredRequests =
    filter === "All"
      ? requests
      : requests.filter((request: any) => request.status === filter);

  // Manejo de estados
  if (usernameError) {
    return <div>{usernameError}</div>;
  }

  if (status === "loading") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="primary" />
        <Typography
          sx={{ marginLeft: 2, color: "#4392f1", fontWeight: "bold" }}
        >
          Cargando...
        </Typography>
      </Box>
    );
  }

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

  if (error) {
    return <div>www{error}</div>;
  }

  const handleToggleExpand = (requestId: any) => {
    // Si la solicitud ya está expandida, la colapsamos; si no, la expandimos
    setExpandedRequestId(expandedRequestId === requestId ? null : requestId);
  };

  const getStatusColor = (status: any) => {
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
        Mis Solicitudes
      </Typography>

      <Box mb={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/client/home")}
          sx={{ marginRight: 2, padding: "10px 15px" }}
        >
          Crear Nueva Solicitud
        </Button>
      </Box>

      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Filtrar por estado:
      </Typography>
      <Box mb={3}>
        <ButtonGroup variant="outlined" fullWidth>
          <Button
            onClick={() => handleFilterChange("All")}
            sx={
              filter === "All"
                ? { color: "#fff", backgroundColor: "#4392f1" }
                : { color: "#4392f1" }
            }
          >
            Todos
          </Button>
          <Button
            onClick={() => handleFilterChange("Pendiente")}
            sx={
              filter === "Pendiente"
                ? { color: "#fff", backgroundColor: "#4392f1" }
                : { color: "#4392f1" }
            }
          >
            Pendiente
          </Button>
          <Button
            onClick={() => handleFilterChange("En Progreso")}
            sx={
              filter === "En Progreso"
                ? { color: "#fff", backgroundColor: "#4392f1" }
                : { color: "#4392f1" }
            }
          >
            En Progreso
          </Button>
          <Button
            onClick={() => handleFilterChange("Completada")}
            sx={
              filter === "Completada"
                ? { color: "#fff", backgroundColor: "#4392f1" }
                : { color: "#4392f1" }
            }
          >
            Completada
          </Button>
          <Button
            onClick={() => handleFilterChange("Cancelada")}
            sx={
              filter === "Cancelada"
                ? { color: "#fff", backgroundColor: "#4392f1" }
                : { color: "#4392f1" }
            }
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
                Compañía
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
            {filteredRequests.map((request: any) => <React.Fragment key={request.id}>
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
                <TableCell>{getCompanyName(request.companyId)}</TableCell>
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
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleCancel(request.id)}
                      sx={{ padding: "5px 10px" }}
                    >
                      Cancelar
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      const userRoles = sessionStorage.getItem("roles"); // Obtener los roles del usuario

                      if (userRoles && userRoles.includes("ALL-CLIENT")) {
                        navigate(`/client/chat/${request.id}`); // Redirigir a la ruta del chat del cliente
                      } else if (userRoles && userRoles.includes("ALL-COMPANY")) {
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
                  colSpan={7}
                >
                  <Collapse
                    in={expandedRequestId === request.id}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Box
                      sx={{
                        padding: 2,
                        borderColor: "divider",
                        borderRadius: 2,
                        backgroundColor: "background.paper",
                      }}
                    >
                      <Typography
                        variant="h6"
                        color="primary.main"
                        sx={{ fontWeight: "bold", marginBottom: 2 }}
                      >
                        Información de la Compañía
                      </Typography>

                      {companyInfo[request.companyId] ? (
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

                            {companyInfo[request.companyId].name}
                          </Typography>

                          <Typography
                            component="dt"
                            variant="body2"
                            sx={{ fontWeight: "bold", color: "text.primary" }}
                          >
                            Descripción:
                          </Typography>
                          <Typography component="dd" variant="body2">

                            {companyInfo[request.companyId].description}
                          </Typography>

                          <Typography
                            component="dt"
                            variant="body2"
                            sx={{ fontWeight: "bold", color: "text.primary" }}
                          >
                            Teléfono:
                          </Typography>
                          <Typography component="dd" variant="body2">

                            {companyInfo[request.companyId].phone}
                          </Typography>

                          <Typography
                            component="dt"
                            variant="body2"
                            sx={{ fontWeight: "bold", color: "text.primary" }}
                          >
                            Dirección:
                          </Typography>
                          <Typography component="dd" variant="body2">

                            {companyInfo[request.companyId].address}
                          </Typography>

                          <Typography
                            component="dt"
                            variant="body2"
                            sx={{ fontWeight: "bold", color: "text.primary" }}
                          >
                            Ciudad:
                          </Typography>
                          <Typography component="dd" variant="body2">

                            {companyInfo[request.companyId].city}
                          </Typography>

                          <Typography
                            component="dt"
                            variant="body2"
                            sx={{ fontWeight: "bold", color: "text.primary" }}
                          >
                            Estado:
                          </Typography>
                          <Typography component="dd" variant="body2">

                            {companyInfo[request.companyId].state}
                          </Typography>

                          <Typography
                            component="dt"
                            variant="body2"
                            sx={{ fontWeight: "bold", color: "text.primary" }}
                          >
                            País:
                          </Typography>
                          <Typography component="dd" variant="body2">

                            {companyInfo[request.companyId].country}
                          </Typography>

                          <Typography
                            component="dt"
                            variant="body2"
                            sx={{ fontWeight: "bold", color: "text.primary" }}
                          >
                            Código Postal:
                          </Typography>
                          <Typography component="dd" variant="body2">

                            {companyInfo[request.companyId].zipCode}
                          </Typography>

                          <Typography
                            component="dt"
                            variant="body2"
                            sx={{ fontWeight: "bold", color: "text.primary" }}
                          >
                            Email:
                          </Typography>
                          <Typography component="dd" variant="body2">

                            {companyInfo[request.companyId].email}
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
            </React.Fragment>)}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
      >
        <DialogTitle>Confirmar Cancelación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas cancelar esta solicitud? Esta acción no
            puede deshacerse.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmCancel} color="primary" variant="contained">
            Confirmar
          </Button>
          <Button
            onClick={() => setCancelDialogOpen(false)}
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

export default UserRequestList;
