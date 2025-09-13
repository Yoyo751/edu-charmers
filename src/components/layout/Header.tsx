import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CharacterMascot } from '@/components/ui/character-mascot';
import { XPProgress } from '@/components/ui/xp-progress';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, Settings, LogOut, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <header className="bg-gradient-hero shadow-lg border-b border-border/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <CharacterMascot type="student" size="sm" animation="float" />
            <span className="text-2xl font-bold text-white">Smart Student Hub</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="text-white border-white/20 hover:bg-white/10"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button 
              className="btn-secondary"
              onClick={() => navigate('/register')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-gradient-hero shadow-lg border-b border-border/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3">
            <CharacterMascot type={user.role} size="sm" animation="float" />
            <span className="text-xl font-bold text-white">Smart Student Hub</span>
          </Link>

          <div className="flex items-center gap-4">
            {user.role === 'student' && user.xp !== undefined && (
              <div className="hidden md:block">
                <XPProgress
                  currentXP={user.xp}
                  nextLevelXP={(user.level || 1) * 500}
                  level={user.level || 1}
                  showNumbers={false}
                  className="w-48"
                />
              </div>
            )}

            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-white/10">
                  <CharacterMascot type={user.role} size="sm" animation="none" />
                  <span className="hidden md:inline">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};