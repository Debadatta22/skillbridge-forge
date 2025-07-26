import React from 'react';
import { Outlet } from 'react-router-dom';
import StudentLayout from '../student/StudentLayout';

const StudentHome: React.FC = () => {
  return (
    <StudentLayout>
      <Outlet />
    </StudentLayout>
  );
};

export default StudentHome;