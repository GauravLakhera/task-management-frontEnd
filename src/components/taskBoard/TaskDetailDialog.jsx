import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, Tag, User, Target } from 'lucide-react';

export const TaskDetailDialog = ({ task, open, onClose }) => {
  if (!task) return null;

  const priorityColors = {
    high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
              {task.key}
            </span>
            <Badge variant="outline" className="text-xs capitalize">
              {task.type}
            </Badge>
          </div>
          <DialogTitle className="text-xl mt-2">{task.title}</DialogTitle>
        </DialogHeader>

        <Separator />

        <div className="space-y-4 py-4">
          {/* Priority */}
          <div className="flex items-center gap-3">
            <Tag className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400 w-32">Priority:</span>
            <Badge className={`${priorityColors[task.priority]} capitalize`}>
              {task.priority}
            </Badge>
          </div>

          {/* Assignee */}
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400 w-32">Assignee:</span>
            <div className="flex items-center gap-2">
              <Avatar className="w-7 h-7" style={{ backgroundColor: task.assignee?.profileColor || '#94a3b8' }}>
                <AvatarFallback className="text-xs text-white font-semibold">
                  {task.assignee?.firstName?.[0] || '?'}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm">{task.assignee?.firstName || 'Unassigned'}</span>
            </div>
          </div>

          {/* Stage */}
          <div className="flex items-center gap-3">
            <Target className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400 w-32">Stage:</span>
            <Badge variant="secondary">{task.stage?.name || 'Unassigned'}</Badge>
          </div>

          {/* Estimates */}
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400 w-32">Original Estimate:</span>
            <span className="text-sm">{task.originalEstimate || 0}h</span>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400 w-32">Remaining Estimate:</span>
            <span className="text-sm font-medium">{task.remainingEstimate || 0}h</span>
          </div>

          {/* Description if exists */}
          {task.description && (
            <>
              <Separator />
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Description</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                  {task.description}
                </p>
              </div>
            </>
          )}
        </div>

        <Separator />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};