
import axios from 'axios';

const userApi = axios.create({
  baseURL: import.meta.env.VITE_USER_API_URL,
  withCredentials: true
});

const doctorApi = axios.create({
  baseURL: import.meta.env.VITE_DOCTOR_API_URL,
  withCredentials: true
});

const adminApi = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_API_URL,
  withCredentials: true
});

// Add request interceptor to all API instances
[userApi, doctorApi, adminApi].forEach(api => {
  // Request interceptor (your existing code)
  api.interceptors.request.use(
    (config) => {
      const cookies = document.cookie.split('; ');
      const accessTokenCookie = cookies.find(row => row.startsWith('accessToken='));
      
      if (accessTokenCookie) {
        const token = accessTokenCookie.split('=')[1];
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
});

// Add response interceptor to handle 401 errors for userApi
userApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Use the user's refresh token endpoint
        await userApi.post('/refresh-token');
        return userApi(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh user token:", refreshError);
        // Handle refresh failure (e.g., redirect to login)
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 errors for doctorApi
doctorApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Use the doctor's refresh token endpoint
        await doctorApi.post('/refresh-token');
        return doctorApi(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh doctor token:", refreshError);
        // Handle refresh failure (e.g., redirect to login)
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 errors for adminApi
adminApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Use the admin's refresh token endpoint
        await adminApi.post('/refresh-token');
        return adminApi(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh admin token:", refreshError);
        // Handle refresh failure (e.g., redirect to login)
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export { userApi, doctorApi, adminApi };