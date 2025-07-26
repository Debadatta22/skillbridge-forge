import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LogOut, User, Menu, X, Home, BookOpen, Calendar, BarChart3, 
  Microscope, Smartphone, Trophy, Users, Briefcase, Globe, FileText,
  ChevronDown, Edit3
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const StudentLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/student' },
    { id: 'courses', label: 'My Courses', icon: BookOpen, path: '/student/courses' },
    { id: 'study-planner', label: 'Study Planner', icon: Calendar, path: '/student/study-planner' },
    { id: 'progress', label: 'Progress & Analytics', icon: BarChart3, path: '/student/progress' },
    { id: 'skill-lab', label: 'Skill Lab', icon: Microscope, path: '/student/skill-lab' },
    { id: 'ar-vr-labs', label: 'AR/VR Labs', icon: Smartphone, path: '/student/ar-vr-labs' },
    { id: 'achievements', label: 'Achievements', icon: Trophy, path: '/student/achievements' },
    { id: 'leaderboard', label: 'Leaderboard', icon: Users, path: '/student/leaderboard' },
    { id: 'mentors', label: 'Connect with Mentors', icon: Users, path: '/student/mentors' },
    { id: 'jobs', label: 'Job Opportunities', icon: Briefcase, path: '/student/jobs' },
    { id: 'explore', label: 'Explore', icon: Globe, path: '/student/explore' },
    { id: 'resume', label: 'Resume Builder & ATS', icon: FileText, path: '/student/resume' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50/30 to-purple-50/30 dark:from-background dark:via-blue-900/10 dark:to-purple-900/10">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b border-border shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md hover:bg-accent transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 gradient-student rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-foreground">SkillBridge Student Portal</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowProfileEdit(true)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{user?.fullName}</span>
                <Edit3 className="w-3 h-3" />
              </button>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-72 bg-background/95 backdrop-blur-sm border-r border-border transition-transform duration-300 ease-in-out`}>
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 lg:hidden">
              <span className="font-semibold text-foreground">Menu</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-md hover:bg-accent transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <Outlet />
        </main>
      </div>

      {/* Profile Edit Modal */}
      {showProfileEdit && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Edit Profile</h2>
                <button
                  onClick={() => setShowProfileEdit(false)}
                  className="p-2 hover:bg-accent rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user?.fullName}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Age</label>
                  <input
                    type="number"
                    placeholder="Enter your age"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Date of Birth</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Place</label>
                  <input
                    type="text"
                    placeholder="Enter your city"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">State</label>
                  <input
                    type="text"
                    placeholder="Enter your state"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Education</label>
                  <input
                    type="text"
                    placeholder="Current education/degree"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Skills</label>
                  <textarea
                    placeholder="List your skills (comma-separated)"
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Interests</label>
                  <textarea
                    placeholder="Describe your interests and career goals"
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Upload Resume</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                    <FileText className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PDF, DOC, DOCX up to 5MB</p>
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button className="flex-1 gradient-student text-white py-3 rounded-lg font-medium hover-glow transition-all duration-300">
                  Save Changes
                </button>
                <button
                  onClick={() => setShowProfileEdit(false)}
                  className="px-6 py-3 border border-border rounded-lg text-foreground hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentLayout;