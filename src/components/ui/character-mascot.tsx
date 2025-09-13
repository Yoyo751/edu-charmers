import React from 'react';
import { cn } from '@/lib/utils';
import studentCharacter from '@/assets/student-character.jpg';
import adminCharacter from '@/assets/admin-character.jpg';

interface CharacterMascotProps {
  type: 'student' | 'admin';
  size?: 'sm' | 'md' | 'lg';
  animation?: 'float' | 'bounce' | 'celebrate' | 'none';
  className?: string;
  expression?: 'happy' | 'excited' | 'thinking' | 'celebrating';
}

const characterImages = {
  student: studentCharacter,
  admin: adminCharacter,
};

const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
};

const animationClasses = {
  float: 'character-float',
  bounce: 'character-bounce',
  celebrate: 'character-celebrate',
  none: '',
};

export const CharacterMascot: React.FC<CharacterMascotProps> = ({
  type,
  size = 'md',
  animation = 'float',
  className,
  expression = 'happy',
}) => {
  return (
    <div
      className={cn(
        'relative rounded-full overflow-hidden shadow-character',
        sizeClasses[size],
        animationClasses[animation],
        className
      )}
    >
      <img
        src={characterImages[type]}
        alt={`${type} character mascot`}
        className="w-full h-full object-cover"
      />
      {expression === 'celebrating' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl animate-bounce">🎉</div>
        </div>
      )}
    </div>
  );
};