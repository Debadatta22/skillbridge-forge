import React from 'react';
import { BarChart, TrendingUp, Users, Star, Award, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

const Analytics: React.FC = () => {
  // TODO: GET /api/expert/analytics
  const mockAnalytics = {
    overview: {
      totalMentored: 45,
      averageRating: 4.8,
      interviewSuccessRate: 78,
      totalHours: 324,
      monthlyGrowth: 12
    },
    monthlyData: [
      { month: 'Jan', mentored: 8, rating: 4.7, interviews: 5 },
      { month: 'Feb', mentored: 12, rating: 4.8, interviews: 8 },
      { month: 'Mar', mentored: 15, rating: 4.9, interviews: 12 },
      { month: 'Apr', mentored: 10, rating: 4.6, interviews: 7 }
    ],
    topPerformingStudents: [
      { name: 'Sarah Johnson', progress: 95, achievement: 'Landed at Google' },
      { name: 'Alex Chen', progress: 88, achievement: 'Promoted to Senior Dev' },
      { name: 'Maria Rodriguez', progress: 82, achievement: 'Started own startup' },
      { name: 'David Kim', progress: 79, achievement: 'Joined Microsoft' }
    ],
    skillsImpact: [
      { skill: 'React Development', students: 18, avgImprovement: 85 },
      { skill: 'Career Guidance', students: 25, avgImprovement: 92 },
      { skill: 'Interview Prep', students: 15, avgImprovement: 78 },
      { skill: 'Algorithm Training', students: 12, avgImprovement: 88 }
    ]
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <BarChart className="h-6 w-6 text-blue-600" />
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground">Track your mentoring impact and performance metrics</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students Mentored</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.overview.totalMentored}</div>
            <p className="text-xs text-muted-foreground">+{mockAnalytics.overview.monthlyGrowth}% this month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.overview.averageRating}</div>
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(mockAnalytics.overview.averageRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interview Success</CardTitle>
            <Award className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.overview.interviewSuccessRate}%</div>
            <p className="text-xs text-muted-foreground">Success rate</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.overview.totalHours}</div>
            <p className="text-xs text-muted-foreground">Mentoring time</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{mockAnalytics.overview.monthlyGrowth}%</div>
            <p className="text-xs text-muted-foreground">vs last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Monthly Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg flex items-center justify-center border border-blue-200 dark:border-blue-800">
              <div className="text-center">
                <BarChart className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Performance chart will be rendered here</p>
                <p className="text-xs text-muted-foreground">Students mentored, ratings, and interview success</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Students */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Top Performing Students
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockAnalytics.topPerformingStudents.map((student, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    index === 0 ? 'bg-yellow-500' : 
                    index === 1 ? 'bg-gray-400' : 
                    index === 2 ? 'bg-amber-600' : 'bg-blue-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.achievement}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{student.progress}%</div>
                  <div className="w-16 mt-1">
                    <Progress value={student.progress} className="h-1" />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Skills Impact Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            Skills Impact Analysis
          </CardTitle>
          <p className="text-sm text-muted-foreground">Your mentoring effectiveness across different skill areas</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockAnalytics.skillsImpact.map((skill, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">{skill.skill}</h3>
                  <Badge variant="secondary">{skill.students} students</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Average Improvement</span>
                    <span className="font-medium">{skill.avgImprovement}%</span>
                  </div>
                  <Progress value={skill.avgImprovement} className="h-2" />
                </div>

                <div className="mt-3 text-xs text-muted-foreground">
                  Based on student feedback and assessment scores
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Award className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium">Top Mentor Badge</p>
                <p className="text-sm text-muted-foreground">Achieved 4.8+ average rating with 40+ students</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium">Student Success Champion</p>
                <p className="text-sm text-muted-foreground">10 students landed jobs at top tech companies</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <Clock className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium">Dedication Award</p>
                <p className="text-sm text-muted-foreground">300+ hours of mentoring completed</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;