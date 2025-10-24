import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

export const TimelineCard = ({ project }) => {
  const startDate = new Date(project.startDate);
  const endDate = new Date(project.endDate);
  console.log(project);
  const totalDays = differenceInDays(endDate, startDate);
  const daysElapsed = differenceInDays(new Date(), startDate);
  const daysRemaining = differenceInDays(endDate, new Date());
  const progress = Math.min(100, Math.max(0, (daysElapsed / totalDays) * 100));

  return (
    <Card className="border-2 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          Project Timeline
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-600 dark:text-gray-400">Start Date</span>
          </div>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {format(startDate, 'MMM dd, yyyy')}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-600 dark:text-gray-400">End Date</span>
          </div>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {format(endDate, 'MMM dd, yyyy')}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>Progress</span>
            <span className="font-semibold">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{totalDays}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Total Days</p>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{Math.max(0, daysRemaining)}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Days Left</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
