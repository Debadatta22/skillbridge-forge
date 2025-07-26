import React, { useState } from 'react';
import { Calendar, Plus, Clock, BookOpen, Target, CheckCircle, Edit, Trash2 } from 'lucide-react';

interface StudyPlan {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  priority: 'high' | 'medium' | 'low';
  category: string;
  completed: boolean;
}

const StudyPlanner: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([
    {
      id: '1',
      title: 'React Hooks Deep Dive',
      description: 'Study useEffect, useState, and custom hooks',
      date: '2024-01-20',
      time: '09:00',
      duration: 120,
      priority: 'high',
      category: 'Web Development',
      completed: false
    },
    {
      id: '2',
      title: 'Algorithm Practice',
      description: 'Solve 5 leetcode problems on arrays',
      date: '2024-01-20',
      time: '14:00',
      duration: 90,
      priority: 'medium',
      category: 'Programming',
      completed: true
    }
  ]);

  const [newPlan, setNewPlan] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: 60,
    priority: 'medium' as const,
    category: ''
  });

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getPlansForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return studyPlans.filter(plan => plan.date === dateStr);
  };

  const addStudyPlan = () => {
    const plan: StudyPlan = {
      id: Date.now().toString(),
      ...newPlan,
      completed: false
    };
    
    setStudyPlans([...studyPlans, plan]);
    setNewPlan({
      title: '',
      description: '',
      date: '',
      time: '',
      duration: 60,
      priority: 'medium',
      category: ''
    });
    setShowAddModal(false);
  };

  const toggleComplete = (id: string) => {
    setStudyPlans(plans => plans.map(plan => 
      plan.id === id ? { ...plan, completed: !plan.completed } : plan
    ));
  };

  const deletePlan = (id: string) => {
    setStudyPlans(plans => plans.filter(plan => plan.id !== id));
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const priorityColors = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-green-100 text-green-800 border-green-200'
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Study Planner</h1>
          <p className="text-muted-foreground">Organize your learning schedule and track your progress</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 gradient-student text-white px-4 py-2 rounded-lg hover-glow transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          Add Study Plan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                  className="p-2 hover:bg-accent rounded-lg transition-colors"
                >
                  ←
                </button>
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                  className="p-2 hover:bg-accent rounded-lg transition-colors"
                >
                  →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-4">
              {weekDays.map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentDate).map((day, index) => (
                <div
                  key={index}
                  className={`min-h-[80px] border border-border rounded-lg p-2 ${
                    day ? 'bg-background hover:bg-accent transition-colors cursor-pointer' : ''
                  }`}
                >
                  {day && (
                    <>
                      <div className="text-sm font-medium text-foreground mb-1">{day}</div>
                      <div className="space-y-1">
                        {getPlansForDate(day).slice(0, 2).map(plan => (
                          <div
                            key={plan.id}
                            className={`text-xs px-2 py-1 rounded truncate ${
                              plan.completed ? 'bg-green-100 text-green-800' : 'bg-primary/10 text-primary'
                            }`}
                          >
                            {plan.title}
                          </div>
                        ))}
                        {getPlansForDate(day).length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{getPlansForDate(day).length - 2} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Today's Schedule</h3>
            <div className="space-y-3">
              {studyPlans
                .filter(plan => plan.date === new Date().toISOString().split('T')[0])
                .sort((a, b) => a.time.localeCompare(b.time))
                .map(plan => (
                  <div
                    key={plan.id}
                    className={`p-3 border rounded-lg transition-all duration-200 ${
                      plan.completed 
                        ? 'border-green-200 bg-green-50 dark:bg-green-900/20' 
                        : 'border-border bg-background hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`font-medium ${plan.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                            {plan.title}
                          </h4>
                          <span className={`px-2 py-1 text-xs rounded border ${priorityColors[plan.priority]}`}>
                            {plan.priority}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{plan.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {plan.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            {plan.duration}min
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1 ml-2">
                        <button
                          onClick={() => toggleComplete(plan.id)}
                          className={`p-1 rounded transition-colors ${
                            plan.completed 
                              ? 'text-green-600 hover:text-green-700' 
                              : 'text-muted-foreground hover:text-primary'
                          }`}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deletePlan(plan.id)}
                          className="p-1 text-muted-foreground hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Study Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Plans Completed Today</span>
                <span className="font-semibold text-foreground">
                  {studyPlans.filter(p => p.completed && p.date === new Date().toISOString().split('T')[0]).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Study Time</span>
                <span className="font-semibold text-foreground">
                  {studyPlans
                    .filter(p => p.completed && p.date === new Date().toISOString().split('T')[0])
                    .reduce((acc, p) => acc + p.duration, 0)}min
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Study Streak</span>
                <span className="font-semibold text-foreground">7 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Study Plan Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Add Study Plan</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Title</label>
                  <input
                    type="text"
                    value={newPlan.title}
                    onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Study topic or task"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                  <textarea
                    value={newPlan.description}
                    onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Additional details..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Date</label>
                    <input
                      type="date"
                      value={newPlan.date}
                      onChange={(e) => setNewPlan({ ...newPlan, date: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Time</label>
                    <input
                      type="time"
                      value={newPlan.time}
                      onChange={(e) => setNewPlan({ ...newPlan, time: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Duration (minutes)</label>
                    <input
                      type="number"
                      value={newPlan.duration}
                      onChange={(e) => setNewPlan({ ...newPlan, duration: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                      min="15"
                      step="15"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Priority</label>
                    <select
                      value={newPlan.priority}
                      onChange={(e) => setNewPlan({ ...newPlan, priority: e.target.value as any })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                  <input
                    type="text"
                    value={newPlan.category}
                    onChange={(e) => setNewPlan({ ...newPlan, category: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., Web Development, Programming"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={addStudyPlan}
                  className="flex-1 gradient-student text-white py-2 rounded-lg font-medium hover-glow transition-all duration-300"
                >
                  Add Plan
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2 border border-border rounded-lg text-foreground hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyPlanner;