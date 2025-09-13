export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  semester?: number;
  profileImage?: string;
  xp?: number;
  level?: number;
  streak?: number;
  achievements?: Achievement[];
  joinedDate: Date;
}

export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  description: string;
  skills: string[];
  documents: Document[];
  status: 'pending' | 'approved' | 'rejected' | 'draft';
  submittedBy: string;
  submittedDate: Date;
  reviewedBy?: string;
  reviewedDate?: Date;
  feedback?: string;
  xpValue?: number;
}

export interface ActivityType {
  id: string;
  name: string;
  icon: string;
  color: string;
  xpMultiplier: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'activity' | 'streak' | 'level' | 'special';
  requirement: number;
  earned: boolean;
  earnedDate?: Date;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadDate: Date;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  userId: string;
  read: boolean;
  createdDate: Date;
}

export interface Portfolio {
  id: string;
  userId: string;
  template: 'professional' | 'academic' | 'creative';
  activities: string[];
  customization: {
    colors: string[];
    fonts: string;
    sections: string[];
  };
  generatedDate: Date;
  lastUpdated: Date;
}