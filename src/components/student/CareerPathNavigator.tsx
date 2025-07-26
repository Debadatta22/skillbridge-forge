import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Code2, 
  Server, 
  Database, 
  Brain, 
  Cloud, 
  Palette, 
  Shield, 
  Blocks, 
  Smartphone, 
  Megaphone, 
  Target, 
  Gamepad2, 
  Video, 
  Settings, 
  TrendingUp,
  ChevronDown,
  Star,
  Award,
  Clock,
  Users
} from 'lucide-react';

interface CareerField {
  id: number;
  title: string;
  icon: React.ElementType;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  overview: string;
  skills: string[];
  learningPath: string[];
  certifications: string[];
  estimatedTime: string;
  averageSalary: string;
  jobDemand: 'High' | 'Medium' | 'Low' | 'Variable';
}

const careerFields: CareerField[] = [
  {
    id: 1,
    title: 'Frontend Developer',
    icon: Code2,
    level: 'Beginner',
    overview: 'Create user interfaces and experiences using modern web technologies.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'UI/UX', 'Git'],
    learningPath: [
      'HTML/CSS Basics',
      'JavaScript Fundamentals',
      'React.js',
      'Version Control (Git)',
      'Build Portfolio Projects'
    ],
    certifications: ['Meta Frontend Developer', 'freeCodeCamp Responsive Web Design'],
    estimatedTime: '6-8 months',
    averageSalary: '$70,000 - $120,000',
    jobDemand: 'High'
  },
  {
    id: 2,
    title: 'Backend Developer',
    icon: Server,
    level: 'Intermediate',
    overview: 'Build server-side applications, APIs, and database management systems.',
    skills: ['Node.js', 'Express', 'MongoDB', 'APIs', 'SQL', 'Authentication'],
    learningPath: [
      'JavaScript Basics',
      'Node.js + Express',
      'MongoDB & SQL',
      'REST API Development',
      'Secure Auth + Deployments'
    ],
    certifications: ['AWS Certified Developer', 'MongoDB Certified Developer'],
    estimatedTime: '8-10 months',
    averageSalary: '$80,000 - $140,000',
    jobDemand: 'High'
  },
  {
    id: 3,
    title: 'Data Scientist',
    icon: Database,
    level: 'Advanced',
    overview: 'Extract insights from data using statistical analysis and machine learning.',
    skills: ['Python', 'Pandas', 'NumPy', 'Data Visualization', 'ML', 'SQL'],
    learningPath: [
      'Python Programming',
      'Data Analysis Libraries',
      'Statistics & Math',
      'ML Algorithms',
      'Projects & Competitions (Kaggle)'
    ],
    certifications: ['Google Data Analytics', 'IBM Data Science Professional'],
    estimatedTime: '12-15 months',
    averageSalary: '$95,000 - $170,000',
    jobDemand: 'High'
  },
  {
    id: 4,
    title: 'AI/ML Engineer',
    icon: Brain,
    level: 'Advanced',
    overview: 'Develop artificial intelligence and machine learning solutions.',
    skills: ['Python', 'TensorFlow', 'Scikit-learn', 'Deep Learning', 'MLOps'],
    learningPath: [
      'Python + NumPy',
      'Supervised Learning',
      'Deep Learning (CNN, RNN)',
      'TensorFlow/Keras',
      'MLOps Basics'
    ],
    certifications: ['TensorFlow Developer Certificate', 'AWS ML Specialty'],
    estimatedTime: '12-18 months',
    averageSalary: '$110,000 - $200,000',
    jobDemand: 'High'
  },
  {
    id: 5,
    title: 'Cloud Engineer',
    icon: Cloud,
    level: 'Intermediate',
    overview: 'Design and manage cloud infrastructure and services.',
    skills: ['AWS/Azure/GCP', 'Docker', 'CI/CD', 'Terraform'],
    learningPath: [
      'Linux Basics',
      'Cloud Fundamentals (AWS/GCP)',
      'Networking & Storage',
      'DevOps Tools (Docker, Jenkins)',
      'Infra as Code (Terraform)'
    ],
    certifications: ['AWS Solutions Architect', 'Azure Administrator'],
    estimatedTime: '10-12 months',
    averageSalary: '$90,000 - $160,000',
    jobDemand: 'High'
  },
  {
    id: 6,
    title: 'UI/UX Designer',
    icon: Palette,
    level: 'Beginner',
    overview: 'Design user-centered interfaces and optimize user experiences.',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Wireframes'],
    learningPath: [
      'Design Thinking',
      'Wireframing Tools',
      'UI Kits & Style Guides',
      'Prototyping',
      'Usability Testing'
    ],
    certifications: ['Google UX Design Certificate', 'Adobe Certified Expert'],
    estimatedTime: '6-9 months',
    averageSalary: '$65,000 - $115,000',
    jobDemand: 'High'
  },
  {
    id: 7,
    title: 'Cybersecurity Analyst',
    icon: Shield,
    level: 'Intermediate',
    overview: 'Protect organizations from cyber threats and security breaches.',
    skills: ['Networking', 'Firewalls', 'Threat Detection', 'Kali Linux', 'SOC Tools'],
    learningPath: [
      'Networking & OS',
      'Security Fundamentals',
      'Vulnerability Scanning',
      'Ethical Hacking',
      'Certifications (CEH, CompTIA)'
    ],
    certifications: ['CISSP', 'CEH', 'CompTIA Security+'],
    estimatedTime: '9-12 months',
    averageSalary: '$85,000 - $150,000',
    jobDemand: 'High'
  },
  {
    id: 8,
    title: 'Blockchain Developer',
    icon: Blocks,
    level: 'Advanced',
    overview: 'Build decentralized applications and smart contracts.',
    skills: ['Solidity', 'Smart Contracts', 'Ethereum', 'Web3.js'],
    learningPath: [
      'Blockchain Basics',
      'Solidity Programming',
      'DApp Development',
      'Web3 Integration',
      'Security Audits'
    ],
    certifications: ['Certified Blockchain Developer', 'Ethereum Developer'],
    estimatedTime: '10-14 months',
    averageSalary: '$100,000 - $180,000',
    jobDemand: 'Medium'
  },
  {
    id: 9,
    title: 'Mobile App Developer',
    icon: Smartphone,
    level: 'Intermediate',
    overview: 'Create mobile applications for iOS and Android platforms.',
    skills: ['Flutter', 'Dart', 'Android Studio', 'Firebase', 'UI/UX for mobile'],
    learningPath: [
      'Dart Language',
      'Flutter Widgets',
      'State Management',
      'Firebase Integration',
      'Deployment to App Stores'
    ],
    certifications: ['Google Associate Android Developer', 'Flutter Certified'],
    estimatedTime: '8-10 months',
    averageSalary: '$75,000 - $130,000',
    jobDemand: 'High'
  },
  {
    id: 10,
    title: 'Digital Marketer',
    icon: Megaphone,
    level: 'Beginner',
    overview: 'Drive business growth through digital marketing strategies.',
    skills: ['SEO', 'SEM', 'Analytics', 'Email Marketing', 'Social Media'],
    learningPath: [
      'SEO Basics',
      'Google Ads & Analytics',
      'Email Marketing Tools',
      'Social Strategy',
      'A/B Testing & Funnels'
    ],
    certifications: ['Google Ads Certified', 'HubSpot Content Marketing'],
    estimatedTime: '4-6 months',
    averageSalary: '$50,000 - $90,000',
    jobDemand: 'High'
  },
  {
    id: 11,
    title: 'Product Manager',
    icon: Target,
    level: 'Intermediate',
    overview: 'Guide product development and strategy from conception to launch.',
    skills: ['Roadmapping', 'Agile', 'Wireframing', 'Business Analysis'],
    learningPath: [
      'Product Lifecycle',
      'User Research',
      'Backlog Management',
      'Agile Frameworks',
      'Go-to-Market Strategy'
    ],
    certifications: ['Certified Scrum Product Owner', 'Product Management Certificate'],
    estimatedTime: '6-9 months',
    averageSalary: '$90,000 - $160,000',
    jobDemand: 'High'
  },
  {
    id: 12,
    title: 'Game Developer',
    icon: Gamepad2,
    level: 'Intermediate',
    overview: 'Create interactive games and gaming experiences.',
    skills: ['Unity', 'C#', 'Game Physics', 'Animation', 'VR/AR Concepts'],
    learningPath: [
      'C# Basics',
      'Unity Game Engine',
      'Game Physics & Mechanics',
      'Asset Integration',
      'Multiplayer & AR/VR Features'
    ],
    certifications: ['Unity Certified Developer', 'Unreal Engine Certified'],
    estimatedTime: '10-12 months',
    averageSalary: '$65,000 - $120,000',
    jobDemand: 'Medium'
  },
  {
    id: 13,
    title: 'Content Creator',
    icon: Video,
    level: 'Beginner',
    overview: 'Create engaging content across various digital platforms.',
    skills: ['Scriptwriting', 'Editing', 'SEO', 'Canva/Photoshop', 'YouTube'],
    learningPath: [
      'Content Planning',
      'Video Editing Tools',
      'SEO for Creators',
      'Branding & Monetization',
      'Audience Growth'
    ],
    certifications: ['YouTube Creator Academy', 'Google Analytics for Content'],
    estimatedTime: '3-6 months',
    averageSalary: '$40,000 - $80,000',
    jobDemand: 'Medium'
  },
  {
    id: 14,
    title: 'DevOps Engineer',
    icon: Settings,
    level: 'Advanced',
    overview: 'Bridge development and operations through automation and monitoring.',
    skills: ['Linux', 'CI/CD', 'Kubernetes', 'Docker', 'Jenkins'],
    learningPath: [
      'OS & Terminal Basics',
      'Version Control',
      'CI/CD Pipeline',
      'Containerization',
      'Monitoring Tools (Prometheus, Grafana)'
    ],
    certifications: ['Docker Certified Associate', 'Kubernetes Administrator'],
    estimatedTime: '10-14 months',
    averageSalary: '$95,000 - $170,000',
    jobDemand: 'High'
  },
  {
    id: 15,
    title: 'Entrepreneur / Startup Founder',
    icon: TrendingUp,
    level: 'Advanced',
    overview: 'Build and scale innovative business ventures.',
    skills: ['Business Model', 'MVP', 'Marketing', 'Sales', 'Fundraising'],
    learningPath: [
      'Ideation & Validation',
      'Building MVP',
      'Go-to-Market Plan',
      'Growth & Analytics',
      'Pitch Deck & Fundraising'
    ],
    certifications: ['Lean Startup Certificate', 'Business Model Canvas'],
    estimatedTime: '12+ months',
    averageSalary: 'Variable',
    jobDemand: 'Variable'
  }
];

