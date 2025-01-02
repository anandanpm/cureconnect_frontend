import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendAdminLoginData, sendAdminLogoutData } from '../api/adminApi';

interface AdminState {
  username: string;
  email: string;
  isActive: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  username: '',
  email: '',
  isActive: false,
  loading: false,
  error: null,
};

export const loginAdmin = createAsyncThunk(
  'admin/login',
  async (adminData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await sendAdminLoginData(adminData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Admin login failed');
    }
  }
);

export const logoutAdmin = createAsyncThunk(
  'admin/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await sendAdminLogoutData();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Admin logout failed');
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.isActive = true;
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.loading = false;
        state.username = '';
        state.email = '';
        state.isActive = false;
        state.error = null;
      })
      .addCase(logoutAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;

