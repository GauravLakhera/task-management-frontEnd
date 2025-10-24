import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Clock, CalendarPlus } from 'lucide-react';
import { format } from 'date-fns';

export const MetadataCard = ({ project }) => {
  return (
    <Card className="border-2 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-500" />
          Project Metadata
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <CalendarPlus className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Created</span>
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {format(new Date(project.createdAt), 'MMM dd, yyyy')}
          </span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Last Updated</span>
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {format(new Date(project.updatedAt), 'MMM dd, yyyy')}
          </span>
        </div>
        <div className="pt-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Project ID: <span className="font-mono">{project._id}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};