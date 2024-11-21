import { useEffect, useState, React } from 'react';
import axios from '../../configs/AxiosConfig'; // Importar configuración de axios
import useUsername from '../../hooks/useUsername';
import { Box, Button, Typography, CircularProgress, List, ListItem, ListItemText, Alert } from '@mui/material';
import { Link } from 'react-router-dom'; // Importar Link de react-router-dom

const Notifications = () => {
    const { username, error: usernameError } = useUsername();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewedFilter, setViewedFilter] = useState('all'); // Filtros: 'all', 'viewed', 'unviewed'
    const [error, setError] = useState('');
    const [isHovered, setIsHovered] = useState(null); // Para manejar el cambio de color en hover

    // Obtener las notificaciones del usuario
    useEffect(() => {
        if (!username) return;
        setLoading(true);
        setError('');

        let endpoint = `/notifications/receiver/${username}`;
        if (viewedFilter === 'viewed') {
            endpoint += '/viewed';
        } else if (viewedFilter === 'unviewed') {
            endpoint += '/unviewed';
        }

        axios
            .get(endpoint)
            .then((response) => {
                let sortedNotifications = response.data;
                if (viewedFilter === 'all') {
                    sortedNotifications = sortedNotifications.sort((a, b) => a.viewed - b.viewed);
                }
                setNotifications(sortedNotifications);
                setLoading(false);
            })
            .catch((err) => {
                setError('Error al cargar las notificaciones');
                setLoading(false);
                console.error(err);
            });
    }, [username, viewedFilter]);

    // Marcar una notificación como vista
    const markAsViewed = (id) => {
        axios
            .put(`/notifications/viewed/${id}`)
            .then((response) => {
                const updatedNotification = response.data;
                setNotifications((prevNotifications) => {
                    if (viewedFilter === 'unviewed') {
                        return prevNotifications.filter((notif) => notif.id !== id);
                    } else {
                        return prevNotifications.map((notif) =>
                            notif.id === id ? updatedNotification : notif
                        ).sort((a, b) => a.viewed - b.viewed);
                    }
                });
                setTimeout(() => {
                    // Cambiar el color después de un pequeño retraso
                    setIsHovered(null);
                }, 300); // Retraso de 300ms
            })
            .catch((err) => {
                setError('Error al marcar la notificación como vista');
                console.error(err);
            });
    };

    if (usernameError) {
        return <Alert severity="error">{usernameError}</Alert>;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Box sx={{ padding: 3, backgroundColor: '#f4f6f8', borderRadius: 2, maxWidth: 800, margin: 'auto' }}>
            <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: 'bold', color: '#4392f1', textAlign: 'center' }}>
                Notificaciones
            </Typography>

            <Box sx={{ marginBottom: 2, display: 'flex', justifyContent: 'center' }}>
                <Button variant="outlined" onClick={() => setViewedFilter('all')} sx={{ marginRight: 2 }}>
                    Todas
                </Button>
                <Button variant="outlined" onClick={() => setViewedFilter('viewed')} sx={{ marginRight: 2 }}>
                    Vistas
                </Button>
                <Button variant="outlined" onClick={() => setViewedFilter('unviewed')}>
                    No vistas
                </Button>
            </Box>

            {loading ? (
                <CircularProgress sx={{ display: 'block', margin: 'auto' }} />
            ) : notifications.length === 0 ? (
                <Alert severity="info" sx={{ marginTop: 2 }}>
                    No tienes notificaciones.
                </Alert>
            ) : (
                <List>
                    {notifications.map((notification) => (
                        <ListItem
                            key={notification.id}
                            sx={{
                                backgroundColor: isHovered === notification.id ? '#ffcc80' : notification.viewed ? '#e0f7fa' : '#ffecb3',
                                marginBottom: 1,
                                borderRadius: 1,
                                cursor: 'pointer',
                                '&:hover': { backgroundColor: '#ffcc80' },
                                transition: 'background-color 0.3s ease',
                            }}
                            onClick={() => {
                                setIsHovered(notification.id); // Cambiar el color cuando se hace clic
                                markAsViewed(notification.id);
                            }}
                        >
                            <ListItemText
                                primary={notification.message}
                                secondary={
                                    <>
                                        <Typography variant="body2" color="textSecondary" component="span">
                                            Enviado por:{' '}
                                            <Link
                                                to={`/company/requests`}
                                                style={{
                                                    color: '#1976d2',
                                                    textDecoration: 'none',
                                                }}
                                            >
                                                {notification.senderUsername}
                                            </Link>
                                        </Typography>
                                        <br />
                                        <Typography variant="body2" color="textSecondary" component="span">
                                            Recibido el: {new Date(notification.timestamp).toLocaleString()}
                                        </Typography>
                                    </>
                                }
                            />
                            {!notification.viewed && <Typography variant="body2" color="error" component="span">No vista</Typography>}
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default Notifications;
