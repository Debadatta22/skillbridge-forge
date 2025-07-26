import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Globe, MapPin, Gamepad2, BookOpen, Rocket, Brain, TrendingUp } from 'lucide-react';

const Explore: React.FC = () => {
  const exploreItems = [
    {
      id: 1,
      title: "Global Technology Landscape",
      description: "Discover technology adoption, innovation hubs, and talent distribution across the globe. Hover over countries to reveal detailed insights about their tech ecosystems.",
      icon: Globe,
      url: "https://candid-buttercream-e156f3.netlify.app/",
      category: "Analytics",
      color: "bg-blue-500/10 text-blue-400 border-blue-500/20"
    },
    {
      id: 2,
      title: "Shape Your Career One Step at a Time",
      description: "Discover your perfect career path with interactive roadmaps, personalized guidance, and step-by-step learning plans tailored for every graduate.",
      icon: MapPin,
      url: "https://ubiquitous-queijadas-0ac6ce.netlify.app/",
      category: "Career Planning",
      color: "bg-green-500/10 text-green-400 border-green-500/20"
    },
    {
      id: 3,
      title: "Learn & Play",
      description: "Transform learning into an exciting adventure! Play interactive games, challenge yourself, and master new skills while having fun.",
      icon: Gamepad2,
      url: "https://game-brain-boost.lovable.app/",
      category: "Gaming",
      color: "bg-purple-500/10 text-purple-400 border-purple-500/20"
    }
  ];

  const comingSoonItems = [
    {
      id: 4,
      title: "AI-Powered Study Companion",
      description: "Get personalized study recommendations and AI tutoring assistance.",
      icon: Brain,
      category: "AI Learning"
    },
    {
      id: 5,
      title: "Industry Trends Explorer",
      description: "Stay updated with the latest trends and demands in your field.",
      icon: TrendingUp,
      category: "Market Research"
    },
    {
      id: 6,
      title: "Virtual Campus Tours",
      description: "Explore top universities and institutions through immersive VR experiences.",
      icon: BookOpen,
      category: "Education"
    },
    {
      id: 7,
      title: "Startup Launchpad",
      description: "Connect with investors, mentors, and fellow entrepreneurs.",
      icon: Rocket,
      category: "Entrepreneurship"
    }
  ];

  const handleExploreClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Explore & Discover
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Expand your horizons with interactive tools, career insights, and educational resources
        </p>
      </div>

      {/* Available Resources */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <ExternalLink className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold text-foreground">Available Resources</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exploreItems.map((item) => (
            <Card 
              key={item.id}
              className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-border/50 hover:border-primary/50 bg-card/50 backdrop-blur-sm"
              onClick={() => handleExploreClick(item.url)}
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${item.color} transition-all duration-300 group-hover:scale-110`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mt-2 line-clamp-3">
                    {item.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                  <span>Explore Now</span>
                  <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Rocket className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold text-foreground">Coming Soon</h2>
          <Badge variant="outline" className="ml-2">Exciting Updates</Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {comingSoonItems.map((item) => (
            <Card 
              key={item.id}
              className="group transition-all duration-300 hover:shadow-lg border-border/50 bg-card/30 backdrop-blur-sm opacity-75 hover:opacity-90"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-muted/50 text-muted-foreground transition-all duration-300 group-hover:bg-primary/10 group-hover:text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <Badge variant="outline" className="text-xs border-dashed">
                    {item.category}
                  </Badge>
                </div>
                <div>
                  <CardTitle className="text-base font-semibold text-foreground/80">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {item.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <span>Coming Soon</span>
                  <div className="h-2 w-2 bg-primary/50 rounded-full animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;