import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LogOut, User, Menu, X, Home, BookOpen, Calendar, BarChart3, 
  Microscope, Smartphone, Trophy, Users, Briefcase, Globe, FileText,
  ChevronDown, Edit3, Upload, ClipboardList
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from '../ui/use-toast';

const StudentLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || '',
    age: '',
    dateOfBirth: '',
    place: '',
    state: '',
    education: '',
    skills: '',
    interests: '',
    resume: null as File | null
  });
  const [showProfileOverview, setShowProfileOverview] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/student' },
    { id: 'courses', label: 'My Courses', icon: BookOpen, path: '/student/courses' },
    { id: 'study-planner', label: 'Study Planner', icon: Calendar, path: '/student/study-planner' },
    { id: 'progress', label: 'Progress & Analytics', icon: BarChart3, path: '/student/progress' },
    { id: 'skill-lab', label: 'Skill Lab', icon: Microscope, path: '/student/skill-lab' },
    { id: 'ar-vr-labs', label: 'AR/VR Labs', icon: Smartphone, path: '/student/ar-vr-labs' },
    { id: 'assessments', label: 'Assessments', icon: ClipboardList, path: '/student/assessments' },
    { id: 'achievements', label: 'Achievements', icon: Trophy, path: '/student/achievements' },
    { id: 'leaderboard', label: 'Leaderboard', icon: Users, path: '/student/leaderboard' },
    { id: 'mentors', label: 'Connect with Mentors', icon: Users, path: '/student/mentors' },
    { id: 'jobs', label: 'Job Opportunities', icon: Briefcase, path: '/student/jobs' },
    { id: 'explore', label: 'Explore', icon: Globe, path: '/student/explore' },
    { id: 'resume', label: 'Resume Builder & ATS', icon: FileText, path: '/student/resume' },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, DOC, or DOCX file",
          variant: "destructive",
        });
        return;
      }
      
      setProfileData(prev => ({ ...prev, resume: file }));
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded successfully`,
      });
    }
  };

  const handleSaveProfile = () => {
    // Save profile data to localStorage or backend
    localStorage.setItem('student_profile', JSON.stringify(profileData));
    toast({
      title: "Profile saved",
      description: "Your profile has been updated successfully",
    });
    setShowProfileEdit(false);
    setShowProfileOverview(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

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
                    value={profileData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Age</label>
                  <input
                    type="number"
                    value={profileData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    placeholder="Enter your age"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Place</label>
                  <input
                    type="text"
                    value={profileData.place}
                    onChange={(e) => handleInputChange('place', e.target.value)}
                    placeholder="Enter your city"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">State</label>
                  <input
                    type="text"
                    value={profileData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="Enter your state"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Education</label>
                  <input
                    type="text"
                    value={profileData.education}
                    onChange={(e) => handleInputChange('education', e.target.value)}
                    placeholder="Current education/degree"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Skills</label>
                  <textarea
                    value={profileData.skills}
                    onChange={(e) => handleInputChange('skills', e.target.value)}
                    placeholder="List your skills (comma-separated)"
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Interests</label>
                  <textarea
                    value={profileData.interests}
                    onChange={(e) => handleInputChange('interests', e.target.value)}
                    placeholder="Describe your interests and career goals"
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Upload Resume</label>
                  <div 
                    className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer"
                    onClick={() => document.getElementById('resume-upload')?.click()}
                  >
                    {profileData.resume ? (
                      <div className="flex items-center justify-center gap-2">
                        <FileText className="w-6 h-6 text-green-600" />
                        <span className="text-sm text-foreground">{profileData.resume.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground">PDF, DOC, DOCX up to 5MB</p>
                      </>
                    )}
                    <input 
                      id="resume-upload"
                      type="file" 
                      className="hidden" 
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button 
                  onClick={handleSaveProfile}
                  className="flex-1 gradient-student text-white py-3 rounded-lg font-medium hover-glow transition-all duration-300"
                >
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

      {/* Profile Overview Modal */}
      {showProfileOverview && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Profile Overview</h2>
                <button
                  onClick={() => setShowProfileOverview(false)}
                  className="p-2 hover:bg-accent rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-accent/20 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-1">Full Name</h3>
                    <p className="text-muted-foreground">{profileData.fullName || 'Not provided'}</p>
                  </div>
                  <div className="p-4 bg-accent/20 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-1">Age</h3>
                    <p className="text-muted-foreground">{profileData.age || 'Not provided'}</p>
                  </div>
                  <div className="p-4 bg-accent/20 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-1">Date of Birth</h3>
                    <p className="text-muted-foreground">{profileData.dateOfBirth || 'Not provided'}</p>
                  </div>
                  <div className="p-4 bg-accent/20 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-1">Location</h3>
                    <p className="text-muted-foreground">{`${profileData.place}, ${profileData.state}`.replace(', ', ' ') || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="p-4 bg-accent/20 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-1">Education</h3>
                  <p className="text-muted-foreground">{profileData.education || 'Not provided'}</p>
                </div>
                
                <div className="p-4 bg-accent/20 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-1">Skills</h3>
                  <p className="text-muted-foreground">{profileData.skills || 'Not provided'}</p>
                </div>
                
                <div className="p-4 bg-accent/20 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-1">Interests</h3>
                  <p className="text-muted-foreground">{profileData.interests || 'Not provided'}</p>
                </div>
                
                {profileData.resume && (
                  <div className="p-4 bg-accent/20 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-1">Resume</h3>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-green-600" />
                      <span className="text-muted-foreground">{profileData.resume.name}</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => {
                    setShowProfileOverview(false);
                    setShowProfileEdit(true);
                  }}
                  className="flex-1 gradient-student text-white py-3 rounded-lg font-medium hover-glow transition-all duration-300"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => setShowProfileOverview(false)}
                  className="px-6 py-3 border border-border rounded-lg text-foreground hover:bg-accent transition-colors"
                >
                  Close
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