const CareerPathNavigator: React.FC = () => {
  const [selectedCareer, setSelectedCareer] = useState<CareerField | null>(null);
  const [isPathOpen, setIsPathOpen] = useState(false);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-red-400';
      case 'Variable': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Career Path Navigator
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore different career paths, understand required skills, and plan your learning journey 
            with our interactive career guide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {careerFields.map((career) => {
            const IconComponent = career.icon;
            return (
              <Card
                key={career.id}
                className="group cursor-pointer bg-slate-800/50 border-slate-700 hover:border-purple-500/50 
                         transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20
                         backdrop-blur-sm"
                onClick={() => setSelectedCareer(career)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <IconComponent className="h-8 w-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
                    <Badge className={`text-xs border ${getLevelColor(career.level)}`}>
                      {career.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-white group-hover:text-purple-200 transition-colors text-lg">
                    {career.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {career.overview}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {career.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-slate-700 text-gray-300">
                        {skill}
                      </Badge>
                    ))}
                    {career.skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs bg-slate-700 text-gray-300">
                        +{career.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {career.estimatedTime}
                    </span>
                    <span className={`flex items-center gap-1 ${getDemandColor(career.jobDemand)}`}>
                      <TrendingUp className="h-3 w-3" />
                      {career.jobDemand}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Career Detail Modal */}
        <Dialog open={!!selectedCareer} onOpenChange={() => setSelectedCareer(null)}>
          <DialogContent className="max-w-4xl bg-slate-900 border-slate-700 text-white max-h-[90vh] overflow-y-auto">
            {selectedCareer && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3 text-2xl">
                    <selectedCareer.icon className="h-8 w-8 text-purple-400" />
                    {selectedCareer.title}
                    <Badge className={`ml-auto border ${getLevelColor(selectedCareer.level)}`}>
                      {selectedCareer.level}
                    </Badge>
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Overview */}
                  <div>
                    <h3 className="text-lg font-semibold text-purple-400 mb-2">Overview</h3>
                    <p className="text-gray-300">{selectedCareer.overview}</p>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-blue-400" />
                        <span className="text-sm font-medium text-blue-400">Learning Time</span>
                      </div>
                      <p className="text-white">{selectedCareer.estimatedTime}</p>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-green-400" />
                        <span className="text-sm font-medium text-green-400">Average Salary</span>
                      </div>
                      <p className="text-white">{selectedCareer.averageSalary}</p>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className={`h-4 w-4 ${getDemandColor(selectedCareer.jobDemand)}`} />
                        <span className={`text-sm font-medium ${getDemandColor(selectedCareer.jobDemand)}`}>Job Demand</span>
                      </div>
                      <p className="text-white">{selectedCareer.jobDemand}</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h3 className="text-lg font-semibold text-purple-400 mb-3">Key Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCareer.skills.map((skill, index) => (
                        <Badge 
                          key={index} 
                          className="bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30 transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Learning Path */}
                  <div>
                    <Collapsible open={isPathOpen} onOpenChange={setIsPathOpen}>
                      <CollapsibleTrigger asChild>
                        <Button 
                          variant="ghost" 
                          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 p-0"
                        >
                          <h3 className="text-lg font-semibold">Recommended Learning Path</h3>
                          <ChevronDown className={`h-4 w-4 transition-transform ${isPathOpen ? 'rotate-180' : ''}`} />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-3">
                        <div className="space-y-3">
                          {selectedCareer.learningPath.map((step, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                              <div className="flex-shrink-0 w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                                <span className="text-purple-400 font-semibold text-sm">{index + 1}</span>
                              </div>
                              <span className="text-gray-300">{step}</span>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>

                  {/* Certifications */}
                  <div>
                    <h3 className="text-lg font-semibold text-purple-400 mb-3">Recommended Certifications</h3>
                    <div className="space-y-2">
                      {selectedCareer.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-slate-800/30 rounded">
                          <Award className="h-4 w-4 text-yellow-400" />
                          <span className="text-gray-300">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      Start Learning Path
                    </Button>
                    <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
                      Save to Favorites
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CareerPathNavigator;