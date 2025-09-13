import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/layout/Header';
import { CharacterMascot } from '@/components/ui/character-mascot';
import { XPProgress } from '@/components/ui/xp-progress';
import { AchievementBadge } from '@/components/ui/achievement-badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Trophy, 
  TrendingUp, 
  Calendar, 
  FileText, 
  Users, 
  BarChart3,
  Clock,
  CheckCircle,
  Star,
  Zap,
  Target
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  // Mock data for demonstration
  const mockAchievements = [
    { id: '1', title: 'First Activity', description: 'Complete your first activity', icon: '🎯', category: 'activity' as const, requirement: 1, earned: true, earnedDate: new Date() },
    { id: '2', title: 'Conference Goer', description: 'Attend 5 conferences', icon: '🎪', category: 'activity' as const, requirement: 5, earned: true, earnedDate: new Date() },
    { id: '3', title: 'Streak Master', description: 'Maintain 7-day streak', icon: '🔥', category: 'streak' as const, requirement: 7, earned: user.streak! >= 7 },
    { id: '4', title: 'Level Up', description: 'Reach Level 5', icon: '⭐', category: 'level' as const, requirement: 5, earned: false },
  ];

  const mockRecentActivities = [
    { id: '1', title: 'International AI Conference 2024', type: 'Conference', status: 'approved' as const, date: '2024-01-15', xp: 100 },
    { id: '2', title: 'AWS Cloud Certification', type: 'Certification', status: 'pending' as const, date: '2024-01-10', xp: 150 },
    { id: '3', title: 'Hackathon Winner', type: 'Competition', status: 'approved' as const, date: '2024-01-05', xp: 200 },
  ];

  const mockUpcomingEvents = [
    { id: '1', title: 'Tech Talk: Future of AI', date: '2024-01-25', type: 'Workshop' },
    { id: '2', title: 'Career Fair 2024', date: '2024-02-01', type: 'Event' },
    { id: '3', title: 'Research Paper Deadline', date: '2024-02-15', type: 'Deadline' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'pending': return <Clock className="w-4 h-4 text-secondary" />;
      case 'rejected': return <div className="w-4 h-4 rounded-full bg-destructive" />;
      default: return null;
    }
  };

  const getQuickActions = () => {
    switch (user.role) {
      case 'student':
        return [
          { icon: <Plus className="w-6 h-6" />, title: 'Add Activity', description: 'Log a new achievement', action: () => navigate('/activities/new'), color: 'bg-gradient-primary' },
          { icon: <FileText className="w-6 h-6" />, title: 'Portfolio', description: 'Build your portfolio', action: () => navigate('/portfolio'), color: 'bg-gradient-accent' },
          { icon: <Trophy className="w-6 h-6" />, title: 'Achievements', description: 'View your badges', action: () => navigate('/achievements'), color: 'bg-gradient-creative' },
          { icon: <TrendingUp className="w-6 h-6" />, title: 'Progress', description: 'Track your growth', action: () => navigate('/progress'), color: 'bg-gradient-secondary' },
        ];
        return [
          { icon: <CheckCircle className="w-6 h-6" />, title: 'Approvals', description: 'Review pending activities', action: () => navigate('/approvals'), color: 'bg-gradient-primary' },
          { icon: <Users className="w-6 h-6" />, title: 'Students', description: 'Manage mentees', action: () => navigate('/students'), color: 'bg-gradient-accent' },
          { icon: <BarChart3 className="w-6 h-6" />, title: 'Analytics', description: 'View department stats', action: () => navigate('/analytics'), color: 'bg-gradient-secondary' },
          { icon: <FileText className="w-6 h-6" />, title: 'Reports', description: 'Generate reports', action: () => navigate('/reports'), color: 'bg-gradient-creative' },
        ];
      case 'admin':
        return [
          { icon: <BarChart3 className="w-6 h-6" />, title: 'Analytics', description: 'Institution overview', action: () => navigate('/admin/analytics'), color: 'bg-gradient-primary' },
          { icon: <Users className="w-6 h-6" />, title: 'Users', description: 'Manage all users', action: () => navigate('/admin/users'), color: 'bg-gradient-accent' },
          { icon: <FileText className="w-6 h-6" />, title: 'NAAC Reports', description: 'Compliance reports', action: () => navigate('/admin/naac'), color: 'bg-gradient-secondary' },
          { icon: <Trophy className="w-6 h-6" />, title: 'Leaderboard', description: 'Top performers', action: () => navigate('/admin/leaderboard'), color: 'bg-gradient-creative' },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="relative bg-gradient-card rounded-3xl p-8 overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <CharacterMascot type={user.role} size="lg" animation="celebrate" />
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    Welcome back, {user.name}! 👋
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Ready to continue your learning adventure?
                  </p>
                </div>
              </div>
              
              {user.role === 'student' && (
                <div className="max-w-md">
                  <XPProgress
                    currentXP={user.xp!}
                    nextLevelXP={(user.level || 1) * 500}
                    level={user.level!}
                  />
                </div>
              )}
            </div>
            
            {user.role === 'student' && (
              <div className="hidden lg:flex items-center gap-6 text-center">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-secondary">{user.streak}</div>
                  <div className="text-sm text-muted-foreground">Day Streak 🔥</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">{user.xp}</div>
                  <div className="text-sm text-muted-foreground">Total XP ⚡</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-accent">{mockAchievements.filter(a => a.earned).length}</div>
                  <div className="text-sm text-muted-foreground">Achievements 🏆</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {getQuickActions().map((action, index) => (
              <Card 
                key={index} 
                className="card-game hover:scale-105 transition-transform cursor-pointer"
                onClick={action.action}
              >
                <div className="p-6 space-y-4">
                  <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center text-white`}>
                    {action.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activities / Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {user.role === 'student' && (
              <>
                {/* Recent Activities */}
                <Card className="card-game">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary" />
                        Recent Activities
                      </h3>
                      <Button variant="outline" onClick={() => navigate('/activities')}>
                        View All
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {mockRecentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(activity.status)}
                            <div>
                              <h4 className="font-medium text-foreground">{activity.title}</h4>
                              <p className="text-sm text-muted-foreground">{activity.type} • {activity.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-primary">+{activity.xp} XP</div>
                            <div className="text-xs text-muted-foreground capitalize">{activity.status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Achievements */}
                <Card className="card-game">
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-primary" />
                      Latest Achievements
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {mockAchievements.slice(0, 4).map((achievement) => (
                        <div key={achievement.id} className="text-center space-y-2">
                          <AchievementBadge achievement={achievement} size="lg" className="mx-auto" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{achievement.title}</p>
                            <p className="text-xs text-muted-foreground">{achievement.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </>
            )}

            {user.role === 'admin' && (
              <Card className="card-game">
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Pending Approvals
                  </h3>
                  <div className="space-y-3">
                    {mockRecentActivities.filter(a => a.status === 'pending').map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <CharacterMascot type="student" size="sm" />
                          <div>
                            <h4 className="font-medium text-foreground">{activity.title}</h4>
                            <p className="text-sm text-muted-foreground">Submitted by John Doe • {activity.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Review</Button>
                          <Button size="sm" className="btn-primary">Approve</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {user.role === 'admin' && (
              <Card className="card-game">
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Institution Overview
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 rounded-lg bg-primary/10">
                      <div className="text-2xl font-bold text-primary">1,234</div>
                      <div className="text-sm text-muted-foreground">Active Students</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-secondary/10">
                      <div className="text-2xl font-bold text-secondary">567</div>
                      <div className="text-sm text-muted-foreground">Activities This Month</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-accent/10">
                      <div className="text-2xl font-bold text-accent">89</div>
                      <div className="text-sm text-muted-foreground">Administrators</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-creative/10">
                      <div className="text-2xl font-bold text-creative">94%</div>
                      <div className="text-sm text-muted-foreground">Approval Rate</div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card className="card-game">
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Upcoming Events
                </h3>
                <div className="space-y-3">
                  {mockUpcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-foreground">{event.title}</h4>
                        <p className="text-xs text-muted-foreground">{event.type} • {event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Character Motivation */}
            <Card className="card-character">
              <div className="p-6 text-center space-y-4">
                <CharacterMascot type={user.role} size="lg" animation="float" className="mx-auto" />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Daily Motivation</h4>
                  <p className="text-sm text-muted-foreground">
                    {user.role === 'student' && "Every skill you learn and every challenge you tackle brings you closer to your dreams! Keep pushing forward! 🚀"}
                    {user.role === 'admin' && "Your leadership drives institutional excellence. Every decision you make impacts countless futures! 💫"}
                  </p>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            {user.role === 'student' && (
              <Card className="card-game">
                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary" />
                    Your Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Activities Completed</span>
                      <span className="font-semibold text-foreground">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Portfolio Views</span>
                      <span className="font-semibold text-foreground">48</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Rank in Department</span>
                      <span className="font-semibold text-primary">#3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Next Achievement</span>
                      <span className="font-semibold text-secondary">2 activities</span>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;