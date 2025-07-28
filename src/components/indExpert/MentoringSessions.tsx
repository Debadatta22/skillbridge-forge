import React, { useState } from 'react';
import { MessageSquare, Clock, Star, Calendar, Plus, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';

const MentoringSessions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // TODO: GET /api/expert/mentoring
  const mockSessions = [
    {
      id: '1',
      studentName: 'Sarah Johnson',
      topic: 'React Component Architecture',
      date: '2024-01-10',
      duration: '60 minutes',
      status: 'Completed',
      rating: 5,
      feedback: 'Excellent session! Sarah showed great understanding of React patterns.',
      nextSession: '2024-01-17',
      progress: 'Advanced to state management concepts'
    },
    {
      id: '2',
      studentName: 'Alex Chen',
      topic: 'Career Transition Strategy',
      date: '2024-01-12',
      duration: '45 minutes',
      status: 'Completed',
      rating: 4,
      feedback: 'Good discussion about career paths. Alex needs more confidence building.',
      nextSession: '2024-01-19',
      progress: 'Working on interview preparation'
    },
    {
      id: '3',
      studentName: 'Maria Rodriguez',
      topic: 'Portfolio Review & Enhancement',
      date: '2024-01-15',
      duration: '30 minutes',
      status: 'Scheduled',
      rating: null,
      feedback: null,
      nextSession: null,
      progress: 'First session - portfolio assessment'
    },
    {
      id: '4',
      studentName: 'David Kim',
      topic: 'Algorithm Problem Solving',
      date: '2024-01-08',
      duration: '90 minutes',
      status: 'Completed',
      rating: 5,
      feedback: 'David made significant progress in problem-solving approach.',
      nextSession: '2024-01-22',
      progress: 'Moved to advanced data structures'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'rescheduled': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredSessions = mockSessions.filter(session => {
    const matchesSearch = session.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || session.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const renderStars = (rating: number | null) => {
    if (!rating) return <span className="text-sm text-muted-foreground">Not rated</span>;
    
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm ml-1">({rating}/5)</span>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-purple-600" />
            Mentoring Sessions
          </h1>
          <p className="text-muted-foreground">Track past sessions and schedule new mentoring</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Schedule New Session
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule New Mentoring Session</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="student">Student Name</Label>
                <Input id="student" placeholder="Enter student name" />
              </div>
              
              <div>
                <Label htmlFor="topic">Session Topic</Label>
                <Input id="topic" placeholder="What will you discuss?" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="notes">Session Notes</Label>
                <Textarea id="notes" placeholder="Any preparation notes..." rows={3} />
              </div>
              
              <Button className="w-full">Schedule Session</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by student name or topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sessions</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {filteredSessions.map((session) => (
          <Card key={session.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {session.studentName}
                    <Badge className={getStatusColor(session.status)}>
                      {session.status}
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{session.topic}</p>
                </div>
                {session.rating && renderStars(session.rating)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Session Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{session.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{session.duration}</span>
                </div>
                {session.nextSession && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Next: {session.nextSession}</span>
                  </div>
                )}
              </div>

              {/* Progress */}
              {session.progress && (
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">Progress Update:</p>
                  <p className="text-sm text-blue-800 dark:text-blue-200">{session.progress}</p>
                </div>
              )}

              {/* Feedback */}
              {session.feedback && (
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-1">Session Feedback:</p>
                  <p className="text-sm text-green-800 dark:text-green-200">{session.feedback}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                {session.status === 'Scheduled' && (
                  <>
                    <Button size="sm">Join Session</Button>
                    <Button size="sm" variant="outline">Reschedule</Button>
                    <Button size="sm" variant="outline">Cancel</Button>
                  </>
                )}
                {session.status === 'Completed' && (
                  <>
                    <Button size="sm" variant="outline">View Details</Button>
                    <Button size="sm" variant="outline">Schedule Follow-up</Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{mockSessions.length}</div>
            <p className="text-sm text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">4.7</div>
            <div className="flex items-center gap-1 mt-1">
              {renderStars(5)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">8</div>
            <p className="text-sm text-muted-foreground">Sessions completed</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MentoringSessions;