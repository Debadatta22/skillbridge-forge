import React from 'react';
import { LogOut, BookOpen, Award, Users, TrendingUp, Star, Clock, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const StudentHome: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50/30 to-purple-50/30 dark:from-background dark:via-blue-900/10 dark:to-purple-900/10">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 gradient-student rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-foreground">SkillBridge Student Portal</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{user?.fullName}</p>
                <p className="text-xs text-muted-foreground">Student</p>
              </div>
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.fullName?.split(' ')[0]}! 👋
          </h2>
          <p className="text-muted-foreground">
            Ready to continue your learning journey? Here's what's waiting for you.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Courses Enrolled</p>
                <p className="text-2xl font-bold text-foreground">3</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Certificates Earned</p>
                <p className="text-2xl font-bold text-foreground">1</p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Study Streak</p>
                <p className="text-2xl font-bold text-foreground">7 days</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Skill Level</p>
                <p className="text-2xl font-bold text-foreground">Intermediate</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Continue Learning */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Continue Learning</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                  <div className="w-12 h-12 gradient-student rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">Web Development Fundamentals</h4>
                    <p className="text-sm text-muted-foreground">Progress: 65% complete</p>
                    <div className="w-full bg-muted rounded-full h-2 mt-2">
                      <div className="gradient-student h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">2h left</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                  <div className="w-12 h-12 gradient-student rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">Digital Marketing Basics</h4>
                    <p className="text-sm text-muted-foreground">Progress: 30% complete</p>
                    <div className="w-full bg-muted rounded-full h-2 mt-2">
                      <div className="gradient-student h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">5h left</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Courses */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Recommended for You</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">React Development</h4>
                      <p className="text-sm text-muted-foreground">4.8 ⭐ • 120 students</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Build modern web applications with React and advanced JavaScript concepts.
                  </p>
                  <button className="w-full gradient-student text-white py-2 rounded-lg text-sm font-medium hover-glow transition-all duration-300">
                    Enroll Now
                  </button>
                </div>

                <div className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Data Analytics</h4>
                      <p className="text-sm text-muted-foreground">4.6 ⭐ • 89 students</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Learn to analyze data and create insights using modern tools and techniques.
                  </p>
                  <button className="w-full gradient-student text-white py-2 rounded-lg text-sm font-medium hover-glow transition-all duration-300">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Upcoming Events</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Web Dev Workshop</p>
                    <p className="text-xs text-muted-foreground">Tomorrow, 3:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Users className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Career Guidance</p>
                    <p className="text-xs text-muted-foreground">Friday, 11:00 AM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Recent Achievements</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                    <Award className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">HTML/CSS Certificate</p>
                    <p className="text-xs text-muted-foreground">Earned 2 days ago</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <Star className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">7-Day Study Streak</p>
                    <p className="text-xs text-muted-foreground">Keep it up!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors">
                  <span className="text-sm font-medium text-foreground">Browse Courses</span>
                </button>
                <button className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors">
                  <span className="text-sm font-medium text-foreground">Find Mentors</span>
                </button>
                <button className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors">
                  <span className="text-sm font-medium text-foreground">View Certificates</span>
                </button>
                <button className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors">
                  <span className="text-sm font-medium text-foreground">Job Opportunities</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentHome;