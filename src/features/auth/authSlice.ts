import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  user: any;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("access") || null,
  loading: false,
  error: null,
};

// Login Thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", credentials);
      localStorage.setItem("access", response.data.access);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Logout Thunk
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("access");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.access;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export default authSlice.reducer;
