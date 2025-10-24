import api from '@/services/api';
import apiKeys from '@/services/apiKeys';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getProjectDetails = createAsyncThunk(
  'data/projectDetails',
  async function getDetails(payload, thunkapi) {
    try {
      const { id } = payload;
      const response = await api.get(`${apiKeys.projectList}/${id}`);
      return response.data;
    } catch (error) {}
  }
);

const initialState = {
  loading: false,
  error: null,
  projectDetails: {}
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjectDetails.pending, (state) => {
        state.loading = true;
        state.projectDetails = {};
      })
      .addCase(getProjectDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.projectDetails = action?.payload?.data || {};
      })
      .addCase(getProjectDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
        state.projectDetails = {};
      });
  }
});

export default projectSlice.reducer;
