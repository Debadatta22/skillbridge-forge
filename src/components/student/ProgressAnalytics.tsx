import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, Award, Clock, Target, BookOpen, Star } from 'lucide-react';

const ProgressAnalytics: React.FC = () => {
  const weeklyProgress = [
    { day: 'Mon', hours: 2.5, completed: 3 },
    { day: 'Tue', hours: 3.2, completed: 4 },
    { day: 'Wed', hours: 1.8, completed: 2 },
    { day: 'Thu', hours: 4.1, completed: 5 },
    { day: 'Fri', hours: 2.9, completed: 3 },
    { day: 'Sat', hours: 5.2, completed: 6 },
    { day: 'Sun', hours: 3.5, completed: 4 }
  ];

  const skillDistribution = [
    { name: 'Web Development', value: 35, color: '#3b82f6' },
    { name: 'Data Science', value: 25, color: '#10b981' },
    { name: 'Design', value: 20, color: '#8b5cf6' },
    { name: 'Marketing', value: 15, color: '#f59e0b' },
    { name: 'Other', value: 5, color: '#ef4444' }
  ];

  const monthlyGrowth = [
    { month: 'Jan', skills: 5, courses: 2, certificates: 0 },
    { month: 'Feb', skills: 8, courses: 3, certificates: 1 },
    { month: 'Mar', skills: 12, courses: 5, certificates: 2 },
    { month: 'Apr', skills: 15, courses: 7, certificates: 3 },
    { month: 'May', skills: 18, courses: 9, certificates: 4 },
    { month: 'Jun', skills: 22, courses: 12, certificates: 5 }
  ];

  const skillRadarData = [
    { subject: 'Programming', A: 85, fullMark: 100 },
    { subject: 'Design', A: 70, fullMark: 100 },
    { subject: 'Communication', A: 90, fullMark: 100 },
    { subject: 'Problem Solving', A: 80, fullMark: 100 },
    { subject: 'Leadership', A: 65, fullMark: 100 },
    { subject: 'Analytics', A: 75, fullMark: 100 }
  ];

  const stats = [
    {
      title: 'Total Study Time',
      value: '142.5 hrs',
      change: '+12%',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900'
    },
    {
      title: 'Courses Completed',
      value: '12',
      change: '+3',
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900'
    },
    {
      title: 'Skills Acquired',
      value: '22',
      change: '+4',
      icon: Star,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900'
    },
    {
      title: 'Achievements',
      value: '8',
      change: '+2',
      icon: Award,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Progress & Analytics</h1>
        <p className="text-muted-foreground">Track your learning journey and visualize your growth</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  {stat.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Weekly Study Hours */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-xl font-semibold text-foreground mb-6">Weekly Study Hours</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Skill Distribution */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-xl font-semibold text-foreground mb-6">Skill Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={skillDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {skillDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Growth Over Time */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-xl font-semibold text-foreground mb-6">Growth Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Line type="monotone" dataKey="skills" stroke="#3b82f6" strokeWidth={3} />
              <Line type="monotone" dataKey="courses" stroke="#10b981" strokeWidth={3} />
              <Line type="monotone" dataKey="certificates" stroke="#8b5cf6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">Skills</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">Courses</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">Certificates</span>
            </div>
          </div>
        </div>

        {/* Skill Radar Chart */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-xl font-semibold text-foreground mb-6">Skill Assessment</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={skillRadarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={0} domain={[0, 100]} />
              <Radar
                name="Skill Level"
                dataKey="A"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Learning Goals */}
      <div className="mt-8 bg-card border border-border rounded-xl p-6">
        <h3 className="text-xl font-semibold text-foreground mb-6">Learning Goals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Complete React Course</h4>
            <div className="w-full bg-muted rounded-full h-3">
              <div className="gradient-student h-3 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">75%</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Master Data Visualization</h4>
            <div className="w-full bg-muted rounded-full h-3">
              <div className="gradient-student h-3 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">45%</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Build Portfolio Website</h4>
            <div className="w-full bg-muted rounded-full h-3">
              <div className="gradient-student h-3 rounded-full" style={{ width: '90%' }}></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">90%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressAnalytics;