import React from 'react';
import { Home, Upload, Award, BarChart3, Bell, Users, FileCheck, Settings } from 'lucide-react';
import RoleLayout from '../shared/RoleLayout';
import CertifierHome from '../dashboards/CertifierHome';

const CertifierLayout: React.FC = () => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/certifier' },
    { id: 'upload-course', label: 'Upload Course', icon: Upload, path: '/certifier/upload-course' },
    { id: 'certification', label: 'Certification Panel', icon: Award, path: '/certifier/certification' },
    { id: 'analytics', label: 'Student Analytics', icon: BarChart3, path: '/certifier/analytics' },
    { id: 'students', label: 'Student Management', icon: Users, path: '/certifier/students' },
    { id: 'certificates', label: 'Certificate Management', icon: FileCheck, path: '/certifier/certificates' },
    { id: 'notifications', label: 'Notifications', icon: Bell, path: '/certifier/notifications' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/certifier/settings' },
  ];

  return (
    <RoleLayout role="certifier" menuItems={menuItems}>
      <CertifierHome />
    </RoleLayout>
  );
};

export default CertifierLayout;