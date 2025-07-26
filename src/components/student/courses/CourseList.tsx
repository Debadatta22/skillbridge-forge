import React, { useState } from 'react';
import { Play, BookOpen, Clock, Users, Star, Filter, Search } from 'lucide-react';

const CourseList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const courses = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
      instructor: 'Dr. Sarah Johnson',
      category: 'Web Development',
      duration: '40 hours',
      students: 1234,
      rating: 4.8,
      progress: 65,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
      description: 'Learn HTML, CSS, JavaScript, React, and Node.js from scratch to become a full-stack developer.',
      enrolled: true
    },
    {
      id: 2,
      title: 'Digital Marketing Mastery',
      instructor: 'Mark Stevens',
      category: 'Marketing',
      duration: '30 hours',
      students: 856,
      rating: 4.6,
      progress: 30,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      description: 'Master SEO, social media marketing, content creation, and analytics.',
      enrolled: true
    },
    {
      id: 3,
      title: 'Data Science with Python',
      instructor: 'Prof. Emily Chen',
      category: 'Data Science',
      duration: '50 hours',
      students: 2341,
      rating: 4.9,
      progress: 0,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      description: 'Learn Python, pandas, matplotlib, scikit-learn, and machine learning fundamentals.',
      enrolled: false
    },
    {
      id: 4,
      title: 'UI/UX Design Fundamentals',
      instructor: 'Jessica Martinez',
      category: 'Design',
      duration: '35 hours',
      students: 987,
      rating: 4.7,
      progress: 0,
      thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400',
      description: 'Master design principles, Figma, prototyping, and user research methodologies.',
      enrolled: false
    }
  ];

  const categories = ['all', 'Web Development', 'Marketing', 'Data Science', 'Design', 'Programming'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Courses</h1>
        <p className="text-muted-foreground">Explore and enroll in courses to advance your skills</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-8 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent min-w-[150px]"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <div key={course.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <div className="relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {course.enrolled && (
                <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                  Enrolled
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <button className="opacity-0 group-hover:opacity-100 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 transition-all duration-300 transform scale-90 group-hover:scale-100">
                  <Play className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">
                  {course.category}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-foreground">{course.rating}</span>
                </div>
              </div>
              
              <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{course.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">by {course.instructor}</p>
              
              {course.enrolled ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="gradient-student h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <button className="w-full gradient-student text-white py-3 rounded-lg font-medium hover-glow transition-all duration-300">
                    Continue Learning
                  </button>
                </div>
              ) : (
                <button className="w-full border border-primary text-primary py-3 rounded-lg font-medium hover:bg-primary hover:text-white transition-all duration-300">
                  Enroll Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;