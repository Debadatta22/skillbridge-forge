import React, { useState } from 'react';
import { ClipboardList, Trophy, Target, Clock, CheckCircle } from 'lucide-react';

const Assessments: React.FC = () => {
  const [activeTab, setActiveTab] = useState('course-assessments');

  const courseAssessments = [
    {
      id: 1,
      title: 'Frontend Development Assessment',
      description: 'Test your knowledge of HTML, CSS, JavaScript, and React',
      duration: '45 minutes',
      questions: 25,
      difficulty: 'Intermediate',
      status: 'available'
    },
    {
      id: 2,
      title: 'Backend Development Assessment',
      description: 'Node.js, Express, MongoDB, and API development',
      duration: '60 minutes',
      questions: 30,
      difficulty: 'Advanced',
      status: 'available'
    },
    {
      id: 3,
      title: 'Data Science Fundamentals',
      description: 'Python, Pandas, NumPy, and basic ML concepts',
      duration: '50 minutes',
      questions: 28,
      difficulty: 'Beginner',
      status: 'completed'
    }
  ];

  const testSeries = [
    {
      id: 1,
      title: 'JavaScript Mastery Series',
      description: 'Comprehensive test series covering ES6+, async programming, and frameworks',
      tests: 5,
      totalQuestions: 150,
      certification: 'JavaScript Expert',
      status: 'in-progress'
    },
    {
      id: 2,
      title: 'Cloud Computing Certification',
      description: 'AWS, Azure, Docker, and Kubernetes knowledge assessment',
      tests: 8,
      totalQuestions: 200,
      certification: 'Cloud Professional',
      status: 'available'
    },
    {
      id: 3,
      title: 'AI/ML Practitioner Series',
      description: 'Machine learning algorithms, deep learning, and MLOps',
      tests: 6,
      totalQuestions: 180,
      certification: 'AI/ML Specialist',
      status: 'locked'
    }
  ];

  const results = [
    {
      id: 1,
      title: 'Data Science Fundamentals',
      score: 85,
      totalQuestions: 28,
      correctAnswers: 24,
      completedAt: '2024-01-15',
      certification: 'Data Science Beginner',
      status: 'passed'
    },
    {
      id: 2,
      title: 'JavaScript Basics Test',
      score: 92,
      totalQuestions: 20,
      correctAnswers: 18,
      completedAt: '2024-01-10',
      certification: null,
      status: 'passed'
    }
  ];

  const startAssessment = (assessmentId: number) => {
    // Here you would typically navigate to the assessment page
    console.log(`Starting assessment ${assessmentId}`);
  };

  const TabButton = ({ id, label, isActive, onClick }: any) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
        isActive 
          ? 'bg-primary text-primary-foreground shadow-md' 
          : 'bg-background text-muted-foreground hover:text-foreground hover:bg-accent'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 gradient-student rounded-xl flex items-center justify-center">
          <ClipboardList className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Assessments</h1>
          <p className="text-muted-foreground">Test your knowledge and earn certifications</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 p-1 bg-accent/20 rounded-lg">
        <TabButton 
          id="course-assessments" 
          label="Course Assessments" 
          isActive={activeTab === 'course-assessments'}
          onClick={setActiveTab}
        />
        <TabButton 
          id="test-series" 
          label="Test Series" 
          isActive={activeTab === 'test-series'}
          onClick={setActiveTab}
        />
        <TabButton 
          id="results" 
          label="Results" 
          isActive={activeTab === 'results'}
          onClick={setActiveTab}
        />
      </div>

      {/* Course Assessments Tab */}
      {activeTab === 'course-assessments' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseAssessments.map((assessment) => (
            <div key={assessment.id} className="bg-background border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  assessment.status === 'completed' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                }`}>
                  {assessment.status === 'completed' ? 'Completed' : 'Available'}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">{assessment.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{assessment.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{assessment.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ClipboardList className="w-4 h-4" />
                  <span>{assessment.questions} questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Difficulty:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    assessment.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                    assessment.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                    'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                  }`}>
                    {assessment.difficulty}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={() => startAssessment(assessment.id)}
                disabled={assessment.status === 'completed'}
                className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {assessment.status === 'completed' ? 'View Results' : 'Start Assessment'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Test Series Tab */}
      {activeTab === 'test-series' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {testSeries.map((series) => (
            <div key={series.id} className="bg-background border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  series.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                  series.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                  series.status === 'locked' ? 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400' :
                  'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                }`}>
                  {series.status === 'in-progress' ? 'In Progress' : 
                   series.status === 'locked' ? 'Locked' : 
                   series.status === 'completed' ? 'Completed' : 'Available'}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-2">{series.title}</h3>
              <p className="text-muted-foreground mb-4">{series.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-accent/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">Tests</p>
                  <p className="text-lg font-semibold text-foreground">{series.tests}</p>
                </div>
                <div className="p-3 bg-accent/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">Questions</p>
                  <p className="text-lg font-semibold text-foreground">{series.totalQuestions}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Certification:</span>
                </div>
                <p className="text-sm text-muted-foreground">{series.certification}</p>
              </div>
              
              <button 
                onClick={() => startAssessment(series.id)}
                disabled={series.status === 'locked'}
                className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {series.status === 'locked' ? 'Unlock Required' : 
                 series.status === 'in-progress' ? 'Continue Series' : 
                 'Start Test Series'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Results Tab */}
      {activeTab === 'results' && (
        <div className="space-y-4">
          {results.map((result) => (
            <div key={result.id} className="bg-background border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{result.title}</h3>
                  <p className="text-sm text-muted-foreground">Completed on {new Date(result.completedAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-lg font-bold text-green-600">{result.score}%</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="p-3 bg-accent/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">Score</p>
                  <p className="text-lg font-semibold text-foreground">{result.score}%</p>
                </div>
                <div className="p-3 bg-accent/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">Correct</p>
                  <p className="text-lg font-semibold text-foreground">{result.correctAnswers}</p>
                </div>
                <div className="p-3 bg-accent/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-lg font-semibold text-foreground">{result.totalQuestions}</p>
                </div>
                <div className="p-3 bg-accent/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="text-lg font-semibold text-green-600">Passed</p>
                </div>
              </div>
              
              {result.certification && (
                <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
                  <Trophy className="w-5 h-5 text-primary" />
                  <span className="font-medium text-primary">Certification Earned: {result.certification}</span>
                </div>
              )}
            </div>
          ))}
          
          {results.length === 0 && (
            <div className="text-center py-12">
              <ClipboardList className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Results Yet</h3>
              <p className="text-muted-foreground">Complete assessments to see your results here</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Assessments;