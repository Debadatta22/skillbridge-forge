import React, { useState, useEffect } from 'react';
import { LogOut, Users, BookOpen, Award, TrendingUp, Calendar, MessageSquare, Star, Bell, Mail, Clock, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Notification {
  to: string;
  toName: string;
  toRole: string;
  subject: string;
  message: string;
  method: string;
  timestamp: string;
  from: string;
  fromName: string;
}

const EducatorHome: React.FC = () => {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Load notifications for this educator
    const allNotifications = JSON.parse(localStorage.getItem('mentor_notifications') || '[]');
    const educatorNotifications = allNotifications.filter((notif: Notification) => 
      notif.toRole === 'educator' && notif.toName === user?.fullName
    );
    setNotifications(educatorNotifications);
    setUnreadCount(educatorNotifications.length);
  }, [user]);

  const markAsRead = () => {
    setUnreadCount(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-green-50/30 to-emerald-50/30 dark:from-background dark:via-green-900/10 dark:to-emerald-900/10">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 gradient-educator rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-foreground">SkillBridge Educator Hub</h1>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    if (!showNotifications) markAsRead();
                  }}
                  className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-background border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                    <div className="p-4 border-b border-border">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">Notifications</h3>
                        <button
                          onClick={() => setShowNotifications(false)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                          <div key={index} className="p-4 border-b border-border hover:bg-accent transition-colors">
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                <Mail className="w-4 h-4 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-medium text-foreground text-sm">{notification.fromName}</p>
                                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded-full">
                                    Student
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-1">{notification.subject}</p>
                                <p className="text-xs text-muted-foreground line-clamp-2">{notification.message}</p>
                                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                  <Clock className="w-3 h-3" />
                                  <span>{new Date(notification.timestamp).toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-muted-foreground">
                          <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>No new notifications</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{user?.fullName}</p>
                <p className="text-xs text-muted-foreground">Educator</p>
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
            Welcome, Educator {user?.fullName?.split(' ')[0]}! 🎓
          </h2>
          <p className="text-muted-foreground">
            Manage your courses, mentor students, and shape the future of digital education.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Students</p>
                <p className="text-2xl font-bold text-foreground">147</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Courses Created</p>
                <p className="text-2xl font-bold text-foreground">8</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Rating</p>
                <p className="text-2xl font-bold text-foreground">4.8</p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Certificates Issued</p>
                <p className="text-2xl font-bold text-foreground">89</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">New student enrolled in "Web Development"</p>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
                  <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Received 5-star review from Sarah M.</p>
                    <p className="text-sm text-muted-foreground">1 day ago</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">12 students completed "JavaScript Basics"</p>
                    <p className="text-sm text-muted-foreground">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Management */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-foreground">Your Courses</h3>
                <button className="gradient-educator text-white px-4 py-2 rounded-lg text-sm font-medium hover-glow transition-all duration-300">
                  Create New Course
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-foreground">Web Development Fundamentals</h4>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded-full">
                      Active
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">👥 45 students enrolled</p>
                    <p className="text-muted-foreground">⭐ 4.9 rating (23 reviews)</p>
                    <p className="text-muted-foreground">📅 Last updated: 2 days ago</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 bg-accent text-foreground py-2 rounded-lg text-sm font-medium hover:bg-accent/80 transition-colors">
                      Manage
                    </button>
                    <button className="flex-1 gradient-educator text-white py-2 rounded-lg text-sm font-medium hover-glow transition-all duration-300">
                      View Analytics
                    </button>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-foreground">React for Beginners</h4>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                      Draft
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">📝 60% complete</p>
                    <p className="text-muted-foreground">📚 8 lessons planned</p>
                    <p className="text-muted-foreground">🎯 Expected launch: Next week</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 bg-accent text-foreground py-2 rounded-lg text-sm font-medium hover:bg-accent/80 transition-colors">
                      Continue Editing
                    </button>
                    <button className="flex-1 gradient-educator text-white py-2 rounded-lg text-sm font-medium hover-glow transition-all duration-300">
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pending Tasks */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Pending Tasks</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Review assignment submissions</p>
                    <p className="text-xs text-muted-foreground">15 pending submissions</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Update course materials</p>
                    <p className="text-xs text-muted-foreground">React course needs updates</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Schedule mentor sessions</p>
                    <p className="text-xs text-muted-foreground">5 students requesting guidance</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Upcoming Events</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Live Q&A Session</p>
                    <p className="text-xs text-muted-foreground">Today, 4:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Users className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Educator Meetup</p>
                    <p className="text-xs text-muted-foreground">Friday, 7:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Student Messages */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Recent Messages</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    A
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">Alex Kumar</p>
                    <p className="text-xs text-muted-foreground">Need help with React components...</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    S
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">Sarah Johnson</p>
                    <p className="text-xs text-muted-foreground">Thank you for the great course!</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 gradient-educator text-white py-2 rounded-lg text-sm font-medium hover-glow transition-all duration-300">
                View All Messages
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors">
                  <span className="text-sm font-medium text-foreground">Create New Course</span>
                </button>
                <button className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors">
                  <span className="text-sm font-medium text-foreground">Schedule Live Session</span>
                </button>
                <button className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors">
                  <span className="text-sm font-medium text-foreground">View Analytics</span>
                </button>
                <button className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors">
                  <span className="text-sm font-medium text-foreground">Manage Students</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EducatorHome;