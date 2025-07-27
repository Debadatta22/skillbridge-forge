import React, { useState } from 'react';
import { 
  Search, Filter, Mail, MessageCircle, Linkedin, Star, 
  MapPin, Award, Users, Clock, Send, X, CheckCircle,
  GraduationCap, Briefcase, Shield, ExternalLink
} from 'lucide-react';
import { toast } from '../ui/use-toast';

interface Mentor {
  id: string;
  name: string;
  role: 'educator' | 'certifier';
  avatar: string;
  title: string;
  company: string;
  location: string;
  rating: number;
  reviews: number;
  experience: number;
  specializations: string[];
  linkedinUrl?: string;
  email: string;
  isVerified: boolean;
  responseTime: string;
  mentees: number;
}

const ConnectWithMentors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<'all' | 'educator' | 'certifier'>('all');
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [contactMethod, setContactMethod] = useState<'email' | 'message'>('message');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const mentors: Mentor[] = [
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      role: 'educator',
      avatar: 'PS',
      title: 'Senior Software Engineer & Educator',
      company: 'TechCorp India',
      location: 'Bangalore, India',
      rating: 4.8,
      reviews: 124,
      experience: 8,
      specializations: ['Web Development', 'React', 'Node.js', 'System Design'],
      linkedinUrl: 'https://linkedin.com/in/priyasharma',
      email: 'priya.sharma@techcorp.com',
      isVerified: true,
      responseTime: '< 2 hours',
      mentees: 45
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      role: 'certifier',
      avatar: 'RK',
      title: 'Certification Authority & Tech Lead',
      company: 'SkillVerify Solutions',
      location: 'Mumbai, India',
      rating: 4.9,
      reviews: 89,
      experience: 12,
      specializations: ['Digital Marketing', 'Data Analytics', 'Cloud Computing'],
      linkedinUrl: 'https://linkedin.com/in/rajeshkumar',
      email: 'rajesh.kumar@skillverify.com',
      isVerified: true,
      responseTime: '< 4 hours',
      mentees: 78
    },
    {
      id: '3',
      name: 'Anita Desai',
      role: 'educator',
      avatar: 'AD',
      title: 'UI/UX Design Mentor',
      company: 'Design Academy',
      location: 'Pune, India',
      rating: 4.7,
      reviews: 156,
      experience: 6,
      specializations: ['UI/UX Design', 'Figma', 'Prototyping', 'User Research'],
      linkedinUrl: 'https://linkedin.com/in/anitadesai',
      email: 'anita.desai@designacademy.com',
      isVerified: true,
      responseTime: '< 3 hours',
      mentees: 62
    },
    {
      id: '4',
      name: 'Vikram Singh',
      role: 'certifier',
      avatar: 'VS',
      title: 'Cybersecurity Certification Expert',
      company: 'SecureNet Certifications',
      location: 'Delhi, India',
      rating: 4.9,
      reviews: 203,
      experience: 15,
      specializations: ['Cybersecurity', 'Ethical Hacking', 'Network Security'],
      linkedinUrl: 'https://linkedin.com/in/vikramsingh',
      email: 'vikram.singh@securenet.com',
      isVerified: true,
      responseTime: '< 1 hour',
      mentees: 134
    }
  ];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         mentor.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || mentor.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleContact = (mentor: Mentor, method: 'email' | 'message' | 'linkedin') => {
    setSelectedMentor(mentor);
    if (method === 'linkedin') {
      window.open(mentor.linkedinUrl, '_blank');
      return;
    }
    setContactMethod(method);
    setShowContactModal(true);
  };

  const handleSendMessage = () => {
    if (!contactSubject.trim() || !contactMessage.trim()) {
      toast({
        title: "Please fill all fields",
        description: "Subject and message are required",
        variant: "destructive",
      });
      return;
    }

    // Simulate sending message/email
    const messageData = {
      to: selectedMentor?.email,
      toName: selectedMentor?.name,
      toRole: selectedMentor?.role,
      subject: contactSubject,
      message: contactMessage,
      method: contactMethod,
      timestamp: new Date().toISOString(),
      from: 'current-student', // This would be the actual student ID
      fromName: 'Demo Student' // This would be the actual student name
    };

    // Store notification for the mentor (in real app, this would be sent to backend)
    const existingNotifications = JSON.parse(localStorage.getItem('mentor_notifications') || '[]');
    existingNotifications.push(messageData);
    localStorage.setItem('mentor_notifications', JSON.stringify(existingNotifications));

    toast({
      title: "Message sent successfully!",
      description: `Your ${contactMethod} has been sent to ${selectedMentor?.name}`,
    });

    setShowContactModal(false);
    setContactSubject('');
    setContactMessage('');
  };

  const getRoleIcon = (role: 'educator' | 'certifier') => {
    return role === 'educator' ? GraduationCap : Award;
  };

  const getRoleColor = (role: 'educator' | 'certifier') => {
    return role === 'educator' ? 'text-green-600' : 'text-purple-600';
  };

  const getRoleBg = (role: 'educator' | 'certifier') => {
    return role === 'educator' ? 'bg-green-100 dark:bg-green-900' : 'bg-purple-100 dark:bg-purple-900';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Connect with Mentors</h1>
        <p className="text-muted-foreground">
          Connect with industry experts, educators, and certifiers for guidance, verification, and career growth.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, skills, or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as 'all' | 'educator' | 'certifier')}
              className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Mentors</option>
              <option value="educator">Educators</option>
              <option value="certifier">Certifiers</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-accent transition-colors">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Found {filteredMentors.length} mentor{filteredMentors.length !== 1 ? 's' : ''} matching your criteria
        </p>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMentors.map((mentor) => {
          const RoleIcon = getRoleIcon(mentor.role);
          return (
            <div key={mentor.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
                  {mentor.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-foreground">{mentor.name}</h3>
                    {mentor.isVerified && (
                      <div className="p-1 bg-green-100 dark:bg-green-900 rounded-full">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{mentor.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Briefcase className="w-3 h-3" />
                    <span>{mentor.company}</span>
                  </div>
                </div>
                <div className={`p-2 ${getRoleBg(mentor.role)} rounded-lg`}>
                  <RoleIcon className={`w-5 h-5 ${getRoleColor(mentor.role)}`} />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-accent/20 rounded-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-semibold text-foreground">{mentor.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{mentor.reviews} reviews</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold text-foreground">{mentor.mentees}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">mentees</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span className="font-semibold text-foreground text-xs">{mentor.responseTime}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">response</p>
                </div>
              </div>

              {/* Specializations */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-foreground mb-2">Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  {mentor.specializations.slice(0, 3).map((spec, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                    >
                      {spec}
                    </span>
                  ))}
                  {mentor.specializations.length > 3 && (
                    <span className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                      +{mentor.specializations.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{mentor.location}</span>
              </div>

              {/* Contact Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleContact(mentor, 'message')}
                  className="flex-1 flex items-center justify-center gap-2 gradient-student text-white py-2 rounded-lg text-sm font-medium hover-glow transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4" />
                  Message
                </button>
                <button
                  onClick={() => handleContact(mentor, 'email')}
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-accent transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </button>
                {mentor.linkedinUrl && (
                  <button
                    onClick={() => handleContact(mentor, 'linkedin')}
                    className="flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-accent transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Contact Modal */}
      {showContactModal && selectedMentor && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {selectedMentor.avatar}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      {contactMethod === 'email' ? 'Send Email to' : 'Send Message to'} {selectedMentor.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">{selectedMentor.title}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="p-2 hover:bg-accent rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Purpose of Contact
                  </label>
                  <select
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select purpose</option>
                    <option value="Career Guidance">Career Guidance</option>
                    <option value="Skill Verification">Skill Verification</option>
                    <option value="Certificate Authentication">Certificate Authentication</option>
                    <option value="Course Recommendation">Course Recommendation</option>
                    <option value="Mentorship Request">Mentorship Request</option>
                    <option value="Technical Doubt">Technical Doubt</option>
                    <option value="Industry Insights">Industry Insights</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Describe your query, goals, or what you're looking for help with..."
                    rows={8}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Be specific about your goals and what kind of help you're seeking.
                  </p>
                </div>

                <div className="p-4 bg-accent/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Expected Response Time</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedMentor.name} typically responds within {selectedMentor.responseTime}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSendMessage}
                  className="flex-1 flex items-center justify-center gap-2 gradient-student text-white py-3 rounded-lg font-medium hover-glow transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
                  {contactMethod === 'email' ? 'Send Email' : 'Send Message'}
                </button>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="px-6 py-3 border border-border rounded-lg text-foreground hover:bg-accent transition-colors"
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

export default ConnectWithMentors;