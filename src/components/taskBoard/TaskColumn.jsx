import React from 'react';
import { TaskCard } from './TaskCard';
import { ScrollArea } from '@/components/ui/scroll-area';

export const TaskColumn = ({ stage, tasks, onTaskClick }) => {
  const stageColors = {
    'Backlog': 'bg-gray-100 dark:bg-gray-800',
    'In Progress': 'bg-blue-50 dark:bg-blue-900/20',
    'Done': 'bg-green-50 dark:bg-green-900/20',
  };

  return (
    <div className="min-w-[300px] shrink-0">
      <div className={`${stageColors[stage] || 'bg-gray-50 dark:bg-gray-900'} rounded-lg p-4`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            {stage}
          </h2>
          <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>

        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="space-y-3 pr-4">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onClick={() => onTaskClick(task)}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};