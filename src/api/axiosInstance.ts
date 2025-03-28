
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


[userApi, doctorApi, adminApi].forEach(api => {
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

export { userApi, doctorApi, adminApi };