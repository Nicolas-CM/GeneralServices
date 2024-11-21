import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/generalservicesplatform/api', // URL base
});


// Interceptor para agregar el token a las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      error.message = 'Error de red. Por favor, inténtelo de nuevo más tarde.';
    }
    return Promise.reject(error);
  }
);



export default api;
