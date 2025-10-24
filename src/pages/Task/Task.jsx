import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { IssueSelector } from './selector';
import { getIssueList } from '@/store/redux/slices/issue';
import { toast } from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../components/ui/dialog';

const Task = () => {
  const dispatch = useDispatch();
  const selector = IssueSelector();
  const { loading, issueList } = useSelector(selector);

  const [tasksByStage, setTasksByStage] = useState({});
  const [selectedTask, setSelectedTask] = useState(null);

  // Filters state
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    priority: '',
    stage: '',
    assignee: '',
    dueDate: ''
  });

  const projectId = localStorage.getItem('project');

  // Fetch tasks with filters
  useEffect(() => {
    if (projectId) {
      dispatch(getIssueList({ projectId, filters }));
    }
  }, [dispatch, projectId, filters]);

  // Group tasks by stage
  useEffect(() => {
    const stages = {};
    issueList?.forEach((task) => {
      const stageName = task.stage?.name || 'Unassigned';
      if (!stages[stageName]) stages[stageName] = [];
      stages[stageName].push(task);
    });
    setTasksByStage(stages);
  }, [issueList]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      type: '',
      priority: '',
      stage: '',
      assignee: '',
      dueDate: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  if (loading) return <p className="p-6 text-center">Loading tasks...</p>;

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        Tasks Board
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by title/description"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="border rounded px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
        />

        {/* Type dropdown */}
        <select
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
          className="border rounded px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="">All Types</option>
          <option value="bug">Bug</option>
          <option value="feature">Feature</option>
          <option value="task">Task</option>
        </select>

        {/* Priority dropdown */}
        <select
          value={filters.priority}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
          className="border rounded px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        {/* Stage dropdown */}
        <select
          value={filters.stage}
          onChange={(e) => handleFilterChange('stage', e.target.value)}
          className="border rounded px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="">All Stages</option>
          <option value="backlog">Backlog</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        {/* Due Date dropdown */}
        <select
          value={filters.dueDate}
          onChange={(e) => handleFilterChange('dueDate', e.target.value)}
          className="border rounded px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="">All Due Dates</option>
          <option value="today">Today</option>
          <option value="thisWeek">This Week</option>
          <option value="overdue">Overdue</option>
        </select>

        {/* Clear filters button */}
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            onClick={clearFilters}
            className="text-sm"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Empty State - No tasks at all */}
      {!issueList || issueList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
              No Tasks Found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {hasActiveFilters 
                ? "No tasks match your current filters. Try adjusting your search criteria."
                : "There are no tasks in this project yet. Create your first task to get started!"}
            </p>
            {hasActiveFilters && (
              <Button onClick={clearFilters} variant="outline">
                Clear All Filters
              </Button>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Empty State - Tasks exist but board is empty after grouping */}
          {Object.keys(tasksByStage).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="text-center max-w-md">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  No Tasks to Display
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Tasks are available but none match the current view. Try adjusting your filters.
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear All Filters
                </Button>
              </div>
            </div>
          ) : (
            /* Tasks Board */
            <div className="flex gap-4 overflow-x-auto pb-4">
              {Object.keys(tasksByStage).map((stage) => (
                <div
                  key={stage}
                  className="min-w-[260px] md:min-w-[300px] bg-gray-50 dark:bg-gray-900 p-3 rounded-xl flex-shrink-0"
                >
                  <h2 className="text-lg font-semibold mb-3 border-b border-gray-200 dark:border-gray-700 pb-1">
                    {stage} ({tasksByStage[stage].length})
                  </h2>

                  <div className="flex flex-col gap-3">
                    {tasksByStage[stage].map((task) => (
                      <Card
                        key={task._id}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition cursor-pointer"
                        onClick={() => setSelectedTask(task)}
                      >
                        <CardHeader className="p-3 pb-1">
                          <CardTitle className="text-sm font-semibold line-clamp-1">
                            {task.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="px-3 pb-3 flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {task.key}
                            </span>
                            <span
                              className={`text-xs font-medium px-2 py-1 rounded-full ${
                                task.priority === 'high'
                                  ? 'bg-red-100 text-red-600'
                                  : task.priority === 'medium'
                                  ? 'bg-yellow-100 text-yellow-600'
                                  : 'bg-green-100 text-green-600'
                              }`}
                            >
                              {task.priority}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mt-1">
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                              style={{ backgroundColor: task.assignee?.profileColor || '#999' }}
                            >
                              {task.assignee?.firstName?.[0] || '?'}
                            </div>
                            <span className="truncate">
                              {task.assignee?.firstName || 'Unassigned'}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Task Detail Dialog */}
      {selectedTask && (
        <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
          <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Task Details</DialogTitle>
            </DialogHeader>

            <div className="space-y-3 mt-2 text-sm text-gray-700 dark:text-gray-300">
              <p>
                <strong>Title:</strong> {selectedTask.title}
              </p>
              <p>
                <strong>Key:</strong> {selectedTask.key}
              </p>
              <p>
                <strong>Type:</strong> {selectedTask.type}
              </p>
              <p>
                <strong>Priority:</strong>{' '}
                <span
                  className={`capitalize px-2 py-1 rounded-full ${
                    selectedTask.priority === 'high'
                      ? 'bg-red-100 text-red-600'
                      : selectedTask.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-green-100 text-green-600'
                  }`}
                >
                  {selectedTask.priority}
                </span>
              </p>
              <p>
                <strong>Assignee:</strong> {selectedTask.assignee?.firstName || '—'}
              </p>
              <p>
                <strong>Stage:</strong> {selectedTask.stage?.name || '—'}
              </p>
              <p>
                <strong>Original Estimate:</strong> {selectedTask.originalEstimate}h
              </p>
              <p>
                <strong>Remaining Estimate:</strong> {selectedTask.remainingEstimate}h
              </p>
            </div>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setSelectedTask(null)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Task;