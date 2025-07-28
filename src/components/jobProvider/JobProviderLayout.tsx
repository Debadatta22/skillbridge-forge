import React from 'react';
import { Home, Plus, Briefcase, ClipboardList, Users, BarChart3, Calendar, Settings, Search } from 'lucide-react';
import RoleLayout from '../shared/RoleLayout';

const JobProviderLayout: React.FC = () => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/jobProvider' },
    { id: 'post-job', label: 'Post New Job', icon: Plus, path: '/jobProvider/post-job' },
    { id: 'manage-jobs', label: 'Manage Jobs', icon: Briefcase, path: '/jobProvider/manage-jobs' },
    { id: 'assessments', label: 'Host Assessments', icon: ClipboardList, path: '/jobProvider/assessments' },
    { id: 'candidates', label: 'Browse Candidates', icon: Search, path: '/jobProvider/candidates' },
    { id: 'applications', label: 'Applications', icon: Users, path: '/jobProvider/applications' },
    { id: 'analytics', label: 'Candidate Analytics', icon: BarChart3, path: '/jobProvider/analytics' },
    { id: 'schedule', label: 'Interview Schedule', icon: Calendar, path: '/jobProvider/schedule' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/jobProvider/settings' },
  ];

  return <RoleLayout role="jobprovider" menuItems={menuItems} />;
};

export default JobProviderLayout;