import React, { useState } from 'react';
import { Search, Filter, Download, User, Star, MapPin, Calendar, ExternalLink, Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const Applicants: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [experienceFilter, setExperienceFilter] = useState('all');

  // TODO: Connect to backend API
  // GET /api/students/eligible
  // GET /api/students?filter=skills&value=react
  const mockStudents = [
    {
      id: 1,
      name: 'Rahul Sharma',
      email: 'rahul.sharma@email.com',
      phone: '+91 98765 43210',
      location: 'Bangalore, Karnataka',
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
      experience: '2 years',
      education: 'B.Tech Computer Science',
      college: 'IIT Bangalore',
      rating: 4.8,
      projectsCompleted: 12,
      certificatesEarned: 8,
      resumeUrl: '/resumes/rahul-sharma.pdf',
      portfolioUrl: 'https://rahul-portfolio.com',
      profileImage: null,
      lastActive: '2 hours ago',
      coursesCompleted: ['Full Stack Development', 'React Advanced'],
    },
    {
      id: 2,
      name: 'Priya Patel',
      email: 'priya.patel@email.com',
      phone: '+91 87654 32109',
      location: 'Mumbai, Maharashtra',
      skills: ['Python', 'Data Science', 'Machine Learning', 'SQL'],
      experience: '1 year',
      education: 'M.Sc Data Science',
      college: 'University of Mumbai',
      rating: 4.6,
      projectsCompleted: 8,
      certificatesEarned: 6,
      resumeUrl: '/resumes/priya-patel.pdf',
      portfolioUrl: 'https://priya-ml-projects.com',
      profileImage: null,
      lastActive: '1 day ago',
      coursesCompleted: ['Data Science Fundamentals', 'ML with Python'],
    },
    {
      id: 3,
      name: 'Arjun Mehta',
      email: 'arjun.mehta@email.com',
      phone: '+91 76543 21098',
      location: 'Delhi, NCR',
      skills: ['Java', 'Spring Boot', 'Microservices', 'AWS'],
      experience: '3 years',
      education: 'B.Tech Software Engineering',
      college: 'Delhi Technological University',
      rating: 4.9,
      projectsCompleted: 15,
      certificatesEarned: 10,
      resumeUrl: '/resumes/arjun-mehta.pdf',
      portfolioUrl: 'https://arjun-backend-dev.com',
      profileImage: null,
      lastActive: '30 minutes ago',
      coursesCompleted: ['Backend Development', 'Cloud Architecture'],
    },
  ];

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSkill = skillFilter === 'all' || student.skills.some(skill => 
      skill.toLowerCase().includes(skillFilter.toLowerCase()));
    const matchesLocation = locationFilter === 'all' || 
                           student.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesExperience = experienceFilter === 'all' || 
                             student.experience.includes(experienceFilter);

    return matchesSearch && matchesSkill && matchesLocation && matchesExperience;
  });

  const handleDownloadResume = (resumeUrl: string, studentName: string) => {
    // TODO: Connect to backend API
    // GET /api/students/:id/resume
    console.log(`Downloading resume for ${studentName}: ${resumeUrl}`);
  };

  const handleContactStudent = (student: any) => {
    // TODO: Connect to backend API
    // POST /api/communications/send
    console.log(`Contacting student: ${student.name}`);
  };

  const handleViewProfile = (studentId: number) => {
    // TODO: Navigate to detailed student profile
    console.log(`Viewing profile for student ID: ${studentId}`);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Student Applicants</h1>
          <p className="text-muted-foreground">Review and connect with eligible students</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Advanced Filters
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export List
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by name or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={skillFilter} onValueChange={setSkillFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Skills</SelectItem>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="node">Node.js</SelectItem>
                <SelectItem value="data">Data Science</SelectItem>
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="delhi">Delhi</SelectItem>
                <SelectItem value="hyderabad">Hyderabad</SelectItem>
                <SelectItem value="pune">Pune</SelectItem>
              </SelectContent>
            </Select>
            <Select value={experienceFilter} onValueChange={setExperienceFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Experience</SelectItem>
                <SelectItem value="0">Fresher</SelectItem>
                <SelectItem value="1">1+ Years</SelectItem>
                <SelectItem value="2">2+ Years</SelectItem>
                <SelectItem value="3">3+ Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center">
                    {student.profileImage ? (
                      <img src={student.profileImage} alt={student.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">{student.education}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{student.rating}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{student.location}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{student.experience} experience • Last active {student.lastActive}</span>
              </div>

              <div>
                <p className="text-sm font-medium text-foreground mb-2">Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {student.skills.slice(0, 4).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {student.skills.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{student.skills.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 py-2 border-y border-border">
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">{student.projectsCompleted}</p>
                  <p className="text-xs text-muted-foreground">Projects</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">{student.certificatesEarned}</p>
                  <p className="text-xs text-muted-foreground">Certificates</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">{student.coursesCompleted.length}</p>
                  <p className="text-xs text-muted-foreground">Courses</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleViewProfile(student.id)}
                >
                  View Profile
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleDownloadResume(student.resumeUrl, student.name)}
                  className="flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  Resume
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 flex items-center gap-1"
                  onClick={() => handleContactStudent(student)}
                >
                  <Mail className="w-3 h-3" />
                  Contact
                </Button>
                {student.portfolioUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 flex items-center gap-1"
                    onClick={() => window.open(student.portfolioUrl, '_blank')}
                  >
                    <ExternalLink className="w-3 h-3" />
                    Portfolio
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <User className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No students found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
          </CardContent>
        </Card>
      )}

      {/* Summary */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Showing {filteredStudents.length} of {mockStudents.length} students</span>
            <span>Updated 5 minutes ago</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Applicants;