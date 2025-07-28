import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Upload, FileText, Video, Link, Save, Plus } from 'lucide-react';

interface CourseData {
  title: string;
  description: string;
  category: string;
  duration: string;
  difficulty: string;
  videoUrl: string;
  pdfFile: File | null;
  quizUrl: string;
  learningObjectives: string[];
  prerequisites: string;
  price: string;
}

const UploadCourse: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [courseData, setCourseData] = useState<CourseData>({
    title: '',
    description: '',
    category: '',
    duration: '',
    difficulty: '',
    videoUrl: '',
    pdfFile: null,
    quizUrl: '',
    learningObjectives: [''],
    prerequisites: '',
    price: ''
  });

  const categories = [
    'Web Development',
    'Data Science',
    'Mobile Development',
    'Artificial Intelligence',
    'Cybersecurity',
    'Cloud Computing',
    'DevOps',
    'UI/UX Design',
    'Digital Marketing',
    'Project Management'
  ];

  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  const handleInputChange = (field: keyof CourseData, value: string) => {
    setCourseData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (file: File | null) => {
    setCourseData(prev => ({ ...prev, pdfFile: file }));
  };

  const handleObjectiveChange = (index: number, value: string) => {
    const newObjectives = [...courseData.learningObjectives];
    newObjectives[index] = value;
    setCourseData(prev => ({ ...prev, learningObjectives: newObjectives }));
  };

  const addObjective = () => {
    setCourseData(prev => ({
      ...prev,
      learningObjectives: [...prev.learningObjectives, '']
    }));
  };

  const removeObjective = (index: number) => {
    if (courseData.learningObjectives.length > 1) {
      const newObjectives = courseData.learningObjectives.filter((_, i) => i !== index);
      setCourseData(prev => ({ ...prev, learningObjectives: newObjectives }));
    }
  };

  const validateForm = () => {
    const required = ['title', 'description', 'category', 'duration', 'difficulty'];
    const missing = required.filter(field => !courseData[field as keyof CourseData]);
    
    if (missing.length > 0) {
      toast({
        title: "Validation Error",
        description: `Please fill in the following required fields: ${missing.join(', ')}`,
        variant: "destructive",
      });
      return false;
    }
    
    if (courseData.learningObjectives.some(obj => !obj.trim())) {
      toast({
        title: "Validation Error",
        description: "Please fill in all learning objectives or remove empty ones.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // TODO: Upload course to backend
      // POST /api/courses
      /*
      const formData = new FormData();
      formData.append('title', courseData.title);
      formData.append('description', courseData.description);
      formData.append('category', courseData.category);
      formData.append('duration', courseData.duration);
      formData.append('difficulty', courseData.difficulty);
      formData.append('videoUrl', courseData.videoUrl);
      formData.append('quizUrl', courseData.quizUrl);
      formData.append('learningObjectives', JSON.stringify(courseData.learningObjectives));
      formData.append('prerequisites', courseData.prerequisites);
      formData.append('price', courseData.price);
      
      if (courseData.pdfFile) {
        formData.append('courseMaterial', courseData.pdfFile);
      }
      
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload course');
      }
      
      const newCourse = await response.json();
      */
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Course Uploaded Successfully",
        description: `"${courseData.title}" has been added to your course catalog.`,
      });
      
      // Reset form
      setCourseData({
        title: '',
        description: '',
        category: '',
        duration: '',
        difficulty: '',
        videoUrl: '',
        pdfFile: null,
        quizUrl: '',
        learningObjectives: [''],
        prerequisites: '',
        price: ''
      });
      
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload course. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Upload Course</h1>
        <p className="text-muted-foreground">Create and publish a new course for students</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Enter the fundamental details of your course</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Course Title *</Label>
                <Input
                  id="title"
                  value={courseData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Complete Web Development Bootcamp"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={courseData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Course Description *</Label>
              <Textarea
                id="description"
                value={courseData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe what students will learn in this course..."
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="duration">Duration *</Label>
                <Input
                  id="duration"
                  value={courseData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  placeholder="e.g., 8 weeks"
                  required
                />
              </div>
              <div>
                <Label htmlFor="difficulty">Difficulty Level *</Label>
                <Select value={courseData.difficulty} onValueChange={(value) => handleInputChange('difficulty', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map(difficulty => (
                      <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  value={courseData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="0 for free"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Content */}
        <Card>
          <CardHeader>
            <CardTitle>Course Content</CardTitle>
            <CardDescription>Upload or link to your course materials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="videoUrl">Video URL</Label>
              <div className="flex gap-2">
                <Video className="w-5 h-5 text-muted-foreground mt-2" />
                <Input
                  id="videoUrl"
                  value={courseData.videoUrl}
                  onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                  placeholder="https://youtube.com/watch?v=... or Vimeo link"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="pdfFile">Course Material (PDF)</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {courseData.pdfFile ? courseData.pdfFile.name : 'Click to upload PDF or drag and drop'}
                  </p>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e.target.files?.[0] || null)}
                    className="hidden"
                    id="pdf-upload"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => document.getElementById('pdf-upload')?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="quizUrl">Quiz/Assessment URL</Label>
              <div className="flex gap-2">
                <Link className="w-5 h-5 text-muted-foreground mt-2" />
                <Input
                  id="quizUrl"
                  value={courseData.quizUrl}
                  onChange={(e) => handleInputChange('quizUrl', e.target.value)}
                  placeholder="Link to Google Forms, Typeform, or custom quiz platform"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Objectives */}
        <Card>
          <CardHeader>
            <CardTitle>Learning Objectives</CardTitle>
            <CardDescription>What will students achieve after completing this course?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {courseData.learningObjectives.map((objective, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={objective}
                  onChange={(e) => handleObjectiveChange(index, e.target.value)}
                  placeholder={`Learning objective ${index + 1}`}
                />
                {courseData.learningObjectives.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeObjective(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addObjective}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Learning Objective
            </Button>
          </CardContent>
        </Card>

        {/* Prerequisites */}
        <Card>
          <CardHeader>
            <CardTitle>Prerequisites</CardTitle>
            <CardDescription>What should students know before taking this course?</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={courseData.prerequisites}
              onChange={(e) => handleInputChange('prerequisites', e.target.value)}
              placeholder="List any required knowledge, skills, or previous courses..."
              rows={3}
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit" disabled={isLoading}>
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Publishing...' : 'Publish Course'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadCourse;