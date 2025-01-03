import axios from 'axios'

const API_URL = 'http://localhost:3000/doctor'

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const sendDoctorSignupData = async (docData: { username: string; email: string, password: string }) => {
  try {
    const response = await api.post(`${API_URL}/getOtp`, docData)
    console.log(response.data, 'console.log from the axios api page')
    return response
  } catch (error) {
    throw error
  }
}

export const sendDoctorOtpData = async (docData: { email: string, otp: string }) => {
  try {
    const response = await api.post(`${API_URL}/verifyOtp`, docData)
    console.log(response, 'this is from the doctor otp page')
    return response
  } catch (error) {
    throw error
  }
}

export const resendDoctorOtpData = async (email: string) => {
  try {
    const response = await api.post(`${API_URL}/resendOtp`, { email })
    console.log(response, 'the resend otp for doctor is coming')
    return response
  } catch (error) {
    throw error
  }
}

export const sendDoctorLoginData = async (docData: { email: string, password: string }) => {
  try {
    const response = await api.post(`${API_URL}/login`, docData)
    console.log(response, 'the response from the doctor backend is coming')
    return response.data
  } catch (error) {
    throw error
  }
}

export const sendDoctorLogoutData = async () => {
  try {
    const response = await api.post(`${API_URL}/logout`)
    console.log(response, 'the response from the doctor logout is coming')
    return response
  } catch (error) {
    throw error
  } 
}

export const sendDoctorGoogleAuthData = async (token: string) => {
  try {
    const response = await api.post(`${API_URL}/google-auth`, { token })
    console.log(response, 'the response from the doctor Google auth is coming')
    return response
  } catch (error) {
    throw error
  }
}

