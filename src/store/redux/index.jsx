import { configureStore } from '@reduxjs/toolkit';
import projectSlice from './slices/project';
import dashboardSlice from './slices/dashboards';
import userSlice from './slices/users';
import issueSlice from './slices/issue';

const store = configureStore({
  reducer: {
    projectSlice,
    dashboardSlice,
    userSlice,
    issueSlice
  }
});

export default store;
