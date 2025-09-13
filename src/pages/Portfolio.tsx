import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/layout/Header';
import { CharacterMascot } from '@/components/ui/character-mascot';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  Share2, 
  Eye, 
  Edit, 
  Plus,
  Palette,
  Layout,
  Star,
  QrCode,
  ExternalLink,
  Trophy,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  Globe
} from 'lucide-react';

export const Portfolio: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<'professional' | 'academic' | 'creative'>('professional');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  // Mock portfolio data
  const portfolioData = {
    personalInfo: {
      name: user.name,
      email: user.email,
      phone: '+91 9876543210',
      location: 'Jammu, J&K, India',
      website: 'www.johndoe.dev',
      bio: 'Passionate Computer Science student with a strong interest in AI/ML and full-stack development. Actively participating in conferences, competitions, and community service.',
    },
    activities: [
      {
        id: '1',
        title: 'International AI Conference 2024',
        type: 'Conference',
        description: 'Attended 3-day international conference on Artificial Intelligence and Machine Learning',
        skills: ['AI', 'Machine Learning', 'Deep Learning'],
        date: '2024-01-15',
        xpValue: 100,
        category: 'Learning & Development',
      },
      {
        id: '3',
        title: 'National Hackathon Winner',
        type: 'Competition',
        description: 'Won first place in national-level hackathon with innovative healthcare solution',
        skills: ['React', 'Node.js', 'Healthcare Tech', 'Innovation'],
        date: '2024-01-05',
        xpValue: 200,
        category: 'Achievements',
      },
      {
        id: '4',
        title: 'Community Service - Teaching Underprivileged',
        type: 'Community Service',
        description: 'Volunteered to teach programming basics to underprivileged children',
        skills: ['Teaching', 'Community Service', 'Programming'],
        date: '2024-01-12',
        xpValue: 75,
        category: 'Social Impact',
      },
    ],
    stats: {
      totalActivities: 12,
      totalXP: 1250,
      level: 3,
      achievements: 8,
    },
  };

  const templates = [
    {
      id: 'professional' as const,
      name: 'Professional',
      description: 'Clean and formal design perfect for corporate applications',
      color: 'bg-gradient-primary',
      character: 'admin' as const,
    },
    {
      id: 'academic' as const,
      name: 'Academic',
      description: 'Traditional layout ideal for educational institutions',
      color: 'bg-gradient-accent',
      character: 'faculty' as const,
    },
    {
      id: 'creative' as const,
      name: 'Creative',
      description: 'Modern and vibrant design for creative professionals',
      color: 'bg-gradient-creative',
      character: 'student' as const,
    },
  ];

  const colorSchemes = [
    { name: 'Classic', primary: '#58CC02', secondary: '#FF9600' },
    { name: 'Ocean', primary: '#1CB0F6', secondary: '#00BCD4' },
    { name: 'Sunset', primary: '#FF6B6B', secondary: '#4ECDC4' },
    { name: 'Forest', primary: '#4CAF50', secondary: '#8BC34A' },
  ];

  const generatePDF = () => {
    // Mock PDF generation
    const toast = document.createElement('div');
    toast.textContent = 'Portfolio PDF generated successfully! 📄';
    toast.className = 'fixed top-4 right-4 bg-success text-white px-4 py-2 rounded-lg shadow-lg z-50';
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 3000);
  };

  const sharePortfolio = () => {
    // Mock share functionality
    const toast = document.createElement('div');
    toast.textContent = 'Portfolio link copied to clipboard! 🔗';
    toast.className = 'fixed top-4 right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg z-50';
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 3000);
  };

  const PortfolioPreview = () => (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-card rounded-2xl p-8 text-center">
        <div className="space-y-4">
          <CharacterMascot type={user.role} size="lg" className="mx-auto" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">{portfolioData.personalInfo.name}</h1>
            <p className="text-xl text-primary">{user.department}</p>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              {portfolioData.personalInfo.bio}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <span>{portfolioData.personalInfo.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              <span>{portfolioData.personalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{portfolioData.personalInfo.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              <span>{portfolioData.personalInfo.website}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-gradient-primary rounded-xl text-white">
          <div className="text-2xl font-bold">{portfolioData.stats.totalActivities}</div>
          <div className="text-sm opacity-90">Activities</div>
        </div>
        <div className="text-center p-4 bg-gradient-secondary rounded-xl text-white">
          <div className="text-2xl font-bold">{portfolioData.stats.totalXP}</div>
          <div className="text-sm opacity-90">XP Earned</div>
        </div>
        <div className="text-center p-4 bg-gradient-accent rounded-xl text-white">
          <div className="text-2xl font-bold">Level {portfolioData.stats.level}</div>
          <div className="text-sm opacity-90">Current Level</div>
        </div>
        <div className="text-center p-4 bg-gradient-creative rounded-xl text-white">
          <div className="text-2xl font-bold">{portfolioData.stats.achievements}</div>
          <div className="text-sm opacity-90">Achievements</div>
        </div>
      </div>

      {/* Activities Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Trophy className="w-6 h-6 text-primary" />
          Featured Activities
        </h2>
        
        <div className="space-y-4">
          {portfolioData.activities.map((activity) => (
            <Card key={activity.id} className="card-game">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-foreground">{activity.title}</h3>
                      <Badge variant="outline">{activity.type}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{activity.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {activity.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {activity.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {activity.category}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">+{activity.xpValue} XP</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  if (isPreviewMode) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => setIsPreviewMode(false)}>
                <Edit className="mr-2 w-4 h-4" />
                Edit Portfolio
              </Button>
              <h1 className="text-2xl font-bold text-foreground">Portfolio Preview</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={generatePDF}>
                <Download className="mr-2 w-4 h-4" />
                Download PDF
              </Button>
              <Button variant="outline" onClick={sharePortfolio}>
                <Share2 className="mr-2 w-4 h-4" />
                Share
              </Button>
              <Button variant="outline">
                <QrCode className="mr-2 w-4 h-4" />
                QR Code
              </Button>
            </div>
          </div>
          <PortfolioPreview />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CharacterMascot type="student" size="lg" animation="float" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Portfolio Builder</h1>
              <p className="text-muted-foreground">Create your professional portfolio in minutes</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsPreviewMode(true)}>
              <Eye className="mr-2 w-4 h-4" />
              Preview
            </Button>
            <Button className="btn-hero" onClick={generatePDF}>
              <Download className="mr-2 w-4 h-4" />
              Generate PDF
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Customization */}
          <div className="space-y-6">
            {/* Template Selection */}
            <Card className="card-game">
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Layout className="w-5 h-5 text-primary" />
                  Choose Template
                </h3>
                <div className="space-y-3">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedTemplate === template.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg ${template.color} flex items-center justify-center`}>
                          <CharacterMascot type={template.character} size="sm" animation="none" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{template.name}</h4>
                          <p className="text-xs text-muted-foreground">{template.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Color Scheme */}
            <Card className="card-game">
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  Color Scheme
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {colorSchemes.map((scheme) => (
                    <div
                      key={scheme.name}
                      className="p-3 rounded-lg border border-border hover:border-primary cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: scheme.primary }}
                        />
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: scheme.secondary }}
                        />
                      </div>
                      <p className="text-xs font-medium">{scheme.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Activity Selection */}
            <Card className="card-game">
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    Select Activities
                  </h3>
                  <Button size="sm" variant="outline" onClick={() => navigate('/activities')}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {portfolioData.activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-border"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Actions */}
            <Card className="card-game">
              <div className="p-6 space-y-3">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-primary" />
                  Share Portfolio
                </h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" onClick={sharePortfolio}>
                    <ExternalLink className="mr-2 w-4 h-4" />
                    Copy Public Link
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <QrCode className="mr-2 w-4 h-4" />
                    Generate QR Code
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={generatePDF}>
                    <Download className="mr-2 w-4 h-4" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Content - Portfolio Preview */}
          <div className="lg:col-span-2">
            <Card className="card-game">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-foreground">Portfolio Preview</h3>
                  <Button variant="outline" onClick={() => setIsPreviewMode(true)}>
                    <Eye className="mr-2 w-4 h-4" />
                    Full Preview
                  </Button>
                </div>
                
                <div className="bg-muted/20 rounded-lg p-6 space-y-6">
                  <PortfolioPreview />
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Character Encouragement */}
        <Card className="card-character">
          <div className="p-6 text-center space-y-4">
            <CharacterMascot type="admin" size="lg" animation="celebrate" className="mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Your Portfolio Looks Amazing! ✨</h3>
              <p className="text-muted-foreground">
                A well-crafted portfolio is your gateway to opportunities. Keep adding activities and watch your profile shine!
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Portfolio;