import { createSelector } from 'reselect';

const getLoading = (state) => state.projectSlice.loading;
const getProjectList = (state) => state.projectSlice.projectDetails;

const getUserLoading = (state) => state.userSlice.loading;
const getUserList = (state) => state.userSlice.users;

export const ProjectSelector = () =>
  createSelector([getLoading, getProjectList], (loading, projectDetails) => ({
    loading,
    projectDetails
  }));

export const userSelector = () =>
  createSelector([getUserLoading, getUserList], (loading, userList) => ({
    loading,
    userList
  }));
