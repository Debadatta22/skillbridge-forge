import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const EventCalendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewType, setViewType] = useState<'month' | 'week' | 'list'>('month');
  const [filterType, setFilterType] = useState('all');

  // TODO: GET /api/expert/events
  const mockEvents = [
    {
      id: '1',
      title: 'React Workshop for Students',
      type: 'Workshop',
      date: '2024-01-15',
      time: '10:00 AM - 12:00 PM',
      location: 'Virtual',
      attendees: 25,
      maxAttendees: 30,
      description: 'Interactive workshop covering React fundamentals and best practices',
      status: 'Upcoming'
    },
    {
      id: '2',
      title: 'Career Guidance Webinar',
      type: 'Webinar',
      date: '2024-01-18',
      time: '2:00 PM - 3:30 PM',
      location: 'Virtual',
      attendees: 45,
      maxAttendees: 50,
      description: 'Tips and strategies for landing your first tech job',
      status: 'Upcoming'
    },
    {
      id: '3',
      title: 'Mock Interview Session',
      type: 'Interview',
      date: '2024-01-20',
      time: '11:00 AM - 12:00 PM',
      location: 'Conference Room A',
      attendees: 8,
      maxAttendees: 10,
      description: 'Practice interviews with feedback for job readiness',
      status: 'Upcoming'
    },
    {
      id: '4',
      title: 'Industry Trends Discussion',
      type: 'Discussion',
      date: '2024-01-12',
      time: '3:00 PM - 4:00 PM',
      location: 'Virtual',
      attendees: 20,
      maxAttendees: 25,
      description: 'Latest trends in software development and tech industry',
      status: 'Completed'
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'workshop': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'webinar': return 'bg-green-100 text-green-800 border-green-200';
      case 'interview': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'discussion': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'upcoming': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredEvents = mockEvents.filter(event => 
    filterType === 'all' || event.type.toLowerCase() === filterType
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Calendar className="h-6 w-6 text-blue-600" />
            Event Calendar
          </h1>
          <p className="text-muted-foreground">Manage your events, webinars, and mentoring sessions</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Event
        </Button>
      </div>

      {/* Filters and View Toggle */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter events" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="workshop">Workshops</SelectItem>
                <SelectItem value="webinar">Webinars</SelectItem>
                <SelectItem value="interview">Interviews</SelectItem>
                <SelectItem value="discussion">Discussions</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={viewType} onValueChange={(value) => setViewType(value as 'month' | 'week' | 'list')}>
          <TabsList>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Tabs value={viewType} className="space-y-6">
        {/* Month View */}
        <TabsContent value="month">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground border-b">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i - 6);
                  const hasEvent = filteredEvents.some(event => 
                    new Date(event.date).toDateString() === date.toDateString()
                  );
                  
                  return (
                    <div key={i} className="p-2 min-h-[60px] border rounded hover:bg-muted transition-colors">
                      <div className="text-sm">{date.getDate()}</div>
                      {hasEvent && (
                        <div className="mt-1 space-y-1">
                          <div className="w-full h-1 bg-blue-500 rounded"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Week View */}
        <TabsContent value="week">
          <Card>
            <CardHeader>
              <CardTitle>Week View</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-8 gap-2">
                <div className="p-2 font-medium text-muted-foreground">Time</div>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div key={day} className="p-2 text-center font-medium text-muted-foreground border-b">
                    {day}
                  </div>
                ))}
                
                {['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map((time) => (
                  <React.Fragment key={time}>
                    <div className="p-2 text-sm text-muted-foreground border-r">{time}</div>
                    {Array.from({ length: 7 }, (_, i) => (
                      <div key={i} className="p-2 min-h-[40px] border hover:bg-muted transition-colors">
                        {time === '10:00' && i === 0 && (
                          <div className="text-xs bg-blue-100 text-blue-800 p-1 rounded">React Workshop</div>
                        )}
                        {time === '14:00' && i === 3 && (
                          <div className="text-xs bg-green-100 text-green-800 p-1 rounded">Career Webinar</div>
                        )}
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* List View */}
        <TabsContent value="list">
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {event.title}
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                    </div>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{event.attendees}/{event.maxAttendees} attendees</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    {event.status === 'Upcoming' && (
                      <>
                        <Button size="sm">Join Event</Button>
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">Cancel</Button>
                      </>
                    )}
                    {event.status === 'Completed' && (
                      <Button size="sm" variant="outline">View Summary</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventCalendar;