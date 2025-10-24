import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { IssueSelector } from './selector';
import { getIssueList } from '@/store/redux/slices/issue';
import { toast } from 'react-hot-toast';

const Task = () => {
  const dispatch = useDispatch();
  const selector = IssueSelector();
  const { loading, issueList } = useSelector(selector);

  const [tasksByStage, setTasksByStage] = useState({});
  const [selectedTask, setSelectedTask] = useState(null);

  // Fetch tasks
  useEffect(() => {
    const projectId = localStorage.getItem('project');
    if (projectId) {
      dispatch(getIssueList({ projectId }));
    }
  }, [dispatch]);

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

  if (loading) return <p className="p-6 text-center">Loading tasks...</p>;
  if (!issueList?.length) return <p className="p-6 text-center">No tasks available.</p>;

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        Tasks Board
      </h1>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {Object.keys(tasksByStage).map((stage) => (
          <div
            key={stage}
            className="min-w-[260px] md:min-w-[300px] bg-gray-50 dark:bg-gray-900 p-3 rounded-xl flex-shrink-0"
          >
            <h2 className="text-lg font-semibold mb-3 border-b border-gray-200 dark:border-gray-700 pb-1">
              {stage}
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
