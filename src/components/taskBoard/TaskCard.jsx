import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, User } from 'lucide-react';
import { format } from 'date-fns';

export const TaskCard = ({ task, onClick }) => {
  const priorityColors = {
    high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    medium:
      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
  };

  const typeColors = {
    bug: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    feature: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    task: 'bg-gray-50 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400'
  };

  return (
    <Card
      className='group bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
      onClick={onClick}
    >
      <CardHeader className='p-4 pb-2'>
        <div className='flex items-start justify-between gap-2 mb-2'>
          <span className='text-xs font-mono text-gray-500 dark:text-gray-400'>
            {task.key}
          </span>
          <Badge
            className={`${typeColors[task.type] || typeColors.task} text-xs`}
          >
            {task.type}
          </Badge>
        </div>
        <CardTitle className='text-sm font-semibold line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
          {task.title}
        </CardTitle>
        
          <CardTitle className='text-xs font-normal text-gray-600 dark:text-gray-400 mt-1'>
           Due Date : {task.dueDate ? format(new Date(task.dueDate), 'dd MMM, yyyy'):'--'}
          </CardTitle>
        
      </CardHeader>

      <CardContent className='px-4 pb-4 space-y-3'>
        <Badge
          className={`${priorityColors[task.priority]} text-xs capitalize`}
        >
          {task.priority}
        </Badge>

        <div className='flex items-center justify-between text-xs text-gray-600 dark:text-gray-400'>
          <div className='flex items-center gap-2'>
            <Avatar
              className='w-6 h-6'
              style={{
                backgroundColor: task.assignee?.profileColor || '#94a3b8'
              }}
            >
              <AvatarFallback className='text-xs text-white font-semibold'>
                {task.assignee?.firstName?.[0] || '?'}
              </AvatarFallback>
            </Avatar>
            <span className='truncate max-w-[100px]'>
              {task.assignee?.firstName || 'Unassigned'}
            </span>
          </div>

          {task.remainingEstimate && (
            <div className='flex items-center gap-1'>
              <Clock className='w-3 h-3' />
              <span>{task.remainingEstimate}h</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
