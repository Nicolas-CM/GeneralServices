import axios from 'axios';

const login = async (credentials: any) => {
  return await axios.post('/api/auth/login', credentials);
};

export default {
  login,
};
