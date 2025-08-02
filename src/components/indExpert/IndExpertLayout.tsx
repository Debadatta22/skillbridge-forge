import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Users, UserCheck, Calendar, Clock, MessageSquare, BarChart3, BookOpen, Settings as SettingsIcon } from 'lucide-react';
import RoleLayout from '../shared/RoleLayout';
import Dashboard from './Dashboard';
import Applicants from './Applicants';
import SmartSelection from './SmartSelection';
import ScheduleInterviews from './ScheduleInterviews';
import EventCalendar from './EventCalendar';
import MentoringSessions from './MentoringSessions';
import MyCourses from './MyCourses';
import Analytics from './Analytics';
import Settings from './Settings';

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
    { id: 'settings', label: 'Settings', icon: SettingsIcon, path: '/indExpert/settings' },
  ];

  return (
    <RoleLayout role="indExpert" menuItems={menuItems}>
      <div className="animate-fade-in">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/applicants" element={<Applicants />} />
          <Route path="/smart-selection" element={<SmartSelection />} />
          <Route path="/interviews" element={<ScheduleInterviews />} />
          <Route path="/calendar" element={<EventCalendar />} />
          <Route path="/mentoring" element={<MentoringSessions />} />
          <Route path="/courses" element={<MyCourses />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </RoleLayout>
  );
};

export default IndExpertLayout;