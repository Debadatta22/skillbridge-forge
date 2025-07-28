import React, { useState } from 'react';
import { Calendar, Clock, Video, User, Plus, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

const ScheduleInterviews: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedCandidate, setSelectedCandidate] = useState<string>('');

  // TODO: POST /api/interviews/schedule
  const mockInterviews = [
    {
      id: '1',
      candidateName: 'Sarah Johnson',
      position: 'Frontend Developer',
      date: '2024-01-15',
      time: '10:00 AM',
      duration: '60 minutes',
      type: 'Video Call',
      status: 'Scheduled',
      meetingLink: 'https://meet.google.com/abc-defg-hij'
    },
    {
      id: '2',
      candidateName: 'Alex Chen',
      position: 'Full Stack Developer',
      date: '2024-01-16',
      time: '2:30 PM',
      duration: '45 minutes',
      type: 'Video Call',
      status: 'Confirmed',
      meetingLink: 'https://zoom.us/j/123456789'
    },
    {
      id: '3',
      candidateName: 'Maria Rodriguez',
      position: 'UI/UX Designer',
      date: '2024-01-17',
      time: '11:00 AM',
      duration: '30 minutes',
      type: 'Phone Call',
      status: 'Pending',
      meetingLink: null
    }
  ];

  const mockCandidates = [
    { id: '1', name: 'Sarah Johnson', position: 'Frontend Developer' },
    { id: '2', name: 'Alex Chen', position: 'Full Stack Developer' },
    { id: '3', name: 'Maria Rodriguez', position: 'UI/UX Designer' },
    { id: '4', name: 'David Kim', position: 'Backend Developer' }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleScheduleInterview = () => {
    // TODO: POST /api/interviews/schedule
    console.log('Scheduling interview:', {
      candidate: selectedCandidate,
      date: selectedDate,
      time: selectedTime
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Calendar className="h-6 w-6 text-blue-600" />
            Schedule Interviews
          </h1>
          <p className="text-muted-foreground">Manage and schedule candidate interviews</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Schedule New Interview
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule New Interview</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="candidate">Select Candidate</Label>
                <Select value={selectedCandidate} onValueChange={setSelectedCandidate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a candidate" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCandidates.map((candidate) => (
                      <SelectItem key={candidate.id} value={candidate.id}>
                        {candidate.name} - {candidate.position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Interview Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Interview Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  />
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
                <Label htmlFor="type">Interview Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video Call</SelectItem>
                    <SelectItem value="phone">Phone Call</SelectItem>
                    <SelectItem value="inperson">In Person</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any specific topics or requirements..."
                  rows={3}
                />
              </div>

              <Button onClick={handleScheduleInterview} className="w-full">
                Schedule Interview
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Upcoming Interviews */}
      <div className="grid gap-6">
        {mockInterviews.map((interview) => (
          <Card key={interview.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-3">
                    <User className="h-5 w-5 text-blue-600" />
                    {interview.candidateName}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{interview.position}</p>
                </div>
                <Badge className={getStatusColor(interview.status)}>
                  {interview.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{interview.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{interview.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{interview.type}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Duration: {interview.duration}
                </div>
              </div>

              {interview.meetingLink && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">Meeting Link:</p>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded border flex-1">
                      {interview.meetingLink}
                    </code>
                    <Button size="sm" variant="outline">Copy</Button>
                  </div>
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" className="flex items-center gap-2">
                  <Edit className="h-3 w-3" />
                  Reschedule
                </Button>
                <Button size="sm" variant="outline">
                  Send Reminder
                </Button>
                {interview.meetingLink && (
                  <Button size="sm">Join Meeting</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Calendar View */}
      <Card>
        <CardHeader>
          <CardTitle>This Week's Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 text-center">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="p-2 text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
            {Array.from({ length: 7 }, (_, i) => (
              <div key={i} className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <div className="text-sm font-medium">{10 + i}</div>
                {i === 5 && <div className="mt-1 w-2 h-2 bg-blue-500 rounded-full mx-auto"></div>}
                {i === 6 && <div className="mt-1 w-2 h-2 bg-green-500 rounded-full mx-auto"></div>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleInterviews;