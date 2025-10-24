import api from '@/services/api';
import apiKeys from '@/services/apiKeys';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getProjectDetails = createAsyncThunk(
  'data/projectDetails',
  async function getDetails(payload, thunkapi) {
    try {
      const { id } = payload;
      const response = await api.get(`${apiKeys.projectList}/${id}`);
      console.log('THUNK RESPONSE:', response.data);
      return response.data;
    } catch (error) {}
  }
);

export const getProjectStages = createAsyncThunk(
  'data/projectStages',
  async function getProjectStages(payload, thunkapi) {
    try {
      const { id } = payload;
      const response = await api.get(`${apiKeys.stages}/${id}`);
      console.log('THUNK RESPONSE:', response.data);
      return response.data;
    } catch (error) {}
  }
);

export const getProjectMember = createAsyncThunk(
  'data/projectMembers',
  async function getProjectMember(payload, thunkapi) {
    try {
      const { id } = payload;
      const response = await api.get(`${apiKeys.members}/${id}`);
      console.log('THUNK RESPONSE:', response.data);
      return response.data;
    } catch (error) {}
  }
);

const initialState = {
  loading: false,
  stageLoading: false,
  error: null,
  members: [],
  projectDetails: {},
  stages: []
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
      })

      .addCase(getProjectStages.pending, (state) => {
        state.stageLoading = true;
        state.stages = [];
      })
      .addCase(getProjectStages.fulfilled, (state, action) => {
        state.stageLoading = false;
        state.stages = action?.payload?.data || [];
      })
      .addCase(getProjectStages.rejected, (state, action) => {
        state.stageLoading = false;
        state.error = action.payload || 'Something went wrong';
        state.stages = [];
      })

      .addCase(getProjectMember.pending, (state) => {
        state.members = [];
      })
      .addCase(getProjectMember.fulfilled, (state, action) => {
        state.members = action?.payload?.data || [];
      })
      .addCase(getProjectMember.rejected, (state, action) => {
        state.error = action.payload || 'Something went wrong';
        state.members = [];
      });
  }
});

export default projectSlice.reducer;
