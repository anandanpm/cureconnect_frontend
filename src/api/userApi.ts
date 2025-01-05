import axios from 'axios'

const API_URL = import.meta.env.VITE_USER_API_URL

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const sendSignupData = async (userData: { username: string; email: string,password:string}) => {
  try {
    const response = await api.post(`${API_URL}/getOtp`, userData)
    console.log(response.data,'console.log form the axios api page')
    return response
  } catch (error) {
    throw error
  }
}

export const sendOtpData = async(userData:{email:string,otpString:string})=>{
  try {
    const response = await api.post(`${API_URL}/verifyOtp`,userData)
    console.log(response,'this is from the otp page')
    return response
  } catch (error) {
    throw error
  }
}

export const resendOtpData = async(email:string)=>{
  try{
    const response = await api.post(`${API_URL}/resendOtp`,email)
    console.log(response,'the resend otp is comming')
    return response
  }catch(error){
    throw error
  }
}

export const sendLoginData = async (userData: { email: string; password: string }) => {
  try {
    const response = await api.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendLogoutData = async () => {
  try {
    const response = await api.post(`${API_URL}/logout`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendGoogleAuthData = async (token: string) => {
  try {
    const response = await api.post(`${API_URL}/google-auth`, { token });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (userData: {
  username: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  address: string;
  profile_pic?: string;
}) => {
  try {
    const response = await api.put(`${API_URL}/update-profile`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};


