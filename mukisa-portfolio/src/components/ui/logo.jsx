import React from 'react';
import { Code, Shield } from 'lucide-react';

const Logo = ({ 
  size = 'medium', 
  showText = true, 
  className = '',
  variant = 'gradient' 
}) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-12 h-12'
  };

  const textSizes = {
    small: 'text-lg',
    medium: 'text-xl', 
    large: 'text-2xl'
  };

  const iconSizes = {
    small: 'h-4 w-4',
    medium: 'h-5 w-5',
    large: 'h-6 w-6'
  };

  const shieldSizes = {
    small: 'h-2 w-2',
    medium: 'h-2.5 w-2.5',
    large: 'h-3 w-3'
  };

  const getLogoBackground = () => {
    switch (variant) {
      case 'solid':
        return 'bg-blue-600';
      case 'outline':
        return 'bg-transparent border-2 border-blue-600';
      case 'gradient':
      default:
        return 'bg-gradient-to-br from-blue-600 to-purple-600';
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon */}
      <div className="relative group">
        <div className={`${sizeClasses[size]} ${getLogoBackground()} rounded-lg flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105`}>
          <Code className={`${iconSizes[size]} text-white`} />
        </div>
        
        {/* Security Shield Badge */}
        <div className={`absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110`}>
          <Shield className={`${shieldSizes[size]} text-white`} />
        </div>
        
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
      </div>
      
      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <h1 className={`${textSizes[size]} font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
            Mukisa Samuel
          </h1>
          <p className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block transition-colors duration-300">
            Software Engineer & Ethical Hacker
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo;