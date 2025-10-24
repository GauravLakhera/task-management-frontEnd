import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, UserPlus, ListTodo, Settings } from 'lucide-react';

export const QuickActions = ({ 
  onCreateTask, 
  onAddMembers, 
  onViewTasks,
  onSettings 
}) => {
  return (
    <div className="flex flex-wrap gap-3">
      <Button 
        onClick={onCreateTask}
        className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
      >
        <Plus className="w-4 h-4" />
        Create Task
      </Button>
      <Button 
        variant="outline"
        onClick={onAddMembers}
        className="gap-2"
      >
        <UserPlus className="w-4 h-4" />
        Add Members
      </Button>
      <Button 
        variant="outline"
        onClick={onViewTasks}
        className="gap-2"
      >
        <ListTodo className="w-4 h-4" />
        View All Tasks
      </Button>
    </div>
  );
};