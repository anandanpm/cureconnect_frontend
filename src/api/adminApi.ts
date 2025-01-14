// import axios from 'axios'



// const API_URL =import.meta.env.VITE_ADMIN_API_URL

// const api = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
// });

// export const sendAdminLoginData = async (adminData: { email: string; password: string }) => {
//   try {
//     const response = await api.post(`${API_URL}/login`, adminData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const sendAdminLogoutData = async () => {
//   try {
//     const response = await api.post(`${API_URL}/logout`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const fetchPatientData = async () => {
//   try {
//     const response = await api.get(`${API_URL}/patients`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };


import axios from 'axios'

const API_URL = import.meta.env.VITE_ADMIN_API_URL

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

export const fetchPatientData = async () => {
  try {
    const response = await api.get(`${API_URL}/patients`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const togglePatientStatusApi = async (patientId: string, newStatus: boolean) => {
  try {
    const response = await api.patch(`${API_URL}/patients/${patientId}/toggle-status`, { is_active: newStatus });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchDoctorData = async () => {
  try {
    const response = await api.get(`${API_URL}/doctors`);
    console.log(response.data,'the details of the doctor is comming')
    return response.data;

  } catch (error) {
    throw error;
  }
};

export const toggleDoctorStatusApi = async (doctorId: string) => {
  try {
    const response = await api.patch(`${API_URL}/doctors/${doctorId}/toggle-status`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyDoctorApi = async (doctorId: string) => {
  try {
    const response = await api.patch(`${API_URL}/doctors/${doctorId}/verify`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
