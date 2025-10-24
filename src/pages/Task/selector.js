import { createSelector } from 'reselect';

const getLoading = (state) => state.issueSlice.loading;
const getIssueList = (state) => state.issueSlice.issueList;

export const IssueSelector = () =>
  createSelector([getLoading, getIssueList], (loading, issueList) => ({
    loading,
    issueList
  }));
