import React, { useState } from 'react';
import { Save, Plus, Minus, MapPin, DollarSign, Calendar, Users, Briefcase } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';

interface JobData {
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  skillsRequired: string[];
  experience: string;
  education: string;
  location: string;
  workType: string;
  jobType: string;
  salaryMin: string;
  salaryMax: string;
  currency: string;
  openings: string;
  deadline: string;
  benefits: string[];
  companyOverview: string;
  applicationInstructions: string;
  urgentHiring: boolean;
  remoteAllowed: boolean;
}

const PostJob: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [jobData, setJobData] = useState<JobData>({
    title: '',
    description: '',
    requirements: [''],
    responsibilities: [''],
    skillsRequired: [],
    experience: '',
    education: '',
    location: '',
    workType: '',
    jobType: '',
    salaryMin: '',
    salaryMax: '',
    currency: 'INR',
    openings: '',
    deadline: '',
    benefits: [],
    companyOverview: '',
    applicationInstructions: '',
    urgentHiring: false,
    remoteAllowed: false,
  });

  const jobTypes = [
    'Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'
  ];

  const workTypes = [
    'On-site', 'Remote', 'Hybrid'
  ];

  const experienceLevels = [
    'Entry Level (0-1 years)',
    'Associate (1-3 years)', 
    'Mid Level (3-5 years)',
    'Senior Level (5-8 years)',
    'Executive (8+ years)'
  ];

  const educationLevels = [
    'High School', 'Diploma', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD', 'Any'
  ];

  const commonSkills = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'SQL', 'MongoDB',
    'TypeScript', 'AWS', 'Docker', 'Git', 'API Development', 'HTML/CSS',
    'Data Analysis', 'Machine Learning', 'Project Management', 'Agile'
  ];

  const commonBenefits = [
    'Health Insurance', 'Dental Insurance', 'Life Insurance', 'Retirement Plan',
    'Paid Time Off', 'Flexible Working Hours', 'Work from Home', 'Professional Development',
    'Gym Membership', 'Meal Allowance', 'Transportation', 'Stock Options',
    'Performance Bonus', 'Learning Budget', 'Maternity/Paternity Leave'
  ];

  const handleInputChange = (field: keyof JobData, value: string | boolean | string[]) => {
    setJobData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayInputChange = (field: 'requirements' | 'responsibilities', index: number, value: string) => {
    const newArray = [...jobData[field]];
    newArray[index] = value;
    setJobData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: 'requirements' | 'responsibilities') => {
    setJobData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'requirements' | 'responsibilities', index: number) => {
    if (jobData[field].length > 1) {
      const newArray = jobData[field].filter((_, i) => i !== index);
      setJobData(prev => ({ ...prev, [field]: newArray }));
    }
  };

  const handleSkillToggle = (skill: string) => {
    const currentSkills = jobData.skillsRequired;
    if (currentSkills.includes(skill)) {
      setJobData(prev => ({
        ...prev,
        skillsRequired: currentSkills.filter(s => s !== skill)
      }));
    } else {
      setJobData(prev => ({
        ...prev,
        skillsRequired: [...currentSkills, skill]
      }));
    }
  };

  const handleBenefitToggle = (benefit: string) => {
    const currentBenefits = jobData.benefits;
    if (currentBenefits.includes(benefit)) {
      setJobData(prev => ({
        ...prev,
        benefits: currentBenefits.filter(b => b !== benefit)
      }));
    } else {
      setJobData(prev => ({
        ...prev,
        benefits: [...currentBenefits, benefit]
      }));
    }
  };

  const validateForm = () => {
    const required = ['title', 'description', 'location', 'jobType', 'workType', 'experience', 'openings'];
    const missing = required.filter(field => !jobData[field as keyof JobData]);
    
    if (missing.length > 0) {
      toast({
        title: "Validation Error",
        description: `Please fill in the following required fields: ${missing.join(', ')}`,
        variant: "destructive",
      });
      return false;
    }

    if (jobData.skillsRequired.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select at least one required skill.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (isDraft: boolean = false) => {
    if (!isDraft && !validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // TODO: Connect to backend API
      // POST /api/jobs
      /*
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          ...jobData,
          status: isDraft ? 'draft' : 'active',
          postedBy: user.id,
          postedAt: new Date().toISOString()
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to post job');
      }
      
      const newJob = await response.json();
      */
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: isDraft ? "Job Saved as Draft" : "Job Posted Successfully",
        description: isDraft 
          ? `"${jobData.title}" has been saved to your drafts.`
          : `"${jobData.title}" is now live and accepting applications.`,
      });
      
      if (!isDraft) {
        // Reset form after successful posting
        setJobData({
          title: '',
          description: '',
          requirements: [''],
          responsibilities: [''],
          skillsRequired: [],
          experience: '',
          education: '',
          location: '',
          workType: '',
          jobType: '',
          salaryMin: '',
          salaryMax: '',
          currency: 'INR',
          openings: '',
          deadline: '',
          benefits: [],
          companyOverview: '',
          applicationInstructions: '',
          urgentHiring: false,
          remoteAllowed: false,
        });
      }
      
    } catch (error) {
      toast({
        title: "Posting Failed",
        description: "Failed to post job. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Post New Job</h1>
        <p className="text-muted-foreground">Create a job posting to attract talented candidates</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Job Details
              </CardTitle>
              <CardDescription>Basic information about the position</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  value={jobData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Senior React Developer"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  value={jobData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Provide a detailed description of the role..."
                  rows={6}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="jobType">Job Type *</Label>
                  <Select value={jobData.jobType} onValueChange={(value) => handleInputChange('jobType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="workType">Work Type *</Label>
                  <Select value={jobData.workType} onValueChange={(value) => handleInputChange('workType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select work type" />
                    </SelectTrigger>
                    <SelectContent>
                      {workTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="experience">Experience Level *</Label>
                  <Select value={jobData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="education">Education</Label>
                  <Select value={jobData.education} onValueChange={(value) => handleInputChange('education', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      {educationLevels.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Requirements and Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle>Requirements & Responsibilities</CardTitle>
              <CardDescription>Define what you're looking for and what the role involves</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Job Requirements</Label>
                {jobData.requirements.map((req, index) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <Input
                      value={req}
                      onChange={(e) => handleArrayInputChange('requirements', index, e.target.value)}
                      placeholder={`Requirement ${index + 1}`}
                    />
                    {jobData.requirements.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('requirements', index)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addArrayItem('requirements')}
                  className="mt-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Requirement
                </Button>
              </div>

              <div>
                <Label>Key Responsibilities</Label>
                {jobData.responsibilities.map((resp, index) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <Input
                      value={resp}
                      onChange={(e) => handleArrayInputChange('responsibilities', index, e.target.value)}
                      placeholder={`Responsibility ${index + 1}`}
                    />
                    {jobData.responsibilities.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('responsibilities', index)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addArrayItem('responsibilities')}
                  className="mt-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Responsibility
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Skills Required */}
          <Card>
            <CardHeader>
              <CardTitle>Required Skills</CardTitle>
              <CardDescription>Select the skills candidates should have</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {commonSkills.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={jobData.skillsRequired.includes(skill)}
                      onCheckedChange={() => handleSkillToggle(skill)}
                    />
                    <Label htmlFor={skill} className="text-sm">{skill}</Label>
                  </div>
                ))}
              </div>
              {jobData.skillsRequired.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Selected Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {jobData.skillsRequired.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-primary/10 text-primary rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Location and Compensation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Location & Salary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={jobData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g., Bangalore, Remote"
                  required
                />
              </div>

              <div>
                <Label>Salary Range</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    value={jobData.salaryMin}
                    onChange={(e) => handleInputChange('salaryMin', e.target.value)}
                    placeholder="Min salary"
                    type="number"
                  />
                  <Input
                    value={jobData.salaryMax}
                    onChange={(e) => handleInputChange('salaryMax', e.target.value)}
                    placeholder="Max salary"
                    type="number"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="openings">Number of Openings *</Label>
                <Input
                  id="openings"
                  type="number"
                  value={jobData.openings}
                  onChange={(e) => handleInputChange('openings', e.target.value)}
                  placeholder="e.g., 5"
                  required
                />
              </div>

              <div>
                <Label htmlFor="deadline">Application Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={jobData.deadline}
                  onChange={(e) => handleInputChange('deadline', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="urgentHiring"
                    checked={jobData.urgentHiring}
                    onCheckedChange={(checked) => handleInputChange('urgentHiring', checked as boolean)}
                  />
                  <Label htmlFor="urgentHiring">Urgent Hiring</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remoteAllowed"
                    checked={jobData.remoteAllowed}
                    onCheckedChange={(checked) => handleInputChange('remoteAllowed', checked as boolean)}
                  />
                  <Label htmlFor="remoteAllowed">Remote Work Allowed</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Benefits & Perks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                {commonBenefits.map((benefit) => (
                  <div key={benefit} className="flex items-center space-x-2">
                    <Checkbox
                      id={benefit}
                      checked={jobData.benefits.includes(benefit)}
                      onCheckedChange={() => handleBenefitToggle(benefit)}
                    />
                    <Label htmlFor={benefit} className="text-sm">{benefit}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="space-y-2">
            <Button
              onClick={() => handleSubmit(false)}
              disabled={isLoading}
              className="w-full"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Posting...' : 'Post Job'}
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSubmit(true)}
              disabled={isLoading}
              className="w-full"
            >
              Save as Draft
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;