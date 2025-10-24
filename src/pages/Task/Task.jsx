import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIssueList } from '@/store/redux/slices/issue';
import { IssueSelector } from './selector';
import { useDebounce } from '@/hooks/useDebounce';
import { TaskFilters } from '@/components/taskBoard/TaskFilters';
import { TaskColumn } from '@/components/taskBoard/TaskColumn';
import { TaskDetailDialog } from '@/components/taskBoard/TaskDetailDialog';
import { EmptyState } from '@/components/taskBoard/EmptyState';
import { Loader2 } from 'lucide-react';
import { useParams } from 'react-router-dom';

// Stage template
export const FULL_STAGE_TEMPLATE = [
  { name: 'Backlog', category: 'open', order: 5 },
  { name: 'To Do', category: 'open', order: 10, isDefault: true },
  { name: 'Selected', category: 'open', order: 20 },
  { name: 'In Progress', category: 'in-progress', order: 30 },
  { name: 'In Review', category: 'in-progress', order: 40 },
  { name: 'QA Testing', category: 'in-progress', order: 50 },
  { name: 'UAT', category: 'in-progress', order: 60 },
  { name: 'Reopened', category: 'open', order: 65 },
  { name: 'Blocked', category: 'in-progress', order: 70 },
  { name: 'Done', category: 'closed', order: 80 }
];

const Task = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const selector = IssueSelector();
  const { loading, issueList } = useSelector(selector);

  const [selectedTask, setSelectedTask] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    priority: 'all',
    stage: 'all',
    dueDate: 'all'
  });

  const debouncedSearch = useDebounce(filters.search, 500);

  // Fetch tasks when filters change
  useEffect(() => {
    if (!projectId) return;

    const apiFilters = {};
    if (debouncedSearch) apiFilters.search = debouncedSearch;
    if (filters.type !== 'all') apiFilters.type = filters.type;
    if (filters.priority !== 'all') apiFilters.priority = filters.priority;
    if (filters.stage !== 'all') apiFilters.stage = filters.stage;
    if (filters.dueDate !== 'all') apiFilters.dueDate = filters.dueDate;

    dispatch(getIssueList({ projectId, filters: apiFilters }));
  }, [
    dispatch,
    projectId,
    debouncedSearch,
    filters.type,
    filters.priority,
    filters.stage,
    filters.dueDate
  ]);

  // Group tasks by stage
  const tasksByStage = useMemo(() => {
    const grouped = {};
    issueList?.forEach((task) => {
      const stageName = task.stage?.name || 'Unassigned';
      if (!grouped[stageName]) grouped[stageName] = [];
      grouped[stageName].push(task);
    });
    return grouped;
  }, [issueList]);

  // Map tasks to FULL_STAGE_TEMPLATE order and filter empty stages
  const orderedStages = useMemo(() => {
    return FULL_STAGE_TEMPLATE.map((stage) => ({
      name: stage.name,
      tasks: tasksByStage[stage.name] || []
    })).filter((stage) => stage.tasks.length > 0); // only stages with tasks
  }, [tasksByStage]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      type: 'all',
      priority: 'all',
      stage: 'all',
      dueDate: 'all'
    });
  };

  const hasActiveFilters = Object.entries(filters).some(
    ([key, value]) => value !== '' && value !== 'all'
  );

  if (!projectId) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p className='text-gray-600 dark:text-gray-400'>Invalid project ID</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6 md:w-11/12 mx-auto'>
      <div className='max-w-[1600px] mx-auto'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2'>
            Task Board
          </h1>
          <p className='text-gray-600 dark:text-gray-400'>
            Manage and track your project tasks
          </p>
        </div>

        <TaskFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {loading ? (
          <div className='flex items-center justify-center py-20'>
            <Loader2 className='w-8 h-8 animate-spin text-blue-500' />
          </div>
        ) : !issueList || issueList.length === 0 ? (
          <EmptyState
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearFilters}
            isFiltered={hasActiveFilters}
          />
        ) : (
          <div className='flex gap-4 overflow-x-auto pb-4'>
            {orderedStages.map(({ name, tasks }) => (
              <TaskColumn
                key={name}
                stage={name}
                tasks={tasks}
                onTaskClick={setSelectedTask}
              />
            ))}
          </div>
        )}

        <TaskDetailDialog
          task={selectedTask}
          open={!!selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      </div>
    </div>
  );
};

export default Task;
