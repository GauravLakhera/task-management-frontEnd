import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { format, differenceInDays, isPast } from 'date-fns';

export const ProjectHeader = ({ project, onBack }) => {
  const endDate = new Date(project.endDate);
  const daysRemaining = differenceInDays(endDate, new Date());
  const isOverdue = isPast(endDate);

  const statusConfig = {
    active: {
      color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      icon: CheckCircle2
    },
    'on-hold': {
      color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      icon: Clock
    },
    completed: {
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      icon: CheckCircle2
    }
  };

  const status = statusConfig[project.status] || statusConfig.active;
  const StatusIcon = status.icon;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="gap-2 -ml-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
      </div>

      <div className="flex items-start gap-4">
        {/* Project Icon */}
        <div 
          className="w-20 h-20 rounded-xl flex items-center justify-center text-white text-3xl font-bold shadow-lg flex-shrink-0"
          style={{ backgroundColor: project.createdBy?.profileColor || '#6366f1' }}
        >
          {project.projectIcon ? (
            <img
              src={project.projectIcon}
              alt={project.name}
              className="w-full h-full rounded-xl object-cover"
            />
          ) : (
            project.key
          )}
        </div>

        {/* Project Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {project.name}
              </h1>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={`${status.color} flex items-center gap-1 capitalize`}>
                  <StatusIcon className="w-3 h-3" />
                  {project.status}
                </Badge>
                <Badge variant="outline" className="font-mono">
                  {project.key}
                </Badge>
                {isOverdue ? (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Overdue
                  </Badge>
                ) : daysRemaining < 30 && daysRemaining > 0 ? (
                  <Badge variant="outline" className="text-orange-600 border-orange-300">
                    <Calendar className="w-3 h-3 mr-1" />
                    {daysRemaining} days left
                  </Badge>
                ) : null}
              </div>
            </div>
          </div>

          {project.description && (
            <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg">
              {project.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};