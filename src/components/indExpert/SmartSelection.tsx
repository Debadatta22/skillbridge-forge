import React, { useState } from 'react';
import { Brain, Filter, Star, Clock, MapPin, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const SmartSelection: React.FC = () => {
  const [skillFilter, setSkillFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  // TODO: POST /api/expert/smart-selection
  const mockCandidates = [
    {
      id: '1',
      name: 'Sarah Johnson',
      skills: ['React', 'TypeScript', 'Node.js'],
      experience: '2 years',
      location: 'San Francisco, CA',
      matchPercentage: 95,
      lastActive: '2 hours ago',
      projects: 8,
      rating: 4.8,
      availability: 'Immediate'
    },
    {
      id: '2',
      name: 'Alex Chen',
      skills: ['Python', 'Django', 'PostgreSQL'],
      experience: '3 years',
      location: 'Seattle, WA',
      matchPercentage: 87,
      lastActive: '1 day ago',
      projects: 12,
      rating: 4.6,
      availability: '2 weeks'
    },
    {
      id: '3',
      name: 'Maria Rodriguez',
      skills: ['UI/UX', 'Figma', 'Adobe Creative'],
      experience: '4 years',
      location: 'Austin, TX',
      matchPercentage: 82,
      lastActive: '3 hours ago',
      projects: 15,
      rating: 4.9,
      availability: 'Immediate'
    },
    {
      id: '4',
      name: 'David Kim',
      skills: ['Java', 'Spring Boot', 'AWS'],
      experience: '5 years',
      location: 'New York, NY',
      matchPercentage: 78,
      lastActive: '5 hours ago',
      projects: 20,
      rating: 4.7,
      availability: '1 month'
    }
  ];

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (percentage >= 80) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-gray-600 bg-gray-50 border-gray-200';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            Smart Selection
          </h1>
          <p className="text-muted-foreground">AI-powered candidate matching and filtering</p>
        </div>
      </div>

      <Tabs defaultValue="ai-matching" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ai-matching">AI-Assisted Matching</TabsTrigger>
          <TabsTrigger value="advanced-filter">Advanced Filters</TabsTrigger>
        </TabsList>

        <TabsContent value="ai-matching" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Quick Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Select value={skillFilter} onValueChange={setSkillFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skills</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="design">UI/UX Design</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                </SelectContent>
              </Select>

              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Availability</SelectItem>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="2weeks">Within 2 weeks</SelectItem>
                  <SelectItem value="1month">Within 1 month</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">Reset Filters</Button>
            </CardContent>
          </Card>

          {/* Candidate Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockCandidates.map((candidate) => (
              <Card key={candidate.id} className="hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{candidate.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{candidate.location}</span>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getMatchColor(candidate.matchPercentage)}`}>
                      {candidate.matchPercentage}% Match
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Skills */}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Experience</p>
                      <p className="font-medium">{candidate.experience}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Projects</p>
                      <p className="font-medium">{candidate.projects}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Rating</p>
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{candidate.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Available: {candidate.availability}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Active {candidate.lastActive}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      <Award className="h-4 w-4 mr-2" />
                      Shortlist
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="advanced-filter">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Filtering Options</CardTitle>
              <p className="text-sm text-muted-foreground">Use detailed criteria to find the perfect candidates</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium">Years of Experience</label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="exp1" className="rounded" />
                      <label htmlFor="exp1" className="text-sm">0-1 years</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="exp2" className="rounded" />
                      <label htmlFor="exp2" className="text-sm">2-3 years</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="exp3" className="rounded" />
                      <label htmlFor="exp3" className="text-sm">4-5 years</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="exp4" className="rounded" />
                      <label htmlFor="exp4" className="text-sm">5+ years</label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Performance Score</label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="score1" className="rounded" />
                      <label htmlFor="score1" className="text-sm">4.5+ Rating</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="score2" className="rounded" />
                      <label htmlFor="score2" className="text-sm">4.0+ Rating</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="score3" className="rounded" />
                      <label htmlFor="score3" className="text-sm">3.5+ Rating</label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Past Mentoring</label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="mentor1" className="rounded" />
                      <label htmlFor="mentor1" className="text-sm">Highly Responsive</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="mentor2" className="rounded" />
                      <label htmlFor="mentor2" className="text-sm">Quick Learner</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="mentor3" className="rounded" />
                      <label htmlFor="mentor3" className="text-sm">Previous Mentee</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <Button>Apply Filters</Button>
                <Button variant="outline">Reset All</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SmartSelection;