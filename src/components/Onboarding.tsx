import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CharacterMascot } from '@/components/ui/character-mascot';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OnboardingProps {
  onComplete: () => void;
}

const onboardingSteps = [
  {
    title: "Track Your Journey",
    description: "Log conferences, certifications, competitions, and achievements to build your academic portfolio",
    character: 'student' as const,
    animation: 'celebrate' as const,
    bgGradient: "from-primary to-primary-glow"
  },
  {
    title: "Earn XP & Level Up",
    description: "Gain experience points, unlock achievements, and watch your academic level grow with every activity",
    character: 'student' as const,
    animation: 'bounce' as const,
    bgGradient: "from-accent to-secondary"
  },
  {
    title: "Build Smart Portfolios",
    description: "Generate beautiful portfolios automatically from your tracked activities and share with employers",
    character: 'admin' as const,
    animation: 'float' as const,
    bgGradient: "from-secondary to-primary"
  }
];

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipOnboarding = () => {
    onComplete();
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Skip Button */}
      <div className="flex justify-end p-4">
        <Button 
          variant="ghost" 
          onClick={skipOnboarding}
          className="text-muted-foreground"
        >
          Skip
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${currentStepData.bgGradient} opacity-10`} />
        
        {/* Character */}
        <div className="relative mb-8 transform scale-150">
          <CharacterMascot 
            type={currentStepData.character}
            size="lg"
            animation={currentStepData.animation}
          />
        </div>

        {/* Content */}
        <div className="text-center space-y-4 max-w-sm">
          <h2 className="text-3xl font-bold text-foreground">
            {currentStepData.title}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {currentStepData.description}
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex space-x-2 mt-8">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentStep 
                  ? 'bg-primary scale-125' 
                  : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center p-6 bg-background/80 backdrop-blur-sm border-t">
        <Button
          variant="ghost"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <Button
          onClick={nextStep}
          className="flex items-center gap-2 btn-primary"
        >
          {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};