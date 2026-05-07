import * as React from 'react';
import { cn } from '@/lib/utils';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const sizeMap: Record<NonNullable<LoaderProps['size']>, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-[3px]',
  lg: 'h-12 w-12 border-4',
};

export function Loader({
  size = 'md',
  label = 'Cargando...',
  className,
  ...props
}: LoaderProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        'flex flex-col items-center justify-center gap-3 py-10',
        className
      )}
      {...props}
    >
      <span
        className={cn(
          'inline-block animate-spin rounded-full border-current border-t-transparent text-black dark:text-white',
          sizeMap[size]
        )}
      />
      {label && (
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
          {label}
        </span>
      )}
    </div>
  );
}
