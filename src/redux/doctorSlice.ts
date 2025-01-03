import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendDoctorSignupData, sendDoctorLoginData, sendDoctorLogoutData, sendDoctorOtpData, resendDoctorOtpData,sendDoctorGoogleAuthData } from '../api/doctorApi';

interface DoctorState {
  username: string;
  email: string;
  isActive: boolean;
  verified: boolean;
  role:string;
  loading: boolean;
  error: string | null;
}

const initialState: DoctorState = {
  username: '',
  email: '',
  isActive: false,
  verified: false,
  role:'',
  loading: false,
  error: null,
};

export const signupDoctor = createAsyncThunk(
  'doctor/signup',
  async (doctorData: { username: string; email: string; password: string; }, { rejectWithValue }) => {
    try {
      const response = await sendDoctorSignupData(doctorData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Doctor signup failed');
    }
  }
);

export const verifyDoctorOtp = createAsyncThunk(
  'doctor/verifyOtp',
  async (otpData: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await sendDoctorOtpData(otpData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'OTP verification failed');
    }
  }
);

export const resendDoctorOtp = createAsyncThunk(
  'doctor/resendOtp',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await resendDoctorOtpData(email);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'OTP resend failed');
    }
  }
);

export const loginDoctor = createAsyncThunk(
  'doctor/login',
  async (doctorData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await sendDoctorLoginData(doctorData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Doctor login failed');
    }
  }
);

export const logoutDoctor = createAsyncThunk(
  'doctor/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await sendDoctorLogoutData();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Doctor logout failed');
    }
  }
);

export const googleAuthDoctor = createAsyncThunk(
  'doctor/googleAuth',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await sendDoctorGoogleAuthData(token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Doctor Google authentication failed');
    }
  }
);

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.username = '';
      state.email = '';
      state.role = '';
      state.isActive = false;
      state.verified = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.isActive = action.payload.isActive;
        state.verified = action.payload.verified;
        state.role = action.payload.role;
        state.error = null;
      })
      .addCase(signupDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyDoctorOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyDoctorOtp.fulfilled, (state) => {
        state.loading = false;
        state.verified = true;
        state.error = null;
      })
      .addCase(verifyDoctorOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(resendDoctorOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendDoctorOtp.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resendDoctorOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.isActive = action.payload.isActive;
        state.verified = action.payload.verified;
        state.role = action.payload.role;
        state.error = null;
      })
      .addCase(loginDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutDoctor.fulfilled, (state) => {
        state.loading = false;
        state.username = '';
        state.email = '';
        state.role = '';
        state.isActive = false;
        state.verified = false;
      })
      .addCase(logoutDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(googleAuthDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleAuthDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.isActive = action.payload.isActive;
        state.verified = action.payload.verified;
        state.role = action.payload.role;
        state.error = null;
      })
      .addCase(googleAuthDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, logout } = doctorSlice.actions;
export default doctorSlice.reducer;

