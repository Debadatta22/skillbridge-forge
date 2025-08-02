import React, { useState, useEffect } from 'react';
import { LogOut, Award, CheckCircle, Clock, TrendingUp, FileCheck, Users, Shield, Bell, Mail, X } from 'lucide-react';
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
const CertifierHome: React.FC = () => {
  const {
    user,
    logout
  } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  useEffect(() => {
    // Load notifications for this certifier
    const allNotifications = JSON.parse(localStorage.getItem('mentor_notifications') || '[]');
    const certifierNotifications = allNotifications.filter((notif: Notification) => notif.toRole === 'certifier' && notif.toName === user?.fullName);
    setNotifications(certifierNotifications);
    setUnreadCount(certifierNotifications.length);
  }, [user]);
  const markAsRead = () => {
    setUnreadCount(0);
  };
  return <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-violet-50/30 dark:from-background dark:via-purple-900/10 dark:to-violet-900/10">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome , Certifier !
          </h2>
          <p className="text-muted-foreground">
            Verify achievements, issue digital certificates, and maintain industry standards.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Certificates Issued</p>
                <p className="text-2xl font-bold text-foreground">234</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Reviews</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Verified Profiles</p>
                <p className="text-2xl font-bold text-foreground">89</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Quality Score</p>
                <p className="text-2xl font-bold text-foreground">98%</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pending Verifications */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-foreground">Pending Verifications</h3>
                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 text-sm rounded-full">
                  12 pending
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-accent transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    RK
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">Rajesh Kumar</h4>
                    <p className="text-sm text-muted-foreground">Web Development Fundamentals</p>
                    <p className="text-xs text-muted-foreground">Submitted: 2 hours ago • Score: 92%</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg text-sm font-medium hover:bg-green-200 dark:hover:bg-green-800 transition-colors">
                      Approve
                    </button>
                    <button className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-800 transition-colors">
                      Review
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-accent transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    SP
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">Sneha Patel</h4>
                    <p className="text-sm text-muted-foreground">Digital Marketing Certification</p>
                    <p className="text-xs text-muted-foreground">Submitted: 5 hours ago • Score: 87%</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg text-sm font-medium hover:bg-green-200 dark:hover:bg-green-800 transition-colors">
                      Approve
                    </button>
                    <button className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-800 transition-colors">
                      Review
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-accent transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    AM
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">Arjun Mehta</h4>
                    <p className="text-sm text-muted-foreground">Data Analytics Fundamentals</p>
                    <p className="text-xs text-muted-foreground">Submitted: 1 day ago • Score: 94%</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg text-sm font-medium hover:bg-green-200 dark:hover:bg-green-800 transition-colors">
                      Approve
                    </button>
                    <button className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-800 transition-colors">
                      Review
                    </button>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 gradient-certifier text-white py-3 rounded-lg font-medium hover-glow transition-all duration-300">
                View All Pending Verifications
              </button>
            </div>

            {/* Recent Certificates */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Recently Issued Certificates</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">JavaScript Mastery Certificate</h4>
                    <p className="text-sm text-muted-foreground">Issued to: Maria Garcia • Certificate ID: JS-2024-001</p>
                    <p className="text-xs text-muted-foreground">Issued: 1 hour ago</p>
                  </div>
                  <button className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg text-sm font-medium">
                    View Certificate
                  </button>
                </div>

                <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">React Development Certificate</h4>
                    <p className="text-sm text-muted-foreground">Issued to: Ahmed Ali • Certificate ID: RC-2024-087</p>
                    <p className="text-xs text-muted-foreground">Issued: 3 hours ago</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium">
                    View Certificate
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Certification Standards */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Certification Standards</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Minimum Score: 80%</p>
                    <p className="text-xs text-muted-foreground">Industry standard threshold</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <FileCheck className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Project Submission</p>
                    <p className="text-xs text-muted-foreground">Practical assessment required</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Verification Process</p>
                    <p className="text-xs text-muted-foreground">Manual review for quality</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Statistics */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">This Month</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Certificates Issued</span>
                  <span className="font-semibold text-foreground">47</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Average Processing Time</span>
                  <span className="font-semibold text-foreground">2.3 hrs</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Approval Rate</span>
                  <span className="font-semibold text-foreground">94%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Quality Score</span>
                  <span className="font-semibold text-foreground">98%</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors">
                  <span className="text-sm font-medium text-foreground">Bulk Certificate Issue</span>
                </button>
                <button className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors">
                  <span className="text-sm font-medium text-foreground">View Standards Guide</span>
                </button>
                <button className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors">
                  <span className="text-sm font-medium text-foreground">Generate Reports</span>
                </button>
                <button className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors">
                  <span className="text-sm font-medium text-foreground">Manage Templates</span>
                </button>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">System Health</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-foreground">Verification System: Online</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-foreground">Certificate Issuing: Operational</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-foreground">Backup System: Syncing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>;
};
export default CertifierHome;