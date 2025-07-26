import React from 'react';
import { LogOut, Briefcase, Users, TrendingUp, Calendar, MapPin, DollarSign, Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const JobProviderHome: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-orange-50/30 to-red-50/30 dark:from-background dark:via-orange-900/10 dark:to-red-900/10">
      <header className="bg-background/80 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 gradient-jobprovider rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-foreground">SkillBridge Employer Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{user?.fullName}</p>
                <p className="text-xs text-muted-foreground">Job Provider</p>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome, {user?.fullName?.split(' ')[0]}! 💼
          </h2>
          <p className="text-muted-foreground">
            Post opportunities, find skilled candidates, and build talented teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Job Posts</p>
                <p className="text-2xl font-bold text-foreground">8</p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Briefcase className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Applications</p>
                <p className="text-2xl font-bold text-foreground">156</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Hired Candidates</p>
                <p className="text-2xl font-bold text-foreground">23</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <Star className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-foreground">87%</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-foreground">Active Job Postings</h3>
                <button className="gradient-jobprovider text-white px-4 py-2 rounded-lg text-sm font-medium hover-glow transition-all duration-300">
                  Post New Job
                </button>
              </div>
              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-foreground">Senior React Developer</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          Remote
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          ₹8-12 LPA
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Posted 2 days ago
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded-full">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Applications: </span>
                      <span className="font-medium text-foreground">34</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-accent text-foreground rounded text-sm">View Applications</button>
                      <button className="px-3 py-1 gradient-jobprovider text-white rounded text-sm">Edit Job</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors">
                  <span className="text-sm font-medium text-foreground">Post New Job</span>
                </button>
                <button className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors">
                  <span className="text-sm font-medium text-foreground">Browse Candidates</span>
                </button>
                <button className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors">
                  <span className="text-sm font-medium text-foreground">View Analytics</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobProviderHome;