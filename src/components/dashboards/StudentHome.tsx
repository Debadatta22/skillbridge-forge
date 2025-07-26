import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentLayout from '../student/StudentLayout';
import CareerPathNavigator from '../student/CareerPathNavigator';
import CourseList from '../student/courses/CourseList';
import StudyPlanner from '../student/StudyPlanner';
import ProgressAnalytics from '../student/ProgressAnalytics';
import SkillLab from '../student/SkillLab';
import ARVRLabs from '../student/ARVRLabs';
import Explore from '../student/Explore';

const StudentHome: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentLayout />}>
        <Route index element={<CareerPathNavigator />} />
        <Route path="student" element={<CareerPathNavigator />} />
        <Route path="student/courses" element={<CourseList />} />
        <Route path="student/study-planner" element={<StudyPlanner />} />
        <Route path="student/progress" element={<ProgressAnalytics />} />
        <Route path="student/skill-lab" element={<SkillLab />} />
        <Route path="student/ar-vr-labs" element={<ARVRLabs />} />
        <Route path="student/achievements" element={<div className="p-8 text-center text-muted-foreground">Achievements section coming soon...</div>} />
        <Route path="student/leaderboard" element={<div className="p-8 text-center text-muted-foreground">Leaderboard section coming soon...</div>} />
        <Route path="student/mentors" element={<div className="p-8 text-center text-muted-foreground">Connect with Mentors section coming soon...</div>} />
        <Route path="student/jobs" element={<div className="p-8 text-center text-muted-foreground">Job Opportunities section coming soon...</div>} />
        <Route path="student/explore" element={<Explore />} />
        <Route path="student/resume" element={<div className="p-8 text-center text-muted-foreground">Resume Builder & ATS section coming soon...</div>} />
      </Route>
    </Routes>
  );
};

export default StudentHome;