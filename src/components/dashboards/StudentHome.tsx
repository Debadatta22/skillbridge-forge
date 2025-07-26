import React from 'react';
import { Outlet } from 'react-router-dom';
import StudentLayout from '../student/StudentLayout';

const StudentHome: React.FC = () => {
  return <StudentLayout />;
};

export default StudentHome;