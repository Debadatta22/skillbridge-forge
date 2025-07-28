import React, { useState } from 'react';
import { BarChart3, Users, TrendingUp, Award, Download, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const StudentAnalytics: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // TODO: Connect to backend API
  // GET /api/analytics/students
  // GET /api/analytics/courses
  const mockData = {
    totalStudents: 1247,
    activeStudents: 892,
    completionRate: 73.2,
    averageScore: 84.5,
    monthlyGrowth: 12.5,
    courseData: [
      { course: 'Web Development', enrolled: 324, completed: 256, avgScore: 87.2 },
      { course: 'Data Science', enrolled: 298, completed: 201, avgScore: 82.1 },
      { course: 'Mobile Development', enrolled: 195, completed: 142, avgScore: 85.8 },
      { course: 'UI/UX Design', enrolled: 167, completed: 134, avgScore: 89.3 },
      { course: 'Digital Marketing', enrolled: 263, completed: 198, avgScore: 81.7 },
    ],
    performanceDistribution: [
      { range: '90-100%', count: 287, percentage: 31.2 },
      { range: '80-89%', count: 321, percentage: 34.9 },
      { range: '70-79%', count: 198, percentage: 21.5 },
      { range: '60-69%', count: 86, percentage: 9.3 },
      { range: 'Below 60%', count: 28, percentage: 3.1 },
    ]
  };

  const handleExportData = () => {
    // TODO: Connect to backend API
    // GET /api/analytics/export
    console.log('Exporting analytics data...');
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Student Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights into student performance and engagement</p>
        </div>
        <Button onClick={handleExportData} className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Data
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterCourse} onValueChange={setFilterCourse}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {mockData.courseData.map((course) => (
                  <SelectItem key={course.course} value={course.course.toLowerCase().replace(/\s+/g, '-')}>
                    {course.course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="dropped">Dropped Out</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold text-foreground">{mockData.totalStudents.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Students</p>
                <p className="text-2xl font-bold text-foreground">{mockData.activeStudents.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold text-foreground">{mockData.completionRate}%</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold text-foreground">{mockData.averageScore}%</p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Growth</p>
                <p className="text-2xl font-bold text-foreground">+{mockData.monthlyGrowth}%</p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Course Performance Overview</CardTitle>
          <CardDescription>Enrollment and completion statistics by course</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.courseData.map((course, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{course.course}</h3>
                  <span className="text-sm text-muted-foreground">Avg. Score: {course.avgScore}%</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Enrolled: {course.enrolled}</span>
                  <span>Completed: {course.completed}</span>
                  <span>Completion Rate: {((course.completed / course.enrolled) * 100).toFixed(1)}%</span>
                </div>
                <div className="mt-2 w-full bg-accent rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(course.completed / course.enrolled) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Distribution</CardTitle>
          <CardDescription>Score distribution across all students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.performanceDistribution.map((range, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-20 text-sm font-medium text-foreground">{range.range}</div>
                <div className="flex-1 bg-accent rounded-full h-6 relative">
                  <div
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium transition-all duration-300"
                    style={{ width: `${range.percentage}%` }}
                  >
                    {range.percentage > 10 && `${range.count} students`}
                  </div>
                </div>
                <div className="w-16 text-sm text-muted-foreground text-right">{range.percentage}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentAnalytics;