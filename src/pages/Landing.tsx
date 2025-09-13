import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CharacterMascot } from '@/components/ui/character-mascot';
import { Card } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Onboarding } from '@/components/Onboarding';
import heroBanner from '@/assets/hero-banner.jpg';
import { 
  GraduationCap, 
  Users, 
  BarChart3, 
  Trophy, 
  Zap, 
  Target, 
  ArrowRight,
  Star,
  Award,
  TrendingUp,
  Smartphone,
  Download
} from 'lucide-react';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  const features = [
    {
      title: 'Track Activities',
      description: 'Log conferences, certifications, competitions, and more with ease',
      icon: <Target className="w-6 h-6" />,
      character: 'student' as const,
    },
    {
      title: 'Gamified Progress',
      description: 'Earn XP, unlock achievements, and level up your academic journey',
      icon: <Trophy className="w-6 h-6" />,
      character: 'student' as const,
    },
    {
      title: 'Smart Portfolio',
      description: 'Generate beautiful portfolios automatically from your activities',
      icon: <Star className="w-6 h-6" />,
      character: 'student' as const,
    },
    {
      title: 'Analytics Dashboard',
      description: 'Comprehensive insights for administrators and institutions',
      icon: <TrendingUp className="w-6 h-6" />,
      character: 'admin' as const,
    },
    {
      title: 'NAAC Compliance',
      description: 'Built-in support for NAAC, AICTE, and NIRF requirements',
      icon: <BarChart3 className="w-6 h-6" />,
      character: 'admin' as const,
    },
  ];

  const userTypes = [
    {
      type: 'Student',
      role: 'student' as const,
      description: 'Track your academic journey, earn achievements, and build your portfolio',
      benefits: ['Activity Tracking', 'XP & Levels', 'Portfolio Builder', 'Achievement Badges'],
      action: 'Start Your Journey',
    },
    {
      type: 'Administrator',
      role: 'admin' as const,
      description: 'Manage institution-wide analytics and compliance reporting',
      benefits: ['System Management', 'NAAC Reports', 'User Analytics', 'Compliance Tools'],
      action: 'Manage Institution',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile App Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b px-4 py-3 md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CharacterMascot type="student" size="sm" animation="float" />
            <span className="font-bold text-lg">Student Hub</span>
          </div>
          <Button size="sm" onClick={() => setShowOnboarding(true)}>
            Tour
          </Button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block">
        <Header />
      </div>
      
      {/* Hero Section - App Style */}
      <section className="relative bg-gradient-hero overflow-hidden">
        <div className="container mx-auto px-4 py-8 md:py-20">
          {/* Mobile App Layout */}
          <div className="md:hidden text-center text-white space-y-6">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <CharacterMascot type="student" size="lg" animation="celebrate" className="w-full h-full" />
              <div className="absolute -top-2 -right-2">
                <span className="xp-badge text-xs">Level Up!</span>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold leading-tight">
              Student Hub
            </h1>
            
            <p className="text-lg text-white/90 leading-relaxed px-4">
              Track activities, earn XP, and build your academic portfolio in this gamified learning app.
            </p>
            
            <div className="space-y-3 pt-4">
              <Button 
                className="w-full btn-hero py-4 text-lg"
                onClick={() => navigate('/register')}
              >
                <Download className="mr-2 w-5 h-5" />
                Get Started Free
              </Button>
              <Button 
                variant="outline" 
                className="w-full text-white border-white/20 hover:bg-white/10 py-3"
                onClick={() => navigate('/login')}
              >
                Already have an account?
              </Button>
            </div>
            
            <div className="flex justify-center items-center gap-4 pt-4 text-white/80 text-sm">
              <div className="flex items-center gap-1">
                <Smartphone className="w-4 h-4" />
                <span>Mobile App</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                <span>100% Free</span>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <CharacterMascot type="student" size="md" animation="celebrate" />
                <span className="xp-badge">Level Up Your Education!</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Smart Student Hub
              </h1>
              
              <p className="text-xl text-white/90 leading-relaxed">
                Transform your academic journey into an engaging adventure. Track activities, 
                earn achievements, and build impressive portfolios with our gamified platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  className="btn-hero"
                  onClick={() => navigate('/register')}
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  className="text-white border-white/20 hover:bg-white/10 py-4 px-8 rounded-2xl text-lg"
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </Button>
              </div>
              
              <div className="flex items-center gap-6 pt-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>10,000+ Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  <span>50+ Institutions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  <span>100% Free</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroBanner} 
                alt="Smart Student Hub Hero" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-4 -right-4">
                <CharacterMascot type="student" size="lg" animation="celebrate" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Type Selection - App Style */}
      <section className="py-8 md:py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-2 md:mb-4">
              Choose Your Role
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands transforming their educational experience
            </p>
          </div>
          
          <div className="grid gap-4 md:gap-8 md:grid-cols-2 max-w-2xl mx-auto">
            {userTypes.map((userType) => (
              <Card key={userType.type} className="card-game hover:scale-105 transition-transform cursor-pointer p-6">
                <div className="text-center space-y-4">
                  <div className="relative">
                    <CharacterMascot 
                      type={userType.role} 
                      size="lg" 
                      animation="float" 
                      className="mx-auto"
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                      {userType.type}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base mb-4">
                      {userType.description}
                    </p>
                  </div>
                  
                  <ul className="space-y-2 text-sm">
                    {userType.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2 justify-center md:justify-start">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="btn-primary w-full mt-4"
                    onClick={() => navigate('/register', { state: { role: userType.role } })}
                  >
                    {userType.action}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to track, manage, and showcase academic achievements
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-game group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {feature.description}
                    </p>
                    <CharacterMascot 
                      type={feature.character} 
                      size="sm" 
                      animation="none"
                      className="opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex justify-center gap-4 mb-6">
              <CharacterMascot type="student" animation="celebrate" />
              <CharacterMascot type="admin" animation="float" />
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Ready to Transform Your Academic Journey?
            </h2>
            
            <p className="text-xl text-white/90">
              Join the Smart Student Hub community and start earning achievements today!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button 
                className="btn-hero"
                onClick={() => navigate('/register')}
              >
                Start Your Adventure
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                className="text-white border-white/20 hover:bg-white/10 py-4 px-8 rounded-2xl text-lg"
                onClick={() => navigate('/login')}
              >
                Already Have Account?
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CharacterMascot type="student" size="sm" />
                <span className="text-xl font-bold">Smart Student Hub</span>
              </div>
              <p className="text-white/70">
                Gamifying education for a brighter future in Jammu & Kashmir.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-white/70">
                <li><Link to="/features" className="hover:text-white">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/institutions" className="hover:text-white">For Institutions</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-white/70">
                <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link to="/documentation" className="hover:text-white">Documentation</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-white/70">
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="/cookies" className="hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/70">
            <p>&copy; 2024 Smart Student Hub. Made with ❤️ for Jammu & Kashmir's education.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;