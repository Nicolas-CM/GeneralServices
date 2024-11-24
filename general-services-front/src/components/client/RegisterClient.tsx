import React, { useState } from 'react';
import axios from '../../configs/AxiosConfig';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    Alert,
    Box,
} from '@mui/material';

const RegisterClient = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success'); // Control del tipo de mensaje
    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const userRequestDto = {
                username,
                name,
                lastName,
                email,
                password,
                phone,
                address,
                city,
                state,
                country,
                zipCode,
                roleId: 2, // roleID del cliente
            };

            await axios.post('users/register-client', userRequestDto);
            setMessage('Usuario creado exitosamente');
            setMessageType('success');
            setTimeout(() => navigate('/login'), 2000); // Redirigir después de 2 segundos
        } catch (error) {
            // @ts-expect-error TS(2571): Object is of type 'unknown'.
            const errorMsg = error.response?.data?.message || 'Error al crear el usuario';
            setMessage(errorMsg);
            setMessageType('error');
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ padding: 4 }}>
                {/* Título */}
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    Crear Nuevo Cliente
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', mb: 3 }}>
                    Completa los datos para registrar una nueva cuenta como cliente.
                </Typography>

                {/* Formulario */}
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {/* Nombre */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Nombre"
                                fullWidth
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        {/* Apellido */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Apellido"
                                fullWidth
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Grid>
                        {/* Nombre de Usuario */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Nombre de Usuario"
                                fullWidth
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Grid>
                        {/* Correo Electrónico */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Correo Electrónico"
                                type="email"
                                fullWidth
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        {/* Contraseña */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Contraseña"
                                type="password"
                                fullWidth
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        {/* Teléfono */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Teléfono"
                                fullWidth
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Grid>
                        {/* Dirección */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Dirección"
                                fullWidth
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Grid>
                        {/* Ciudad */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Ciudad"
                                fullWidth
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </Grid>
                        {/* Estado */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Estado"
                                fullWidth
                                required
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </Grid>
                        {/* País */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="País"
                                fullWidth
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </Grid>
                        {/* Código Postal */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Código Postal"
                                fullWidth
                                required
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                            />
                        </Grid>
                    </Grid>

                    {/* Botón de registro */}
                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Button variant="contained" color="primary" type="submit" size="large">
                            Crear Usuario
                        </Button>
                    </Box>
                </form>

                {/* Mensaje de estado */}
                {message && (
                    <Box sx={{ mt: 3 }}>
                        // @ts-expect-error TS(2322): Type 'string' is not assignable to type '"success"... Remove this comment to see the full error message
                        <Alert severity={messageType}>{message}</Alert>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default RegisterClient;
