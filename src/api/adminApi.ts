import axios from 'axios'

const API_URL = 'http://localhost:3000/admin'

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const sendAdminLoginData = async (adminData: { email: string; password: string }) => {
  try {
    const response = await api.post(`${API_URL}/login`, adminData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendAdminLogoutData = async () => {
  try {
    const response = await api.post(`${API_URL}/logout`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

