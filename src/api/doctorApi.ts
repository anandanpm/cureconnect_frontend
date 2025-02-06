import { AppointmentDetail } from "../pages/Doctor/DoctorPatient";
import { doctorApi } from "./axiosInstance";

export const sendDoctorSignupData = async (docData: { username: string; email: string, password: string }) => {
  try {
    const response = await doctorApi.post(`/getOtp`, docData)
    console.log(response.data, 'console.log from the axios doctorApi page')
    return response
  } catch (error) {
    throw error
  }
}

export const sendDoctorOtpData = async (docData: { email: string, otp: string }) => {
  try {
    const response = await doctorApi.post(`/verifyOtp`, docData)
    console.log(response, 'this is from the doctor otp page')
    return response
  } catch (error) {
    throw error
  }
}

export const resendDoctorOtpData = async (email: string) => {
  try {
    const response = await doctorApi.post(`/resendOtp`, { email })
    console.log(response, 'the resend otp for doctor is coming')
    return response
  } catch (error) {
    throw error
  }
}

export const sendDoctorLoginData = async (docData: { email: string, password: string }) => {
  try {
    const response = await doctorApi.post(`/login`, docData)
    console.log(response, 'the response from the doctor backend is coming')
    return response.data
  } catch (error) {
    throw error
  }
}

export const sendDoctorLogoutData = async () => {
  try {
    const response = await doctorApi.post(`/logout`)
    console.log(response, 'the response from the doctor logout is coming')
    return response
  } catch (error) {
    throw error
  } 
}

export const sendDoctorGoogleAuthData = async (token: string) => {
  try {
    const response = await doctorApi.post(`/google-auth`, { token })
    console.log(response, 'the response from the doctor Google auth is coming')
    return response
  } catch (error) {
    throw error
  }
}

export const updateDoctorProfileData = async (profileData: {
  username?: string;
  email?: string;
  phone?: string;
  age?: string;
  gender?: string;
  address?: string;
  clinic_name?: string;
  about?: string;
  education?: string;
  experience?: string;
  medical_license?: string;
  department?: string;
  certification?: string;
  profile_pic?: string;
  _id:string;
}) => {
  try {
    const response = await doctorApi.put(`/profile`, profileData)
    console.log(response, 'the response from updating doctor profile is coming')
    return response.data
  } catch (error) {
    throw error
  }
}




export const fetchDoctorAppointments = async (doctorId: string) => {
  try {
    const response = await doctorApi.get<AppointmentDetail[]>(`/appointments/${doctorId}`)
    console.log(response, 'the response from doctor appointments fetch is coming')
    return response.data
  } catch (error) {
    throw error
  }
}



