import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types/auth';
import AnimatedBackground from '../components/ui/animated-background';
import ThemeToggle from '../components/ui/theme-toggle';
import LoginForm from '../components/auth/LoginForm';
import RightPanel from '../components/auth/RightPanel';
import RoleSelection from '../components/auth/RoleSelection';
import RegistrationForm from '../components/auth/RegistrationForm';
import SkillSelector from '../components/student/SkillSelector';
import StudentHome from '../components/dashboards/StudentHome';
import EducatorHome from '../components/dashboards/EducatorHome';
import CertifierHome from '../components/dashboards/CertifierHome';
import JobProviderHome from '../components/dashboards/JobProviderHome';

type AuthStep = 'login' | 'role-selection' | 'registration' | 'skill-selection';

const Index = () => {
  const { user, isAuthenticated } = useAuth();
  const [authStep, setAuthStep] = useState<AuthStep>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');

  if (isAuthenticated && user) {
    switch (user.role) {
      case 'student':
        return <StudentHome />;
      case 'educator':
        return <EducatorHome />;
      case 'certifier':
        return <CertifierHome />;
      case 'jobprovider':
        return <JobProviderHome />;
      default:
        return <StudentHome />;
    }
  }

  const renderAuthContent = () => {
    switch (authStep) {
      case 'login':
        return <LoginForm onSwitchToRegister={() => setAuthStep('role-selection')} />;
      case 'role-selection':
        return (
          <RoleSelection
            onSelectRole={(role) => {
              setSelectedRole(role);
              setAuthStep('registration');
            }}
            onBackToLogin={() => setAuthStep('login')}
          />
        );
      case 'registration':
        return (
          <RegistrationForm
            selectedRole={selectedRole}
            onBackToRoleSelection={() => setAuthStep('role-selection')}
            onBackToLogin={() => setAuthStep('login')}
          />
        );
      case 'skill-selection':
        return (
          <SkillSelector
            onSkillsSelected={() => {}}
            onComplete={() => {}}
          />
        );
      default:
        return <LoginForm onSwitchToRegister={() => setAuthStep('role-selection')} />;
    }
  };

  return (
    <div className="min-h-screen flex">
      <AnimatedBackground />
      <ThemeToggle />
      
      <div className="flex-1 flex items-center justify-center p-4">
        {renderAuthContent()}
      </div>
      
      <RightPanel />
    </div>
  );
};

export default Index;
