import React from 'react';
import { Home, Users, UserCheck, Calendar, Clock, MessageSquare, BarChart3, BookOpen, Settings } from 'lucide-react';
import RoleLayout from '../shared/RoleLayout';

const IndExpertLayout: React.FC = () => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/indExpert' },
    { id: 'applicants', label: 'Applicants', icon: Users, path: '/indExpert/applicants' },
    { id: 'smart-selection', label: 'Smart Selection', icon: UserCheck, path: '/indExpert/smart-selection' },
    { id: 'interviews', label: 'Schedule Interviews', icon: Calendar, path: '/indExpert/interviews' },
    { id: 'calendar', label: 'Event Calendar', icon: Clock, path: '/indExpert/calendar' },
    { id: 'mentoring', label: 'Mentoring Sessions', icon: MessageSquare, path: '/indExpert/mentoring' },
    { id: 'courses', label: 'My Courses', icon: BookOpen, path: '/indExpert/courses' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/indExpert/analytics' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/indExpert/settings' },
  ];

  return <RoleLayout role="indExpert" menuItems={menuItems} />;
};

export default IndExpertLayout;