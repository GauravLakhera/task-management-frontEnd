import React from 'react';
import { Button } from '@/components/ui/button';
import { FolderOpen, Plus } from 'lucide-react';

export const DashboardEmptyState = ({ onCreateClick }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="text-center max-w-md">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <FolderOpen className="w-12 h-12 text-blue-500" />
        </div>
        <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">
          No Projects Yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Get started by creating your first project. Organize your team, track progress, and achieve your goals.
        </p>
        <Button 
          size="lg"
          onClick={onCreateClick}
          className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Plus className="w-5 h-5" />
          Create Your First Project
        </Button>
      </div>
    </div>
  );
};
