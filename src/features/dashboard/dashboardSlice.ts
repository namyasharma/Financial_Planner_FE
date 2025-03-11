import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface DashboardState {
  data: any | null;
  error: string | null;
  loading: boolean;
}

const initialState: DashboardState = {
  data: null,
  error: null,
  loading: false,
};

// Async Thunk to fetch dashboard data
export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const headers = { Authorization: `Bearer ${token}` };

      const responses = await Promise.all([
        axios.get("http://127.0.0.1:8000/spending-summary/", { headers }),
        axios.get("http://127.0.0.1:8000/budget/", { headers }),
        axios.get("http://127.0.0.1:8000/income/", { headers }),
        axios.get("http://127.0.0.1:8000/expenses/", { headers }),
        axios.get("http://127.0.0.1:8000/debts/", { headers }),
        axios.get("http://127.0.0.1:8000/goals/", { headers }),
      ]);

      return {
        spendingSummary: responses[0].data,
        budgets: responses[1].data,
        incomes: responses[2].data,
        expenses: responses[3].data,
        debts: responses[4].data,
        goals: responses[5].data,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to load data.");
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export default dashboardSlice.reducer;
