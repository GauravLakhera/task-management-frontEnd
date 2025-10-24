import api from '@/services/api';
import apiKeys from '@/services/apiKeys';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getUsers = createAsyncThunk(
  'data/getUsers',
  async function users(payload, thunkapi) {
    try {
      const response = await api.get(`${apiKeys.getUser}`);
      return response.data;
    } catch (error) {}
  }
);

const initialState = {
  loading: false,
  error: null,
  users: []
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.users = [];
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action?.payload?.data || {};
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
        state.users = [];
      });
  }
});

export default userSlice.reducer;
