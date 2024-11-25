import React, { useEffect, useState } from 'react';
import axios from '../../configs/AxiosConfig';
import useUsername from '../../hooks/useUsername';
import { format, parseISO } from 'date-fns';

import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const BillingHistory = () => {
  const { username, error: usernameError } = useUsername();
  const [userId, setUserId] = useState(null);
  interface Billing {
    id: number;
    requestId: number;
    contractorId: number;
    amount: number;
    paymentDate: string;
    paymentMethod: string;
  }

  interface Contractor {
    id: number;
    name: string;
  }

  interface Request {
    id: number;
  }

  const [billings, setBillings] = useState<Billing[]>([]);
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Paso 1: Obtener el userId a partir del username
  useEffect(() => {
    if (!username) return;

    axios.get(`/users/username/${username}`)
      .then(response => setUserId(response.data))
      .catch(err => {
        const message = err.response?.data?.message || 'Error al obtener el ID del usuario';
        setError(message);
        console.error('Error:', message);
      });
  }, [username]);

  // Paso 2: Obtener facturas asociadas al usuario
  useEffect(() => {
    if (!userId) return;

    axios.get(`/billings/user/${userId}`)
      .then(response => {
        setBillings(response.data);

        // Obtener las solicitudes y contratistas asociadas a las facturas
        const requestIds = [...new Set(response.data.map((billing: any) => billing.requestId))];
        const contractorIds = [...new Set(response.data.map((billing: any) => billing.contractorId))];

        // Obtener las solicitudes utilizando GET
        requestIds.forEach(requestId => {
          axios.get(`/requests/${requestId}`)
            .then(res => {

              setRequests(prevRequests => [...prevRequests, res.data]);
            })
            .catch(err => console.error('Error al obtener solicitud:', err));
        });

        // Obtener los contratistas utilizando GET
        contractorIds.forEach(contractorId => {
          axios.get(`/contractors/${contractorId}`)
            .then(res => {
              setContractors(prevContractors => [...prevContractors, res.data]);
            })
            .catch(err => console.error('Error al obtener contratista:', err));
        });
      })
      .catch(err => {
        const message = err.response?.data?.message || 'Error al obtener las facturas del usuario';
        setError(message);
        console.error('Error:', message);
      });
  }, [userId]);

  // Funciones auxiliares para obtener datos relacionados
  const getContractorName = (contractorId: any) => {

    const contractor = contractors.find(c => c.id === contractorId);

    return contractor ? contractor.name : 'No disponible';
  };

  const getRequestId = (requestId: any) => {

    const request = requests.find(r => r.id === requestId);

    return request ? request.id : 'No disponible';
  };

  if (billings.length === 0) {
    return (
      <Box sx={{ padding: 3, backgroundColor: '#f4f6f8', borderRadius: 2, marginBottom: 1 }}>
        <Typography variant='h6' color='error' gutterBottom>
          No tienes facturas en tu historial aún.
        </Typography>
      </Box>
    );
  }

  // Renderizado
  if (usernameError) {
    return <div>{usernameError}</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f4f6f8', borderRadius: 2, marginBottom: 1 }}>
      <Typography variant='h4' gutterBottom sx={{ fontWeight: 'bold', color: '#4392f1' }}>
        Mis Facturas
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#ece8ef' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Solicitud</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Contratista</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Monto</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Fecha de Pago</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Método de Pago</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4392f1' }}>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {billings.map(billing => (

              <TableRow key={billing.id}>
                <TableCell>{billing.id}</TableCell>
                <TableCell>{getRequestId(billing.requestId)}</TableCell>
                <TableCell>{getContractorName(billing.contractorId)}</TableCell>
                <TableCell>${billing.amount.toFixed(2)}</TableCell>
                <TableCell>{format(parseISO(billing.paymentDate), 'dd/MM/yyyy')}</TableCell>
                <TableCell>{billing.paymentMethod}</TableCell>
                <TableCell>
                  <Button
                    variant='contained'
                    color='primary'

                    onClick={() => navigate(`/client/comment/${billing.contractorId}`)}
                  >
                    Agregar Comentario
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BillingHistory;
