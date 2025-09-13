import React from 'react';
import { cn } from '@/lib/utils';

interface XPProgressProps {
  currentXP: number;
  nextLevelXP: number;
  level: number;
  className?: string;
  showNumbers?: boolean;
}

export const XPProgress: React.FC<XPProgressProps> = ({
  currentXP,
  nextLevelXP,
  level,
  className,
  showNumbers = true,
}) => {
  const progress = (currentXP / nextLevelXP) * 100;
  const remainingXP = nextLevelXP - currentXP;

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="xp-badge">
            Level {level}
          </div>
          {showNumbers && (
            <span className="text-sm text-muted-foreground">
              {currentXP} / {nextLevelXP} XP
            </span>
          )}
        </div>
        {showNumbers && (
          <span className="text-sm text-primary font-semibold">
            {remainingXP} XP to next level
          </span>
        )}
      </div>
      <div className="progress-bar h-3">
        <div
          className="h-full bg-gradient-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
};