import React, { useState, useEffect } from 'react';
import axios from '../../configs/AxiosConfig';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Box, Typography, TextField, List, ListItem, ListItemText, Paper } from '@mui/material';

interface Company {
  id: string;
  name: string;
  description: string;
}

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate(); // Para navegar entre páginas

  // Aquí debes declarar los hooks dentro del componente
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [singleCompany, setSingleCompany] = useState<Company | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`/companies/services/${serviceId}`);
        if (Array.isArray(response.data)) {
          setCompanies(response.data);
          setFilteredCompanies(response.data);
        } else if (response.data && typeof response.data === 'object') {
          setSingleCompany(response.data);
        } else {
          setMessage('La respuesta del servidor no es válida.');
          console.error('Respuesta inesperada:', response.data);
        }
      } catch (error) {
        if (error instanceof Error) {
          if ('response' in error && typeof error.response === 'object') {
            setMessage((error.response as any)?.data?.message || 'Error al obtener compañías');
          } else {
            setMessage(error.message || 'Error al obtener compañías');
          }
        } else {
          setMessage('Error desconocido');
        }
        console.error('Error al obtener compañías:', error);
      }
    };

    fetchCompanies();
  }, [serviceId]);

  const handleSearchChange = (e: any) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = companies.filter(company =>
      company.name.toLowerCase().includes(value)
    );
    setFilteredCompanies(filtered);
  };

  const handleCompanyClick = (companyId: any) => {
    navigate(`/client/company-details/${companyId}/${serviceId}`);
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f4f6f8', borderRadius: 2, marginBottom: 3 }}>
      <Typography variant='h4' sx={{ marginBottom: 3, fontWeight: 'bold', color: '#4392f1' }}>
        Compañías que ofrecen el servicio
      </Typography>

      <Button
        variant='outlined'
        onClick={() => navigate(-1)}
        sx={{ marginBottom: 3, padding: '10px 15px', cursor: 'pointer' }}
      >
        Atrás
      </Button>

      {message && (
        <Typography variant='body1' color='error' sx={{ marginBottom: 2 }}>
          {message}
        </Typography>
      )}

      {Array.isArray(companies) && (
        <TextField
          label='Buscar compañías...'
          variant='outlined'
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ marginBottom: 3 }}
        />
      )}

      <List sx={{ marginBottom: 3 }}>
        {Array.isArray(filteredCompanies) && filteredCompanies.map(company => (
          <ListItem
            key={company.id}
            onClick={() => handleCompanyClick(company.id)}
            sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f1f1f1' } }}
          >
            <ListItemText primary={company.name} sx={{ color: '#4392f1' }} />
          </ListItem>
        ))}
      </List>

      {singleCompany && (
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant='h5' sx={{ marginBottom: 2 }}>
            Compañía:
          </Typography>
          <Typography><strong>Nombre:</strong> {singleCompany.name}</Typography>
          <Typography><strong>Descripción:</strong> {singleCompany.description}</Typography>
        </Paper>
      )}
    </Box>
  );
};

export default ServiceDetails;
