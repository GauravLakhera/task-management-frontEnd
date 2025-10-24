import api from '@/services/api';
import apiKeys from '@/services/apiKeys';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getIssueList = createAsyncThunk(
  'data/issues',
  async (payload, thunkAPI) => {
    try {
      // payload can contain projectId and filters
      const { projectId, filters } = payload || {};

      // Build query params
      let query = '';
      if (projectId) query += `projectId=${projectId}`;
      if (filters) {
        Object.keys(filters).forEach((key) => {
          query += `${query ? '&' : ''}${key}=${filters[key]}`;
        });
      }

      const response = await api.get(`${apiKeys.issueList}?${query}`);
      return response.data; // This will go into the reducer as payload
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
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIssueList.pending, (state) => {
        state.loading = true;
        state.issueList = [];
      })
      .addCase(getIssueList.fulfilled, (state, action) => {
        state.loading = false;
        state.issueList = action?.payload?.data || {};
      })
      .addCase(getIssueList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
        state.issueList = [];
      });
  }
});

export default issueSlice.reducer;
