import React from 'react';
import { Button } from '@/components/ui/button';
import { FileQuestion, Filter } from 'lucide-react';

export const EmptyState = ({ hasActiveFilters, onClearFilters, isFiltered }) => {
  if (isFiltered) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="text-center max-w-md">
          <div className="bg-blue-50 dark:bg-blue-900/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="w-10 h-10 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
            No Tasks Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            No tasks match your current filters. Try adjusting your search criteria.
          </p>
          <Button onClick={onClearFilters} variant="outline">
            Clear All Filters
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="text-center max-w-md">
        <div className="bg-gray-50 dark:bg-gray-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileQuestion className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          No Tasks Yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          There are no tasks in this project yet. Create your first task to get started!
        </p>
      </div>
    </div>
  );
};