import React, { useState } from 'react';
import { Plus, X, Globe, Linkedin, Instagram, GraduationCap, Users, Award, Briefcase } from 'lucide-react';

const RightPanel: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isRotated, setIsRotated] = useState(false);

  const handleTapToView = () => {
    setIsRotated(true);
    setTimeout(() => {
      setShowPopup(true);
      setIsRotated(false);
    }, 300);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-gradient-to-br from-primary/5 via-blue-50/50 to-purple-50/50 dark:from-primary/10 dark:via-blue-900/20 dark:to-purple-900/20">
        <div className="text-center max-w-lg">
          <div className="mb-8">
            <img
              src="/lovable-uploads/e0be7986-2689-4a29-b5c5-04f4a938780d.png"
              alt="SkillBridge Platform"
              className="w-full max-w-md mx-auto rounded-2xl shadow-elegant hover:shadow-glow transition-all duration-500"
            />
          </div>

          <div className="space-y-4 mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Learn. Earn. Get Certified.
            </h2>
            <div className="space-y-2 text-lg text-muted-foreground">
              <p className="font-semibold text-foreground">For Students & Ind. Experts</p>
              <p>✨ Verified Certifications</p>
              <p>🚀 Job Opportunities Await</p>
              <p>🎯 One Platform. Multiple Roles</p>
            </div>
          </div>

          <button
            onClick={handleTapToView}
            className="group relative px-8 py-4 bg-white dark:bg-gray-800 border-2 border-primary rounded-full font-bold text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-elegant hover:shadow-glow"
          >
            <span className="flex items-center gap-3">
              Tap to View
              <Plus 
                className={`w-6 h-6 transition-transform duration-300 ${
                  isRotated ? 'rotate-45' : 'group-hover:rotate-45'
                }`} 
              />
            </span>
          </button>
        </div>
      </div>

      {/* Popup Overlay */}
      {showPopup && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-2xl shadow-2xl max-w-4xl max-h-[90vh] overflow-y-auto animate-scale-in">
            {/* Header */}
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-foreground">About SkillBridge Platform</h2>
              <button
                onClick={handleClosePopup}
                className="p-2 hover:bg-accent rounded-lg transition-colors group"
                aria-label="Close popup"
              >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* About SkillBridge */}
              <section className="bg-section-purple p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-purple-700 dark:text-purple-300">About SkillBridge</h3>
                <p className="text-muted-foreground leading-relaxed">
                  SkillBridge is an adaptive digital empowerment platform designed to bridge the gap between traditional education and industry demands. We provide personalized learning experiences that adapt to individual aptitudes and local job market needs.
                </p>
              </section>

              {/* Role of SkillBridge */}
              <section className="bg-section-blue p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">Role of SkillBridge</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Personalized Learning Paths</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Industry-Recognized Certifications</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Mentorship & Guidance</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Direct Job Access</span>
                  </div>
                </div>
              </section>

              {/* Establishment Date */}
              <section className="bg-section-green p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-green-700 dark:text-green-300">Establishment Date</h3>
                <p className="text-2xl font-bold text-green-600">Est. 2024</p>
                <p className="text-muted-foreground">Founded with a vision to democratize digital skills education across India.</p>
              </section>

              {/* Social Platforms */}
              <section className="bg-section-indigo p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Our Social Platforms</h3>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <Globe className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Website</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <Linkedin className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">LinkedIn</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <Instagram className="w-5 h-5 text-pink-500" />
                    <span className="font-medium">Instagram</span>
                  </div>
                </div>
              </section>

              {/* How SkillBridge Helps */}
              <section className="bg-section-orange p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-6 text-orange-700 dark:text-orange-300">How SkillBridge Helps</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <GraduationCap className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Students</h4>
                      <p className="text-sm text-muted-foreground">Access personalized courses, earn certificates, get mentorship, and find job opportunities.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Ind. Experts</h4>
                      <p className="text-sm text-muted-foreground">Share expertise, mentor students, and build professional networks as independent experts.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                      <Award className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Certifiers</h4>
                      <p className="text-sm text-muted-foreground">Verify achievements, issue digital certificates, and maintain industry standards.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                      <Briefcase className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Job Providers</h4>
                      <p className="text-sm text-muted-foreground">Post opportunities, find skilled candidates, and build talented teams.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* How to Use Platform */}
              <section className="bg-section-cyan p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-cyan-700 dark:text-cyan-300">How to Use This Platform</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">For New Users:</h4>
                    <p className="text-sm text-muted-foreground">Register with your role, complete verification, and start your journey.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">For Existing Users:</h4>
                    <p className="text-sm text-muted-foreground">Simply login with your credentials and continue where you left off.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Professional Roles:</h4>
                    <p className="text-sm text-muted-foreground">Ind. Experts, Certifiers, and Job Providers require manual verification for enhanced credibility.</p>
                  </div>
                </div>
              </section>

              {/* Role-Based Dashboard */}
              <section className="bg-section-rose p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-rose-700 dark:text-rose-300">Role-Based Dashboard Interface</h3>
                <p className="text-muted-foreground mb-4">Each role has a customized dashboard designed for their specific needs and workflows.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <GraduationCap className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <span className="text-sm font-medium">Student Portal</span>
                  </div>
                  <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <span className="text-sm font-medium">Ind. Expert Hub</span>
                  </div>
                  <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <span className="text-sm font-medium">Certifier Panel</span>
                  </div>
                  <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <Briefcase className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                    <span className="text-sm font-medium">Employer Dashboard</span>
                  </div>
                </div>
              </section>

              {/* About Us */}
              <section className="bg-section-yellow p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-yellow-700 dark:text-yellow-300">About Us</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We are committed to creating an inclusive digital ecosystem that empowers rural youth and women across India with relevant digital skills. Our adaptive platform ensures that learning is personalized, practical, and directly connected to real-world opportunities.
                </p>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RightPanel;