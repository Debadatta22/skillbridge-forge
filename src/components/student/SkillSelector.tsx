import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: string;
}

const skillsData: Skill[] = [
  // Digital Skills
  { id: '1', name: 'Web Development', category: 'Digital Skills' },
  { id: '2', name: 'Mobile App Development', category: 'Digital Skills' },
  { id: '3', name: 'Digital Marketing', category: 'Digital Skills' },
  { id: '4', name: 'Social Media Management', category: 'Digital Skills' },
  { id: '5', name: 'Content Creation', category: 'Digital Skills' },
  { id: '6', name: 'SEO & SEM', category: 'Digital Skills' },
  { id: '7', name: 'E-commerce', category: 'Digital Skills' },
  { id: '8', name: 'UI/UX Design', category: 'Digital Skills' },
  
  // Technical Skills
  { id: '9', name: 'Data Science', category: 'Technical Skills' },
  { id: '10', name: 'Machine Learning', category: 'Technical Skills' },
  { id: '11', name: 'Cloud Computing', category: 'Technical Skills' },
  { id: '12', name: 'Cybersecurity', category: 'Technical Skills' },
  { id: '13', name: 'Database Management', category: 'Technical Skills' },
  { id: '14', name: 'DevOps', category: 'Technical Skills' },
  { id: '15', name: 'Blockchain', category: 'Technical Skills' },
  { id: '16', name: 'Internet of Things (IoT)', category: 'Technical Skills' },
  
  // Professional Skills
  { id: '17', name: 'Project Management', category: 'Professional Skills' },
  { id: '18', name: 'Communication Skills', category: 'Professional Skills' },
  { id: '19', name: 'Leadership', category: 'Professional Skills' },
  { id: '20', name: 'Team Collaboration', category: 'Professional Skills' },
  { id: '21', name: 'Problem Solving', category: 'Professional Skills' },
  { id: '22', name: 'Critical Thinking', category: 'Professional Skills' },
  { id: '23', name: 'Time Management', category: 'Professional Skills' },
  { id: '24', name: 'Presentation Skills', category: 'Professional Skills' },
];

interface SkillSelectorProps {
  onSkillsSelected: (skills: string[]) => void;
  onComplete: () => void;
}

const SkillSelector: React.FC<SkillSelectorProps> = ({ onSkillsSelected, onComplete }) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const categories = Array.from(new Set(skillsData.map(skill => skill.category)));

  const toggleSkill = (skillId: string) => {
    const newSelectedSkills = selectedSkills.includes(skillId)
      ? selectedSkills.filter(id => id !== skillId)
      : [...selectedSkills, skillId];
    
    setSelectedSkills(newSelectedSkills);
    onSkillsSelected(newSelectedSkills);
  };

  const handleComplete = () => {
    if (selectedSkills.length === 0) {
      return;
    }
    onComplete();
  };

  const getSelectedSkillNames = () => {
    return skillsData
      .filter(skill => selectedSkills.includes(skill.id))
      .map(skill => skill.name);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-2">
          Select Your Skills of Interest
        </h1>
        <p className="text-muted-foreground">
          Choose the skills you want to learn or improve. This helps us personalize your learning experience.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Skills Selection */}
        <div className="lg:col-span-2 space-y-8">
          {categories.map(category => (
            <div key={category} className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">{category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skillsData
                  .filter(skill => skill.category === category)
                  .map(skill => {
                    const isSelected = selectedSkills.includes(skill.id);
                    return (
                      <button
                        key={skill.id}
                        onClick={() => toggleSkill(skill.id)}
                        className={`skill-chip ${
                          isSelected ? 'skill-chip-active' : 'skill-chip-inactive'
                        }`}
                      >
                        <span className="flex items-center justify-between w-full">
                          <span>{skill.name}</span>
                          {isSelected && (
                            <Check className="w-4 h-4 ml-2 flex-shrink-0" />
                          )}
                        </span>
                      </button>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Skills Summary */}
        <div className="space-y-6">
          <div className="sticky top-8">
            <div className="bg-card border border-border rounded-xl p-6 shadow-md">
              <h3 className="font-semibold mb-4 text-foreground">
                Selected Skills ({selectedSkills.length})
              </h3>
              
              {selectedSkills.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No skills selected yet. Choose skills from the categories on the left.
                </p>
              ) : (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {getSelectedSkillNames().map(skillName => (
                      <span
                        key={skillName}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                      >
                        {skillName}
                      </span>
                    ))}
                  </div>
                  
                  <button
                    onClick={handleComplete}
                    className="w-full gradient-primary text-white py-3 rounded-lg font-medium hover-glow transition-all duration-300"
                  >
                    Continue with Selected Skills
                  </button>
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  💡 Tip: You can always modify your skill interests later in your profile settings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillSelector;