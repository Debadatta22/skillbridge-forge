import React from 'react';
import { Smartphone, Eye, Headphones, Zap, Globe, Cpu, Play, Download, Clock } from 'lucide-react';

const ARVRLabs: React.FC = () => {
  const experiences = [
    {
      id: 1,
      title: 'Virtual Chemistry Lab',
      type: 'VR',
      description: 'Conduct chemical experiments in a safe virtual environment',
      thumbnail: 'https://images.unsplash.com/photo-1516044734145-07ca8eef8731?w=400',
      duration: '45 min',
      difficulty: 'Beginner',
      rating: 4.8,
      participants: 2341
    },
    {
      id: 2,
      title: 'AR Anatomy Explorer',
      type: 'AR',
      description: 'Explore human anatomy with interactive 3D models',
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
      duration: '30 min',
      difficulty: 'Intermediate',
      rating: 4.9,
      participants: 1876
    },
    {
      id: 3,
      title: 'Virtual Physics Playground',
      type: 'VR',
      description: 'Understand physics concepts through immersive simulations',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
      duration: '60 min',
      difficulty: 'Advanced',
      rating: 4.7,
      participants: 1234
    },
    {
      id: 4,
      title: 'AR Circuit Builder',
      type: 'AR',
      description: 'Build and test electronic circuits in augmented reality',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400',
      duration: '40 min',
      difficulty: 'Intermediate',
      rating: 4.6,
      participants: 987
    }
  ];

  const features = [
    {
      icon: Eye,
      title: 'Immersive Learning',
      description: 'Experience concepts in 3D space for better understanding'
    },
    {
      icon: Headphones,
      title: 'Spatial Audio',
      description: 'Enhanced learning with directional audio cues'
    },
    {
      icon: Zap,
      title: 'Real-time Interaction',
      description: 'Manipulate objects and see immediate results'
    },
    {
      icon: Globe,
      title: 'Cross-platform',
      description: 'Access from web, mobile, or VR headsets'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'AR' 
      ? 'bg-blue-100 text-blue-800 border-blue-200' 
      : 'bg-purple-100 text-purple-800 border-purple-200';
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-background/90"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-xl animate-bounce" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 144 }, (_, i) => (
              <div key={i} className="border border-white/10 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
            ))}
          </div>
        </div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-1/4 left-1/3 w-6 h-6 border-2 border-white/30 rotate-45 animate-spin" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-8 h-8 border-2 border-white/30 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-white/20 rotate-45 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            AR/VR Learning Labs
          </h1>
          <p className="text-muted-foreground text-lg">
            Step into immersive learning experiences with cutting-edge AR and VR technology
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="p-3 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-lg mb-4 w-fit">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {experiences.map(experience => (
            <div key={experience.id} className="bg-card/90 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative">
                <img
                  src={experience.thumbnail}
                  alt={experience.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded border ${getTypeColor(experience.type)}`}>
                    {experience.type}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded border ${getDifficultyColor(experience.difficulty)}`}>
                    {experience.difficulty}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <button className="opacity-0 group-hover:opacity-100 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 transition-all duration-300 transform scale-90 group-hover:scale-100">
                    <Play className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-semibold text-foreground mb-2">{experience.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{experience.description}</p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {experience.duration}
                  </span>
                  <span>⭐ {experience.rating}</span>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 gradient-student text-white py-2 px-3 rounded-lg text-sm font-medium hover-glow transition-all duration-300">
                    Launch Experience
                  </button>
                  <button className="p-2 border border-border rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Requirements Section */}
        <div className="bg-card/90 backdrop-blur-sm border border-border rounded-xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Cpu className="w-6 h-6" />
            System Requirements
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-foreground mb-3">For AR Experiences</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Modern smartphone or tablet</li>
                <li>• Camera access enabled</li>
                <li>• ARCore (Android) or ARKit (iOS)</li>
                <li>• Stable internet connection</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-3">For VR Experiences</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• VR headset (Oculus, HTC Vive, etc.)</li>
                <li>• Desktop/laptop computer</li>
                <li>• Graphics card: GTX 1060 or better</li>
                <li>• 8GB RAM minimum</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-3">Web-based Access</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Chrome, Firefox, or Safari</li>
                <li>• WebXR compatible browser</li>
                <li>• Hardware acceleration enabled</li>
                <li>• High-speed internet recommended</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARVRLabs;