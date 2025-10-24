import { createSelector } from 'reselect';

const getLoading = (state) => state.dashboardSlice.loading;
const getProjectList = (state) => state.dashboardSlice.projectList;

export const DashboardSelector = () =>
  createSelector([getLoading, getProjectList], (loading, projectList) => ({
    loading,
    projectList
  }));
