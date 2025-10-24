import { createSelector } from 'reselect';

const getLoading = (state) => state.projectSlice.loading;
const getStageLoading = (state) => state.projectSlice.stageLoading;
const getProjectList = (state) => state.projectSlice.projectDetails;
const getStagesList = (state) => state.projectSlice.stages;
const getProjectMember = (state) => state.projectSlice.members;
const getUserLoading = (state) => state.userSlice.loading;
const getUserList = (state) => state.userSlice.users;

export const ProjectSelector = () =>
  createSelector([getLoading, getProjectList], (loading, projectDetails) => ({
    loading,
    projectDetails
  }));

export const stageSelector = () =>
  createSelector([getStageLoading, getStagesList], (stageLoading, stages) => ({
    stageLoading,
    stages
  }));

export const memberSelector = () =>
  createSelector([getProjectMember], (member) => ({
    member
  }));

export const userSelector = () =>
  createSelector([getUserLoading, getUserList], (loading, userList) => ({
    loading,
    userList
  }));
