import React, { useState } from 'react';
import { BookOpen, Users, Star, Clock, Eye, Edit, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const MyCourses: React.FC = () => {
  // TODO: GET /api/expert/courses
  const mockCourses = [
    {
      id: '1',
      title: 'React Fundamentals for Beginners',
      description: 'Complete guide to React basics including components, props, and state management',
      enrolledStudents: 45,
      completionRate: 78,
      averageRating: 4.8,
      totalRatings: 32,
      lastUpdated: '2024-01-10',
      status: 'Active',
      duration: '8 weeks',
      difficulty: 'Beginner',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: '2',
      title: 'Advanced JavaScript Patterns',
      description: 'Deep dive into advanced JavaScript concepts and design patterns',
      enrolledStudents: 28,
      completionRate: 65,
      averageRating: 4.6,
      totalRatings: 18,
      lastUpdated: '2024-01-05',
      status: 'Active',
      duration: '6 weeks',
      difficulty: 'Advanced',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: '3',
      title: 'Career Development in Tech',
      description: 'Comprehensive guide to building a successful tech career',
      enrolledStudents: 62,
      completionRate: 92,
      averageRating: 4.9,
      totalRatings: 57,
      lastUpdated: '2024-01-08',
      status: 'Active',
      duration: '4 weeks',
      difficulty: 'Intermediate',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: '4',
      title: 'Full Stack Development Basics',
      description: 'Introduction to both frontend and backend development',
      enrolledStudents: 0,
      completionRate: 0,
      averageRating: 0,
      totalRatings: 0,
      lastUpdated: '2024-01-12',
      status: 'Draft',
      duration: '12 weeks',
      difficulty: 'Intermediate',
      thumbnail: '/api/placeholder/300/200'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'archived': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm ml-1">({rating.toFixed(1)})</span>
      </div>
    );
  };

  const activeCourses = mockCourses.filter(course => course.status === 'Active');
  const draftCourses = mockCourses.filter(course => course.status === 'Draft');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            My Courses
          </h1>
          <p className="text-muted-foreground">Manage your courses and track student progress</p>
        </div>
        <Button className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          Create New Course
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCourses.length}</div>
            <p className="text-xs text-muted-foreground">3 active, 1 draft</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeCourses.reduce((sum, course) => sum + course.enrolledStudents, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(activeCourses.reduce((sum, course) => sum + course.completionRate, 0) / activeCourses.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Course completion rate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(activeCourses.reduce((sum, course) => sum + course.averageRating, 0) / activeCourses.length).toFixed(1)}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-muted-foreground">Overall rating</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active Courses ({activeCourses.length})</TabsTrigger>
          <TabsTrigger value="drafts">Drafts ({draftCourses.length})</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{course.description}</p>
                      <div className="flex gap-2 mt-3">
                        <Badge className={getStatusColor(course.status)}>
                          {course.status}
                        </Badge>
                        <Badge className={getDifficultyColor(course.difficulty)}>
                          {course.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Course Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{course.enrolledStudents} students</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{course.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Completion Rate */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Completion Rate</span>
                      <span>{course.completionRate}%</span>
                    </div>
                    <Progress value={course.completionRate} className="h-2" />
                  </div>

                  {/* Rating */}
                  {course.averageRating > 0 && (
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Student Rating</span>
                        {renderStars(course.averageRating)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Based on {course.totalRatings} reviews
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                      <Eye className="h-3 w-3" />
                      Preview
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                      <Edit className="h-3 w-3" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                      <BarChart className="h-3 w-3" />
                      Analytics
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Last updated: {course.lastUpdated}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drafts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {draftCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow border-dashed">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{course.description}</p>
                      <div className="flex gap-2 mt-3">
                        <Badge className={getStatusColor(course.status)}>
                          {course.status}
                        </Badge>
                        <Badge className={getDifficultyColor(course.difficulty)}>
                          {course.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Duration: {course.duration}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex items-center gap-2">
                      <Edit className="h-3 w-3" />
                      Continue Editing
                    </Button>
                    <Button size="sm" variant="outline">
                      Publish Course
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Created: {course.lastUpdated}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg flex items-center justify-center border border-blue-200 dark:border-blue-800">
                  <div className="text-center">
                    <BarChart className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Performance charts will be rendered here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg flex items-center justify-center border border-green-200 dark:border-green-800">
                  <div className="text-center">
                    <Users className="h-12 w-12 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Engagement metrics will be rendered here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyCourses;