import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/layout/Header';
import { CharacterMascot } from '@/components/ui/character-mascot';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  X,
  Trophy,
  FileText,
  Calendar,
  Users,
  Award,
  Target,
  Zap
} from 'lucide-react';

export const Activities: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  if (!user) {
    navigate('/login');
    return null;
  }

  // Mock activities data
  const mockActivities = [
    {
      id: '1',
      title: 'International AI Conference 2024',
      type: 'Conference',
      description: 'Attended 3-day international conference on Artificial Intelligence and Machine Learning',
      skills: ['AI', 'Machine Learning', 'Deep Learning'],
      status: 'approved' as const,
      xpValue: 100,
      submittedDate: '2024-01-15',
      reviewedDate: '2024-01-16',
      feedback: 'Excellent participation! Great learning opportunity.',
    },
    {
      id: '2',
      title: 'AWS Cloud Practitioner Certification',
      type: 'Certification',
      description: 'Successfully completed AWS Cloud Practitioner certification course and exam',
      skills: ['Cloud Computing', 'AWS', 'DevOps'],
      status: 'pending' as const,
      xpValue: 150,
      submittedDate: '2024-01-10',
    },
    {
      id: '3',
      title: 'National Hackathon Winner',
      type: 'Competition',
      description: 'Won first place in national-level hackathon with innovative healthcare solution',
      skills: ['React', 'Node.js', 'Healthcare Tech', 'Innovation'],
      status: 'approved' as const,
      xpValue: 200,
      submittedDate: '2024-01-05',
      reviewedDate: '2024-01-06',
      feedback: 'Outstanding achievement! Innovative solution with real-world impact.',
    },
    {
      id: '4',
      title: 'Community Service - Teaching Underprivileged',
      type: 'Community Service',
      description: 'Volunteered to teach programming basics to underprivileged children',
      skills: ['Teaching', 'Community Service', 'Programming'],
      status: 'draft' as const,
      xpValue: 75,
      submittedDate: '2024-01-12',
    },
  ];

  const activityTypes = [
    { name: 'Conference', icon: '🎪', color: 'bg-gradient-primary' },
    { name: 'Certification', icon: '📜', color: 'bg-gradient-secondary' },
    { name: 'Competition', icon: '🏆', color: 'bg-gradient-accent' },
    { name: 'Workshop', icon: '🛠️', color: 'bg-gradient-creative' },
    { name: 'Community Service', icon: '🤝', color: 'bg-gradient-primary' },
    { name: 'Research', icon: '🔬', color: 'bg-gradient-secondary' },
    { name: 'Internship', icon: '💼', color: 'bg-gradient-accent' },
    { name: 'Volunteering', icon: '❤️', color: 'bg-gradient-creative' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-5 h-5 text-success" />;
      case 'pending': return <Clock className="w-5 h-5 text-secondary" />;
      case 'rejected': return <X className="w-5 h-5 text-destructive" />;
      case 'draft': return <FileText className="w-5 h-5 text-muted-foreground" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-success/10 text-success';
      case 'pending': return 'bg-secondary/10 text-secondary';
      case 'rejected': return 'bg-destructive/10 text-destructive';
      case 'draft': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredActivities = mockActivities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === 'all' || activity.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: mockActivities.length,
    approved: mockActivities.filter(a => a.status === 'approved').length,
    pending: mockActivities.filter(a => a.status === 'pending').length,
    totalXP: mockActivities.filter(a => a.status === 'approved').reduce((sum, a) => sum + a.xpValue, 0),
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CharacterMascot type={user.role} size="lg" animation="float" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Activities</h1>
              <p className="text-muted-foreground">Track and manage your academic achievements</p>
            </div>
          </div>
          
          <Button 
            className="btn-hero"
            onClick={() => navigate('/activities/new')}
          >
            <Plus className="mr-2 w-5 h-5" />
            Add Activity
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="card-game">
            <div className="p-6 text-center space-y-2">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white mx-auto">
                <Target className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-foreground">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Activities</div>
            </div>
          </Card>
          
          <Card className="card-game">
            <div className="p-6 text-center space-y-2">
              <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center text-white mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-foreground">{stats.approved}</div>
              <div className="text-sm text-muted-foreground">Approved</div>
            </div>
          </Card>
          
          <Card className="card-game">
            <div className="p-6 text-center space-y-2">
              <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center text-white mx-auto">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-foreground">{stats.pending}</div>
              <div className="text-sm text-muted-foreground">Pending Review</div>
            </div>
          </Card>
          
          <Card className="card-game">
            <div className="p-6 text-center space-y-2">
              <div className="w-12 h-12 bg-gradient-creative rounded-xl flex items-center justify-center text-white mx-auto">
                <Zap className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-foreground">{stats.totalXP}</div>
              <div className="text-sm text-muted-foreground">Total XP Earned</div>
            </div>
          </Card>
        </div>

        {/* Activity Types Quick Add */}
        <Card className="card-game">
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Quick Add Activity
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {activityTypes.map((type) => (
                <Button
                  key={type.name}
                  variant="outline"
                  className="flex flex-col h-auto p-4 gap-2 hover:scale-105 transition-transform"
                  onClick={() => navigate(`/activities/new?type=${type.name.toLowerCase()}`)}
                >
                  <div className={`w-10 h-10 rounded-lg ${type.color} flex items-center justify-center text-white text-lg`}>
                    {type.icon}
                  </div>
                  <span className="text-xs font-medium">{type.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Search and Filter */}
        <Card className="card-game">
          <div className="p-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search activities, types, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 input-game"
                />
              </div>
              
              <div className="flex gap-2">
                {['all', 'approved', 'pending', 'draft'].map((status) => (
                  <Button
                    key={status}
                    variant={filterStatus === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus(status)}
                    className="capitalize"
                  >
                    {status === 'all' ? 'All' : status}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Activities List */}
        <div className="space-y-4">
          {filteredActivities.length === 0 ? (
            <Card className="card-game">
              <div className="p-12 text-center space-y-4">
                <CharacterMascot type="student" size="lg" animation="float" className="mx-auto opacity-50" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No Activities Found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || filterStatus !== 'all' 
                      ? 'No activities match your search criteria.' 
                      : 'Start your journey by adding your first activity!'
                    }
                  </p>
                  <Button 
                    className="btn-primary"
                    onClick={() => navigate('/activities/new')}
                  >
                    <Plus className="mr-2 w-4 h-4" />
                    Add Your First Activity
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            filteredActivities.map((activity) => (
              <Card key={activity.id} className="card-game hover:scale-[1.02] transition-transform cursor-pointer">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white text-lg">
                        {activityTypes.find(t => t.name === activity.type)?.icon || '📄'}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-foreground">{activity.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {activity.type}
                          </Badge>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)} flex items-center gap-1`}>
                            {getStatusIcon(activity.status)}
                            {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-3">{activity.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {activity.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Submitted: {activity.submittedDate}
                          </div>
                          {activity.reviewedDate && (
                            <div className="flex items-center gap-1">
                              <CheckCircle className="w-4 h-4" />
                              Reviewed: {activity.reviewedDate}
                            </div>
                          )}
                        </div>
                        
                        {activity.feedback && (
                          <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm text-foreground">
                              <strong>Feedback:</strong> {activity.feedback}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right space-y-2">
                      <div className="text-2xl font-bold text-primary">+{activity.xpValue}</div>
                      <div className="text-xs text-muted-foreground">XP Value</div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <FileText className="w-4 h-4" />
                        </Button>
                        {activity.status === 'draft' && (
                          <Button size="sm" className="btn-primary">
                            Submit
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Character Encouragement */}
        <Card className="card-character">
          <div className="p-6 text-center space-y-4">
            <CharacterMascot type="student" size="lg" animation="celebrate" className="mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Keep Building Your Portfolio! 🚀</h3>
              <p className="text-muted-foreground">
                Every activity you complete brings you closer to your goals. The journey of a thousand miles begins with a single step!
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Activities;