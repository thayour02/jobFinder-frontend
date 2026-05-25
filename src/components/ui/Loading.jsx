import React from 'react';
import { cn } from '../../utils/cn';

const LoadingSpinner = ({ className, size = 'default' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    default: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-gray-300 border-t-purple-600',
        sizeClasses[size],
        className
      )}
    />
  );
};

const LoadingSkeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200',
        className
      )}
      {...props}
    />
  );
};

const LoadingCard = ({ className }) => {
  return (
    <div className={cn('rounded-lg border bg-white p-6 shadow-sm', className)}>
      <LoadingSkeleton className="mb-4 h-6 w-3/4" />
      <LoadingSkeleton className="mb-2 h-4 w-full" />
      <LoadingSkeleton className="mb-2 h-4 w-5/6" />
      <LoadingSkeleton className="h-4 w-4/5" />
    </div>
  );
};

const LoadingPage = ({ message = 'Loading...' }) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="xl" className="mx-auto mb-4" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export { LoadingSpinner, LoadingSkeleton, LoadingCard, LoadingPage };
