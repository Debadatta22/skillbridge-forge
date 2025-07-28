import React from 'react';
import { Users, Calendar, MessageSquare, TrendingUp, Clock, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

const Dashboard: React.FC = () => {
  // TODO: GET /api/expert/summary
  const mockData = {
    studentsAwaiting: 12,
    interviewsScheduled: 5,
    mentoringSessions: 8,
    totalMentored: 45,
    averageRating: 4.8,
    thisMonth: {
      interviews: 15,
      mentoring: 22
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
        <h1 className="text-2xl font-bold text-foreground mb-2">Welcome back, Expert!</h1>
        <p className="text-muted-foreground">Ready to guide the next generation of professionals?</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students Awaiting</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.studentsAwaiting}</div>
            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.interviewsScheduled}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mentoring Sessions</CardTitle>
            <MessageSquare className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.mentoringSessions}</div>
            <p className="text-xs text-muted-foreground">Upcoming this month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.averageRating}</div>
            <p className="text-xs text-muted-foreground">From {mockData.totalMentored} students</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Interview with Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">Frontend Developer position</p>
              </div>
              <Badge variant="outline">Completed</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Mentoring session scheduled</p>
                <p className="text-sm text-muted-foreground">With Alex Chen - React Development</p>
              </div>
              <Badge variant="secondary">Upcoming</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Application reviewed</p>
                <p className="text-sm text-muted-foreground">Maria Rodriguez - UI/UX Designer</p>
              </div>
              <Badge variant="outline">Today</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Mentoring Impact Graph Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Mentoring Impact
            </CardTitle>
            <CardDescription>Your influence on student growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg flex items-center justify-center border border-green-200 dark:border-green-800">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Chart will be rendered here</p>
                <p className="text-xs text-muted-foreground">Students mentored over time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;