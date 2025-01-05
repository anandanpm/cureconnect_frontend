import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendSignupData, sendLoginData,sendLogoutData,sendGoogleAuthData,updateUserProfile } from '../api/userApi';

interface UserState {
  username: string;
  email: string;
  role: string;
  phone:string;
  age:string|null;
  profile_pic:string;
  gender:string;
  address:string;
  isActive: boolean;
  loading: boolean;
  error: string | null;
  
}

const initialState: UserState = {
  username: '',
  email: '',
  role: '',
  phone:'',
  age:'',
  profile_pic:'',
  gender:'',
  address:'',
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

export const googleAuth = createAsyncThunk(
  'user/googleAuth',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await sendGoogleAuthData(token);
      console.log(response,'from the backend is comming')
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Google authentication failed');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (userData: {
    username: string;
    email: string;
    phone: string;
    age: string;
    gender: string;
    address: string;
    profile_pic?: string;
  }, { rejectWithValue }) => {
    try {
      const response = await updateUserProfile(userData);
      console.log(response,'the response is comming')
      if (response.user) {
        return response.user;
       
      } else {
        return rejectWithValue('Invalid response data');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Profile update failed');
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
      .addCase(googleAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.isActive = true;
        state.error = null;
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'An unexpected error occurred';
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload,'action have some problem ')
        if (action.payload) {
          console.log(action.payload,'the action payload is comming')
          state.username = action.payload.username || state.username;
          state.email = action.payload.email || state.email;
          state.phone = action.payload.phone || state.phone;
          state.age = action.payload.age || state.age;
          state.gender = action.payload.gender || state.gender;
          state.address = action.payload.address || state.address;
          state.profile_pic = action.payload.profile_pic || state.profile_pic;
        }
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'An unexpected error occurred';
      });  },
});

export const { clearError, logout } = userSlice.actions;
export default userSlice.reducer;

