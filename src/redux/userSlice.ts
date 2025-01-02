import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendSignupData, sendLoginData,sendLogoutData } from '../api/userApi';

interface UserState {
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  loading: boolean;
  error: string | null;
  
}

const initialState: UserState = {
  username: '',
  email: '',
  role: '',
  isActive:false,
  loading: false,
  error: null,
};

export const signupUser = createAsyncThunk(
  'user/signup',
  async (userData: { username: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await sendSignupData(userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Signup failed');
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
       console.log(userData,'userData is comming ')
      const response = await sendLoginData(userData);
      console.log(response,'the response form the backend is comming')
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Login failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await sendLogoutData(); 
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Logout failed');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload.username;
        state.email = action.payload.email;   
        state.role = action.payload.role;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'An unexpected error occurred';
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.isActive = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'An unexpected error occurred';
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.username = '';
        state.email = '';
        state.role = '';
        state.isActive = false; 
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'An unexpected error occurred';
      })
  },
});

export const { clearError, logout } = userSlice.actions;
export default userSlice.reducer;

