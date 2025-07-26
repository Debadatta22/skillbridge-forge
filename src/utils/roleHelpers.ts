import { UserRole } from '../types/auth';
import { GraduationCap, Users, Award, Briefcase } from 'lucide-react';

export const getRoleColor = (role: UserRole) => {
  const colors = {
    student: {
      primary: 'hsl(var(--student-primary))',
      secondary: 'hsl(var(--student-secondary))',
      gradient: 'gradient-student',
      bgClass: 'bg-section-blue'
    },
    educator: {
      primary: 'hsl(var(--educator-primary))',
      secondary: 'hsl(var(--educator-secondary))',
      gradient: 'gradient-educator',
      bgClass: 'bg-section-green'
    },
    certifier: {
      primary: 'hsl(var(--certifier-primary))',
      secondary: 'hsl(var(--certifier-secondary))',
      gradient: 'gradient-certifier',
      bgClass: 'bg-section-purple'
    },
    jobprovider: {
      primary: 'hsl(var(--jobprovider-primary))',
      secondary: 'hsl(var(--jobprovider-secondary))',
      gradient: 'gradient-jobprovider',
      bgClass: 'bg-section-orange'
    }
  };
  return colors[role];
};

export const getRoleIcon = (role: UserRole) => {
  const icons = {
    student: GraduationCap,
    educator: Users,
    certifier: Award,
    jobprovider: Briefcase
  };
  return icons[role];
};

export const getRoleDisplayName = (role: UserRole) => {
  const names = {
    student: 'Student',
    educator: 'Educator',
    certifier: 'Certifier',
    jobprovider: 'Job Provider'
  };
  return names[role];
};

export const getRoleDescription = (role: UserRole) => {
  const descriptions = {
    student: 'Access personalized learning paths, gain certifications, and connect with mentors for career growth.',
    educator: 'Create courses, mentor students, and share expertise while building your professional network.',
    certifier: 'Verify achievements, issue digital certificates, and maintain credibility standards.',
    jobprovider: 'Post opportunities, find skilled candidates, and build talented teams for your organization.'
  };
  return descriptions[role];
};