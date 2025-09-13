import React from 'react';
import { cn } from '@/lib/utils';
import { Achievement } from '@/types';

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showTooltip?: boolean;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-16 h-16 text-base',
};

const categoryColors = {
  activity: 'bg-gradient-primary',
  streak: 'bg-gradient-secondary',
  level: 'bg-gradient-accent',
  special: 'bg-gradient-creative',
};

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  achievement,
  size = 'md',
  className,
  showTooltip = true,
}) => {
  return (
    <div
      className={cn(
        'relative rounded-full flex items-center justify-center font-bold text-white shadow-md transition-transform hover:scale-110',
        sizeClasses[size],
        categoryColors[achievement.category],
        !achievement.earned && 'grayscale opacity-50',
        className
      )}
      title={showTooltip ? `${achievement.title}: ${achievement.description}` : undefined}
    >
      <span className="text-center">{achievement.icon}</span>
      {achievement.earned && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center">
          <span className="text-xs">✓</span>
        </div>
      )}
    </div>
  );
};