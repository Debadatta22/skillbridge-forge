import React from 'react';
import { Code, Database, Palette, Calculator, Cpu, Globe, Lock, Zap } from 'lucide-react';

const SkillLab: React.FC = () => {
  const labTools = [
    {
      id: 1,
      title: 'Code Editor',
      description: 'Interactive coding environment with syntax highlighting and real-time preview',
      icon: Code,
      color: 'from-blue-500 to-blue-600',
      features: ['Multi-language support', 'Live preview', 'Code sharing', 'Debug tools'],
      status: 'Available'
    },
    {
      id: 2,
      title: 'Database Simulator',
      description: 'Practice SQL queries and database design with real-time feedback',
      icon: Database,
      color: 'from-green-500 to-green-600',
      features: ['SQL playground', 'Schema designer', 'Query optimization', 'Data visualization'],
      status: 'Available'
    },
    {
      id: 3,
      title: 'Design Canvas',
      description: 'Creative design tool for UI/UX prototyping and graphic design',
      icon: Palette,
      color: 'from-purple-500 to-purple-600',
      features: ['Vector editing', 'Prototyping', 'Color palettes', 'Asset library'],
      status: 'Beta'
    },
    {
      id: 4,
      title: 'Algorithm Visualizer',
      description: 'Visualize data structures and algorithms in real-time',
      icon: Calculator,
      color: 'from-orange-500 to-orange-600',
      features: ['Step-by-step execution', 'Interactive graphs', 'Complexity analysis', 'Custom inputs'],
      status: 'Available'
    },
    {
      id: 5,
      title: 'API Testing Lab',
      description: 'Test and debug REST APIs with comprehensive tools',
      icon: Globe,
      color: 'from-cyan-500 to-cyan-600',
      features: ['Request builder', 'Response analysis', 'Mock servers', 'Documentation'],
      status: 'Available'
    },
    {
      id: 6,
      title: 'Cybersecurity Sandbox',
      description: 'Safe environment to learn ethical hacking and security concepts',
      icon: Lock,
      color: 'from-red-500 to-red-600',
      features: ['Vulnerability testing', 'Network analysis', 'Penetration testing', 'Security reports'],
      status: 'Coming Soon'
    },
    {
      id: 7,
      title: 'ML Playground',
      description: 'Experiment with machine learning models and datasets',
      icon: Cpu,
      color: 'from-indigo-500 to-indigo-600',
      features: ['Pre-trained models', 'Custom datasets', 'Model training', 'Performance metrics'],
      status: 'Beta'
    },
    {
      id: 8,
      title: 'Performance Profiler',
      description: 'Analyze and optimize code performance with detailed metrics',
      icon: Zap,
      color: 'from-yellow-500 to-yellow-600',
      features: ['CPU profiling', 'Memory analysis', 'Load testing', 'Optimization tips'],
      status: 'Available'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Beta':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Coming Soon':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Skill Lab</h1>
        <p className="text-muted-foreground">
          Access powerful tools and interactive environments to practice and develop your skills
        </p>
      </div>

      {/* Featured Tool */}
      <div className="bg-gradient-to-br from-primary/10 via-purple-50/50 to-blue-50/50 dark:from-primary/5 dark:via-purple-900/10 dark:to-blue-900/10 rounded-2xl p-8 mb-8 border border-border">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                <Code className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Featured: Code Editor</h2>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full border border-green-200">
                  Available
                </span>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 text-lg">
              Start coding immediately with our powerful online IDE supporting multiple programming languages with intelligent autocomplete and live preview.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 bg-background border border-border rounded-lg text-sm">JavaScript</span>
              <span className="px-3 py-1 bg-background border border-border rounded-lg text-sm">Python</span>
              <span className="px-3 py-1 bg-background border border-border rounded-lg text-sm">React</span>
              <span className="px-3 py-1 bg-background border border-border rounded-lg text-sm">HTML/CSS</span>
            </div>
            <button className="gradient-student text-white px-6 py-3 rounded-lg font-medium hover-glow transition-all duration-300">
              Launch Code Editor
            </button>
          </div>
          <div className="w-full lg:w-96 h-64 bg-gray-900 rounded-xl p-4 font-mono text-sm overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 ml-4">main.js</span>
            </div>
            <div className="text-gray-300 space-y-1">
              <div><span className="text-purple-400">function</span> <span className="text-blue-400">calculateSum</span><span className="text-yellow-300">(a, b)</span> {`{`}</div>
              <div className="ml-4"><span className="text-pink-400">return</span> a + b;</div>
              <div>{`}`}</div>
              <div></div>
              <div><span className="text-green-400">// Example usage</span></div>
              <div><span className="text-purple-400">const</span> result = <span className="text-blue-400">calculateSum</span>(5, 3);</div>
              <div>console.<span className="text-blue-400">log</span>(<span className="text-green-300">`Result: ${`{result}`}`</span>);</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {labTools.map(tool => (
          <div key={tool.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <div className={`p-6 bg-gradient-to-br ${tool.color} text-white`}>
              <div className="flex items-center justify-between mb-4">
                <tool.icon className="w-8 h-8" />
                <span className={`px-2 py-1 text-xs font-medium rounded border ${
                  tool.status === 'Available' ? 'bg-white/20 text-white border-white/30' :
                  tool.status === 'Beta' ? 'bg-yellow-500/20 text-yellow-100 border-yellow-300/30' :
                  'bg-gray-500/20 text-gray-200 border-gray-300/30'
                }`}>
                  {tool.status}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
              <p className="text-white/90 text-sm">{tool.description}</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-3 mb-6">
                {tool.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    {feature}
                  </div>
                ))}
              </div>
              
              <button 
                className={`w-full py-2 rounded-lg font-medium transition-all duration-300 ${
                  tool.status === 'Available' 
                    ? 'gradient-student text-white hover-glow' 
                    : tool.status === 'Beta'
                    ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                    : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                }`}
                disabled={tool.status === 'Coming Soon'}
              >
                {tool.status === 'Available' ? 'Launch Tool' :
                 tool.status === 'Beta' ? 'Try Beta' :
                 'Coming Soon'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-foreground mb-2">8</div>
          <div className="text-muted-foreground">Available Tools</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-foreground mb-2">2.4k</div>
          <div className="text-muted-foreground">Active Users</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-foreground mb-2">15k</div>
          <div className="text-muted-foreground">Projects Created</div>
        </div>
      </div>
    </div>
  );
};

export default SkillLab;