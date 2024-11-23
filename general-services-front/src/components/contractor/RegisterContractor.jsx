import { useEffect, useState, React } from 'react';
import axios from '../../configs/AxiosConfig';
import useUsername from '../../hooks/useUsername';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, TextField } from "@mui/material";


const RegisterContractor = () => {
  const { username, error: usernameError } = useUsername();
  const [companyId, setCompanyId] = useState(null);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Obtener contratistas por userId del dueño de la compañía
  useEffect(() => {
    console.log("username:", username);
    if (!username) return;

    axios.get(`companies/owner/${username}`)
      .then(response => {
        setCompanyId(response.data.id);
        console.log("Respuesta del backend:", response);
      })
      .catch(err => {
        setError('Error al obtener la compañía');
        console.error(err);
      });
  }, [username]);

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!companyId) {
      setError('No se ha podido obtener el ID de la compañía.');
      return;
    }

    // Crear el contratista con los datos del formulario
    const contractorData = {
      name,
      companyId,
      available: true,
      status: true
    };

    axios.post('contractors', contractorData)
      .then(() => {
        setSuccess('Contratista creado exitosamente!');
        setName(''); // Limpiar el campo de nombre
        navigate(-1);
      })
      .catch(err => {
        setError('Error al crear el contratista');
        console.error(err);
      });
  };

  // Validación de errores y éxito
  if (usernameError) {
    return <div>{usernameError}</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (success) {
    return <div>{success}</div>;
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f4f6f8", borderRadius: 2, maxWidth: 500, marginTop: 3, margin: "auto" }}>
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold", color: "#4392f1", textAlign: "center" }}>
        Crear Contratista
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ marginBottom: 3 }}>
          <TextField
            fullWidth
            label="Nombre del Contratista"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate(-1)}
          >
            Atrás
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
          >
            Crear Contratista
          </Button>
        </Box>
      </form>
    </Box>
  );


};

export default RegisterContractor;
