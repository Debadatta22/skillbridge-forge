import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Award, Search, Download, Users, Clock, CheckCircle } from 'lucide-react';

interface StudentCertification {
  id: string;
  studentName: string;
  email: string;
  courseName: string;
  enrollmentDate: string;
  completionDate?: string;
  assessmentScore: number;
  status: 'enrolled' | 'completed' | 'certified' | 'failed';
  certificateId?: string;
}

const CertificationPanel: React.FC = () => {
  const [students, setStudents] = useState<StudentCertification[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<StudentCertification[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - TODO: Replace with API call
  const mockStudents: StudentCertification[] = [
    {
      id: '1',
      studentName: 'Rahul Sharma',
      email: 'rahul.sharma@email.com',
      courseName: 'Web Development Fundamentals',
      enrollmentDate: '2024-01-15',
      completionDate: '2024-02-20',
      assessmentScore: 87,
      status: 'completed'
    },
    {
      id: '2',
      studentName: 'Priya Patel',
      email: 'priya.patel@email.com',
      courseName: 'React Advanced Concepts',
      enrollmentDate: '2024-02-01',
      completionDate: '2024-03-10',
      assessmentScore: 92,
      status: 'certified',
      certificateId: 'CERT-2024-001'
    },
    {
      id: '3',
      studentName: 'Amit Kumar',
      email: 'amit.kumar@email.com',
      courseName: 'Data Science Basics',
      enrollmentDate: '2024-01-20',
      assessmentScore: 76,
      status: 'enrolled'
    },
    {
      id: '4',
      studentName: 'Sneha Reddy',
      email: 'sneha.reddy@email.com',
      courseName: 'Python Programming',
      enrollmentDate: '2024-02-15',
      completionDate: '2024-03-15',
      assessmentScore: 95,
      status: 'completed'
    }
  ];

  useEffect(() => {
    // TODO: Fetch students from backend
    // GET /api/certifier/students
    /* 
    const fetchStudents = async () => {
      try {
        const response = await fetch('/api/certifier/students', {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        }
      } catch (error) {
        console.error('Failed to fetch students:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudents();
    */
    
    // Mock API delay
    setTimeout(() => {
      setStudents(mockStudents);
      setFilteredStudents(mockStudents);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = students;
    
    if (searchTerm) {
      filtered = filtered.filter(student => 
        student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(student => student.status === statusFilter);
    }
    
    setFilteredStudents(filtered);
  }, [students, searchTerm, statusFilter]);

  const handleIssueCertificate = async (studentId: string) => {
    // TODO: Issue certificate via backend
    // PATCH /api/students/:id/certify
    /*
    try {
      const response = await fetch(`/api/students/${studentId}/certify`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          certifiedBy: certifierId,
          issuedDate: new Date().toISOString()
        })
      });
      
      if (response.ok) {
        const updatedStudent = await response.json();
        // Update local state
        setStudents(prev => prev.map(s => 
          s.id === studentId ? { ...s, status: 'certified', certificateId: updatedStudent.certificateId } : s
        ));
      }
    } catch (error) {
      console.error('Failed to issue certificate:', error);
    }
    */
    
    // Mock certificate issuance
    const certificateId = `CERT-2024-${Date.now()}`;
    setStudents(prev => prev.map(s => 
      s.id === studentId ? { ...s, status: 'certified', certificateId } : s
    ));
    
    toast({
      title: "Certificate Issued",
      description: `Certificate ${certificateId} has been issued successfully.`,
    });
  };

  const getStatusBadge = (status: string, score?: number) => {
    switch (status) {
      case 'enrolled':
        return <Badge variant="outline" className="text-blue-600 border-blue-200">Enrolled</Badge>;
      case 'completed':
        return <Badge variant="outline" className="text-green-600 border-green-200">Completed</Badge>;
      case 'certified':
        return <Badge className="bg-purple-100 text-purple-700 border-purple-200">Certified</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 font-semibold';
    if (score >= 80) return 'text-blue-600 font-semibold';
    if (score >= 70) return 'text-yellow-600 font-semibold';
    return 'text-red-600 font-semibold';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Certification Panel</h1>
          <p className="text-muted-foreground">Manage student certifications and issue certificates</p>
        </div>
        <div className="text-sm text-muted-foreground">
          Total Students: {students.length}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Enrolled</p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{students.filter(s => s.status === 'completed').length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Certified</p>
                <p className="text-2xl font-bold">{students.filter(s => s.status === 'certified').length}</p>
              </div>
              <Award className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{students.filter(s => s.status === 'enrolled').length}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students, courses, or emails..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="enrolled">Enrolled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="certified">Certified</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <div className="grid gap-4">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {student.studentName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{student.studentName}</h3>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Course</p>
                      <p className="font-medium">{student.courseName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Enrollment Date</p>
                      <p className="font-medium">{new Date(student.enrollmentDate).toLocaleDateString()}</p>
                    </div>
                    {student.completionDate && (
                      <div>
                        <p className="text-sm text-muted-foreground">Completion Date</p>
                        <p className="font-medium">{new Date(student.completionDate).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-3">
                  <div className="flex items-center gap-3">
                    {getStatusBadge(student.status)}
                    {student.certificateId && (
                      <Badge variant="outline" className="text-purple-600">
                        {student.certificateId}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Assessment Score</p>
                    <p className={`text-lg font-bold ${getScoreColor(student.assessmentScore)}`}>
                      {student.assessmentScore}%
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    {student.status === 'completed' && student.assessmentScore >= 70 && (
                      <Button
                        onClick={() => handleIssueCertificate(student.id)}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <Award className="w-4 h-4 mr-2" />
                        Issue Certificate
                      </Button>
                    )}
                    
                    {student.certificateId && (
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Award className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Students Found</h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'No students are currently enrolled in your courses.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CertificationPanel;