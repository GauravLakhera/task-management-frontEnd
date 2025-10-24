import api from '@/services/api';
import apiKeys from '@/services/apiKeys';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getIssueList = createAsyncThunk(
  'data/issues',
  async (payload, thunkAPI) => {
    try {
      const { projectId, filters } = payload || {};

      // Build query params efficiently
      const params = new URLSearchParams();
      
      if (projectId) {
        params.append('projectId', projectId);
      }
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            params.append(key, value);
          }
        });
      }

      const queryString = params.toString();
      const url = queryString ? `${apiKeys.issueList}?${queryString}` : apiKeys.issueList;
      
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  issueList: []
};

export const issueSlice = createSlice({
  name: 'issue',
  initialState,
  reducers: {
    clearIssueList: (state) => {
      state.issueList = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIssueList.pending, (state) => {
        state.loading = true;
        state.error = null;
        // Don't clear issueList here to avoid flickering
      })
      .addCase(getIssueList.fulfilled, (state, action) => {
        state.loading = false;
        state.issueList = action?.payload?.data || [];
        state.error = null;
      })
      .addCase(getIssueList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
        state.issueList = [];
      });
  }
});

export const { clearIssueList } = issueSlice.actions;
export default issueSlice.reducer;