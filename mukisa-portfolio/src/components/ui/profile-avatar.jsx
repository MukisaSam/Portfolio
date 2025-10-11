import React from 'react';
import { User } from 'lucide-react';

const ProfileAvatar = ({ 
  size = 'large', 
  className = '', 
  showOnlineStatus = false 
}) => {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-20 h-20', 
    large: 'w-32 h-32',
    xl: 'w-40 h-40'
  };

  const iconSizes = {
    small: 'h-6 w-6',
    medium: 'h-10 w-10',
    large: 'h-16 w-16', 
    xl: 'h-20 w-20'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Main Avatar */}
      <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-xl">
        <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
          {/* Placeholder for actual photo - replace with img tag when you have a real photo */}
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
            <User className={`${iconSizes[size]} text-blue-600 dark:text-blue-400`} />
          </div>
          
          {/* Alternative: Use initials as fallback */}
          {/* <span className="text-4xl font-bold text-gray-800 dark:text-gray-200">MS</span> */}
          
          {/* When you have a real photo, replace above with: */}
          {/* <img 
            src="/profile-photo.jpg" 
            alt="Mukisa Samuel - Software Engineer and Ethical Hacker"
            className="w-full h-full object-cover"
          /> */}
        </div>
      </div>
      
      {/* Online Status Indicator */}
      {showOnlineStatus && (
        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full shadow-sm">
          <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
        </div>
      )}
      
      {/* Subtle Animation */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default ProfileAvatar;