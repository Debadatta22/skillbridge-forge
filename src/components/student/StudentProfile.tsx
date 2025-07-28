import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/components/ui/use-toast';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  BookOpen, 
  Award, 
  Upload, 
  Github, 
  Linkedin, 
  Globe, 
  Edit,
  Save,
  Camera
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface StudentProfileData {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  
  // Academic Information
  collegeName: string;
  course: string;
  graduationYear: string;
  currentSemester: string;
  gpa: string;
  
  // Professional Information
  bio: string;
  skills: string[];
  languages: string[];
  interests: string[];
  
  // Social Links
  linkedinUrl: string;
  githubUrl: string;
  portfolioUrl: string;
  
  // Profile Image
  profileImage: string;
}

const StudentProfile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock initial data - will be replaced with backend integration
  const [profileData, setProfileData] = useState<StudentProfileData>({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    collegeName: (user?.profileData as any)?.collegeName || '',
    course: (user?.profileData as any)?.course || '',
    graduationYear: '',
    currentSemester: '',
    gpa: '',
    bio: '',
    skills: [],
    languages: [],
    interests: [],
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    profileImage: ''
  });

  // Skills and languages options
  const skillOptions = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'HTML/CSS', 'SQL', 'Git',
    'MongoDB', 'Express.js', 'Data Analysis', 'Machine Learning', 'UI/UX Design',
    'Project Management', 'Communication', 'Leadership', 'Problem Solving'
  ];

  const languageOptions = [
    'English', 'Hindi', 'Telugu', 'Tamil', 'Marathi', 'Bengali', 'Gujarati', 
    'Kannada', 'Malayalam', 'Punjabi', 'Urdu', 'French', 'Spanish', 'German'
  ];

  const interestOptions = [
    'Web Development', 'Mobile Development', 'Data Science', 'Artificial Intelligence',
    'Cybersecurity', 'Cloud Computing', 'DevOps', 'Blockchain', 'Game Development',
    'Digital Marketing', 'Content Creation', 'Photography', 'Music', 'Sports'
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real application, this would upload to a server
      // For now, we'll create a local URL for preview
      const imageUrl = URL.createObjectURL(file);
      setProfileData(prev => ({ ...prev, profileImage: imageUrl }));
      
      // TODO: Backend Integration - Upload image to server
      /* 
      Backend API Call Example:
      const formData = new FormData();
      formData.append('profileImage', file);
      
      try {
        const response = await fetch('/api/users/upload-profile-image', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
          body: formData
        });
        
        if (response.ok) {
          const { imageUrl } = await response.json();
          setProfileData(prev => ({ ...prev, profileImage: imageUrl }));
        }
      } catch (error) {
        console.error('Image upload failed:', error);
      }
      */
      
      toast({
        title: "Profile Image Updated",
        description: "Your profile image has been updated successfully.",
      });
    }
  };

  const handleSkillToggle = (skill: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleLanguageToggle = (language: string) => {
    setProfileData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // TODO: Backend Integration - Save profile data
      /* 
      Backend API Call Example:
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(profileData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      
      const updatedProfile = await response.json();
      */
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Student Profile</h1>
          <p className="text-muted-foreground">Manage your personal and academic information</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="relative mx-auto mb-4">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={profileData.profileImage} alt={profileData.fullName} />
                  <AvatarFallback className="text-2xl">
                    {profileData.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <CardTitle className="text-xl">{profileData.fullName}</CardTitle>
              <CardDescription>{profileData.course} at {profileData.collegeName}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                {profileData.email}
              </div>
              {profileData.phone && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  {profileData.phone}
                </div>
              )}
              {(profileData.city || profileData.state) && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {[profileData.city, profileData.state].filter(Boolean).join(', ')}
                </div>
              )}
              
              {/* Social Links */}
              <div className="flex gap-2 pt-4">
                {profileData.linkedinUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={profileData.linkedinUrl} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                {profileData.githubUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={profileData.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                {profileData.portfolioUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={profileData.portfolioUrl} target="_blank" rel="noopener noreferrer">
                      <Globe className="w-4 h-4" />
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    disabled // Email should not be editable
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) => setProfileData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={profileData.address}
                  onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                  disabled={!isEditing}
                  placeholder="Street address, apartment, house number"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={profileData.city}
                    onChange={(e) => setProfileData(prev => ({ ...prev, city: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={profileData.state}
                    onChange={(e) => setProfileData(prev => ({ ...prev, state: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="pincode">PIN Code</Label>
                  <Input
                    id="pincode"
                    value={profileData.pincode}
                    onChange={(e) => setProfileData(prev => ({ ...prev, pincode: e.target.value }))}
                    disabled={!isEditing}
                    placeholder="123456"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Academic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="collegeName">College/Institution</Label>
                  <Input
                    id="collegeName"
                    value={profileData.collegeName}
                    onChange={(e) => setProfileData(prev => ({ ...prev, collegeName: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="course">Course/Program</Label>
                  <Input
                    id="course"
                    value={profileData.course}
                    onChange={(e) => setProfileData(prev => ({ ...prev, course: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="graduationYear">Graduation Year</Label>
                  <Select
                    value={profileData.graduationYear}
                    onValueChange={(value) => setProfileData(prev => ({ ...prev, graduationYear: value }))}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => 2024 + i).map(year => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="currentSemester">Current Semester</Label>
                  <Select
                    value={profileData.currentSemester}
                    onValueChange={(value) => setProfileData(prev => ({ ...prev, currentSemester: value }))}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 8 }, (_, i) => i + 1).map(sem => (
                        <SelectItem key={sem} value={sem.toString()}>Semester {sem}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="gpa">Current GPA/CGPA</Label>
                <Input
                  id="gpa"
                  value={profileData.gpa}
                  onChange={(e) => setProfileData(prev => ({ ...prev, gpa: e.target.value }))}
                  disabled={!isEditing}
                  placeholder="8.5"
                />
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Professional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  disabled={!isEditing}
                  placeholder="Tell us about yourself, your goals, and aspirations..."
                  rows={4}
                />
              </div>

              {/* Skills */}
              <div>
                <Label>Skills</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skillOptions.map(skill => (
                    <Badge
                      key={skill}
                      variant={profileData.skills.includes(skill) ? "default" : "outline"}
                      className={`cursor-pointer transition-colors ${
                        isEditing ? 'hover:bg-primary hover:text-primary-foreground' : ''
                      }`}
                      onClick={isEditing ? () => handleSkillToggle(skill) : undefined}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <Label>Languages</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {languageOptions.map(language => (
                    <Badge
                      key={language}
                      variant={profileData.languages.includes(language) ? "default" : "outline"}
                      className={`cursor-pointer transition-colors ${
                        isEditing ? 'hover:bg-primary hover:text-primary-foreground' : ''
                      }`}
                      onClick={isEditing ? () => handleLanguageToggle(language) : undefined}
                    >
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <Label>Interests</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {interestOptions.map(interest => (
                    <Badge
                      key={interest}
                      variant={profileData.interests.includes(interest) ? "default" : "outline"}
                      className={`cursor-pointer transition-colors ${
                        isEditing ? 'hover:bg-primary hover:text-primary-foreground' : ''
                      }`}
                      onClick={isEditing ? () => handleInterestToggle(interest) : undefined}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
                  <Input
                    id="linkedinUrl"
                    value={profileData.linkedinUrl}
                    onChange={(e) => setProfileData(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                    disabled={!isEditing}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div>
                  <Label htmlFor="githubUrl">GitHub Profile</Label>
                  <Input
                    id="githubUrl"
                    value={profileData.githubUrl}
                    onChange={(e) => setProfileData(prev => ({ ...prev, githubUrl: e.target.value }))}
                    disabled={!isEditing}
                    placeholder="https://github.com/username"
                  />
                </div>
                <div>
                  <Label htmlFor="portfolioUrl">Portfolio Website</Label>
                  <Input
                    id="portfolioUrl"
                    value={profileData.portfolioUrl}
                    onChange={(e) => setProfileData(prev => ({ ...prev, portfolioUrl: e.target.value }))}
                    disabled={!isEditing}
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;