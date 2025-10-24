import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, User } from 'lucide-react';

export const UserCard = ({ title, user, icon: Icon = User }) => {
  if (!user) {
    return (
      <Card className="border-2 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Icon className="w-4 h-4 text-gray-500" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Not assigned</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon className="w-4 h-4 text-gray-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Avatar 
            className="w-12 h-12 ring-2 ring-gray-200 dark:ring-gray-700"
            style={{ backgroundColor: user.profileColor }}
          >
            {user.avatar && <AvatarImage src={user.avatar} alt={user.firstName} />}
            <AvatarFallback className="text-white font-semibold">
              {user.firstName?.[0]}{user.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              @{user.userName}
            </p>
            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
              <Mail className="w-3 h-3" />
              <span className="truncate">{user.email}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};