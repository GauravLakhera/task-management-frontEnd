import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Users,
  ArrowRight,
  Crown,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { format, differenceInDays, isPast, isFuture } from 'date-fns';

export const ProjectCard = ({ project, onClick }) => {
  const startDate = new Date(project.startDate);
  const endDate = new Date(project.endDate);
  const daysRemaining = differenceInDays(endDate, new Date());
  const isOverdue = isPast(endDate);
  const isUpcoming = isFuture(startDate);

  const statusConfig = {
    active: {
      color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      icon: CheckCircle2
    },
    pending: {
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
    <Card
      className="
        group relative overflow-hidden border-2 border-gray-200 dark:border-gray-700
        transition-all duration-300 cursor-pointer hover:shadow-lg hover:border-blue-200/60
      "
      onClick={() => onClick(project.projectId)}
    >
      {/* Hover gradient background */}
      <div
        className="
          absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 
          dark:from-blue-950/20 dark:to-purple-950/20 opacity-0 
          group-hover:opacity-100 transition-opacity duration-300
          pointer-events-none
        "
      />

      <CardHeader className="relative pb-3 z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold shadow-md"
              style={{ backgroundColor: project.createdBy.profileColor }}
            >
              {project.key}
            </div>
            <div>
              <CardTitle className="text-xl font-bold transition-colors group-hover:text-blue-950 dark:group-hover:text-blue-400">
                {project.name}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={`${status.color} text-xs capitalize flex items-center gap-1`}>
                  <StatusIcon className="w-3 h-3" />
                  {project.status}
                </Badge>
                {project.userRole === 'admin' && (
                  <Badge variant="outline" className="text-xs flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    Admin
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {project.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-2">
            {project.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="relative space-y-4 pb-3 z-10">
        {/* Timeline */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 dark:text-gray-400">Timeline</span>
            {!isUpcoming && !isOverdue && (
              <span className={`font-medium ${daysRemaining < 30 ? 'text-orange-600' : 'text-green-600'}`}>
                {daysRemaining} days remaining
              </span>
            )}
            {isOverdue && <span className="font-medium text-red-600">Overdue</span>}
            {isUpcoming && <span className="font-medium text-blue-600">Upcoming</span>}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">
              {format(startDate, 'MMM d, yyyy')} → {format(endDate, 'MMM d, yyyy')}
            </span>
          </div>
        </div>

        {/* Team Info */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-semibold">{project.teamSize}</span>{' '}
              {project.teamSize === 1 ? 'member' : 'members'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">Manager:</span>
            <Avatar className="w-6 h-6" style={{ backgroundColor: project.manager.profileColor }}>
              <AvatarFallback className="text-xs text-white font-semibold">
                {project.manager.firstName?.[0]}
                {project.manager.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {project.manager.firstName} {project.manager.lastName}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="relative pt-3 border-t border-gray-100 dark:border-gray-800 z-10">
        <Button
          variant="ghost"
          className="w-full group/btn hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all"
        >
          <span>Open Project</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
};
