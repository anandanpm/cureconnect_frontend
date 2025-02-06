// import axios from 'axios'

// const API_URL = import.meta.env.VITE_USER_API_URL

// const userApi = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
// });

// export const sendSignupData = async (userData: { username: string; email: string,password:string}) => {
//   try {
//     const response = await userApi.post(`${API_URL}/getOtp`, userData)
//     console.log(response.data,'console.log form the axios userApi page')
//     return response
//   } catch (error) {
//     throw error
//   }
// }

// export const sendOtpData = async(userData:{email:string,otpString:string})=>{
//   try {
//     const response = await userApi.post(`${API_URL}/verifyOtp`,userData)
//     console.log(response,'this is from the otp page')
//     return response
//   } catch (error) {
//     throw error
//   }
// }

// export const resendOtpData = async(email:string)=>{
//   try{
//     console.log(email,'the email is comming')
//     const response = await userApi.post(`${API_URL}/resendOtp`,{email})
//     console.log(response,'the resend otp is comming')
//     return response
//   }catch(error){
//     throw error
//   }
// }

// export const sendLoginData = async (userData: { email: string; password: string }) => {
//   try {
//     const response = await userApi.post(`${API_URL}/login`, userData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const sendLogoutData = async () => {
//   try {
//     const response = await userApi.post(`${API_URL}/logout`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const sendGoogleAuthData = async (token: string) => {
//   try {
//     const response = await userApi.post(`${API_URL}/google-auth`, { token });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateUserProfile = async (userData: {
//   username: string;
//   email: string;
//   phone: string;
//   age: string;
//   gender: string;
//   address: string;
//   profile_pic?: string;
//   _id: string;
// }) => {
//   try {
//     const response = await userApi.put(`${API_URL}/update-profile`, userData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const fetchVerifiedDoctors = async () => {
//   try {
//     const response = await userApi.get(`${API_URL}/verified-doctors`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const fetchDoctorSlots = async (doctorId: string) => {
//   try {
//     const response = await userApi.get(`${API_URL}/doctor-slots/${doctorId}`)
//     return response.data
//   } catch (error) {
//     throw error
//   }
// }

// export const bookAppointment = async (slotId: string,userId:string,amount:number) => {
//   try {
//     const response = await userApi.post(`${API_URL}/book-appointment`, { slotId,userId,amount })
//     return response.data
//   } catch (error) {
//     throw error
//   }
// }

// export const createPaymentIntent = async (userId:string,amount:number) => {
//   try {
//     const response = await userApi.post(`${API_URL}/create-payment-intent`, { userId,amount });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }


import { userApi } from './axiosInstance';

export const sendSignupData = async (userData: { username: string; email: string,password:string}) => {
  try {
    const response = await userApi.post(`/getOtp`, userData)
    console.log(response.data,'console.log form the axios userApi page')
    return response
  } catch (error) {
    throw error
  }
}

export const sendOtpData = async(userData:{email:string,otpString:string})=>{
  try {
    const response = await userApi.post(`/verifyOtp`,userData)
    console.log(response,'this is from the otp page')
    return response
  } catch (error) {
    throw error
  }
}

export const resendOtpData = async(email:string)=>{
  try{
    console.log(email,'the email is comming')
    const response = await userApi.post(`/resendOtp`,{email})
    console.log(response,'the resend otp is comming')
    return response
  }catch(error){
    throw error
  }
}

export const sendLoginData = async (userData: { email: string; password: string }) => {
  try {
    const response = await userApi.post(`/login`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendLogoutData = async () => {
  try {
    const response = await userApi.post(`/logout`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendGoogleAuthData = async (token: string) => {
  try {
    const response = await userApi.post(`/google-auth`, { token });
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
  _id: string;
}) => {
  try {
    const response = await userApi.put(`/update-profile`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchVerifiedDoctors = async () => {
  try {
    const response = await userApi.get(`/verified-doctors`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchDoctorSlots = async (doctorId: string) => {
  try {
    const response = await userApi.get(`/doctor-slots/${doctorId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const bookAppointment = async (slotId: string, userId: string, amount: number, paymentId: string) => {
  try {
    const response = await userApi.post(`/book-appointment`, { slotId,userId,amount,paymentId })
    return response.data
  } catch (error) {
    throw error
  }
}

export const createPaymentIntent = async (userId:string,amount:number) => {
  try {
    const response = await userApi.post(`/create-payment-intent`, { userId,amount });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const fetchAppointmentDetails = async (userId:string) => {
  try {
    console.log(userId,'the answer is comming the user Id')
    const response = await userApi.get(`/appointment-details/${userId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const requestRefund = async (appointmentId: string) => {
  try {
    const response = await userApi.post(`/refund-appointment`, { appointmentId });
    return response.data;
  } catch (error) {
    throw error;
  }
};


