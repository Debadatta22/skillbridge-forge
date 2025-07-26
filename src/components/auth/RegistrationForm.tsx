import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff, Building, GraduationCap, Award, Briefcase, Phone, Globe, MapPin, Calendar, Users as UsersIcon } from 'lucide-react';
import { UserRole, RegisterData } from '../../types/auth';
import { getRoleDisplayName, getRoleColor } from '../../utils/roleHelpers';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from '../../hooks/use-toast';

interface RegistrationFormProps {
  selectedRole: UserRole;
  onBackToRoleSelection: () => void;
  onBackToLogin: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ 
  selectedRole, 
  onBackToRoleSelection, 
  onBackToLogin 
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    aadhaarNumber: '',
    // Student fields
    collegeName: '',
    course: '',
    enrollmentReason: '',
    // Educator fields
    organizationName: '',
    experience: '',
    specialization: '',
    // Certifier fields
    accreditationDetails: '',
    website: '',
    // Job Provider fields
    companyName: '',
    registrationNumber: '',
    industry: '',
    yearEstablished: '',
    headquarters: '',
    contactNumber: '',
    companySize: '',
    revenueRange: '',
    jobOpportunities: '',
    description: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const roleColor = getRoleColor(selectedRole);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please check and try again.",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      let profileData: any = {
        aadhaarNumber: formData.aadhaarNumber,
      };

      switch (selectedRole) {
        case 'student':
          profileData = {
            ...profileData,
            collegeName: formData.collegeName,
            course: formData.course,
            enrollmentReason: formData.enrollmentReason,
          };
          break;
        case 'educator':
          profileData = {
            ...profileData,
            organizationName: formData.organizationName,
            experience: parseInt(formData.experience) || 0,
            specialization: formData.specialization,
          };
          break;
        case 'certifier':
          profileData = {
            ...profileData,
            organizationName: formData.organizationName,
            accreditationDetails: formData.accreditationDetails,
            website: formData.website,
          };
          break;
        case 'jobprovider':
          profileData = {
            ...profileData,
            companyName: formData.companyName,
            registrationNumber: formData.registrationNumber,
            industry: formData.industry,
            yearEstablished: parseInt(formData.yearEstablished) || 0,
            headquarters: formData.headquarters,
            contactNumber: formData.contactNumber,
            website: formData.website,
            companySize: formData.companySize,
            revenueRange: formData.revenueRange,
            jobOpportunities: formData.jobOpportunities,
            description: formData.description,
          };
          break;
      }

      const registerData: RegisterData = {
        role: selectedRole,
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        profileData,
      };

      await register(registerData);
      
      if (selectedRole !== 'student') {
        toast({
          title: "Registration Successful!",
          description: "Your account has been created. Please check your email for verification instructions.",
        });
      } else {
        toast({
          title: "Welcome to SkillBridge!",
          description: "Your account has been created successfully.",
        });
      }
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderRoleSpecificFields = () => {
    switch (selectedRole) {
      case 'student':
        return (
          <>
            <div className="relative">
              <label className="block text-sm font-medium mb-2">College/Institution Name</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.collegeName}
                  onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                  placeholder="Enter your college/institution name"
                  className="input-with-icon w-full"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-2">Course Enrolled/To Be Enrolled</label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  placeholder="e.g., Computer Science, Engineering, etc."
                  className="input-with-icon w-full"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Reason for Enrollment</label>
              <textarea
                value={formData.enrollmentReason}
                onChange={(e) => setFormData({ ...formData, enrollmentReason: e.target.value })}
                placeholder="Tell us why you want to join SkillBridge..."
                className="w-full p-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 min-h-[100px] resize-y"
                required
              />
            </div>
          </>
        );

      case 'educator':
        return (
          <>
            <div className="relative">
              <label className="block text-sm font-medium mb-2">Organization Name</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.organizationName}
                  onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                  placeholder="Enter your organization name"
                  className="input-with-icon w-full"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-2">Years of Experience</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="number"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="Enter years of experience"
                  className="input-with-icon w-full"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-2">Area of Specialization</label>
              <div className="relative">
                <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  placeholder="e.g., Web Development, Data Science, etc."
                  className="input-with-icon w-full"
                  required
                />
              </div>
            </div>
          </>
        );

      case 'certifier':
        return (
          <>
            <div className="relative">
              <label className="block text-sm font-medium mb-2">Certifying Organization</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.organizationName}
                  onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                  placeholder="Enter your organization name"
                  className="input-with-icon w-full"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Accreditation Details</label>
              <textarea
                value={formData.accreditationDetails}
                onChange={(e) => setFormData({ ...formData, accreditationDetails: e.target.value })}
                placeholder="Provide details about your accreditation and certification authority..."
                className="w-full p-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 min-h-[100px] resize-y"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-2">Official Website (Optional)</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://example.com"
                  className="input-with-icon w-full"
                />
              </div>
            </div>
          </>
        );

      case 'jobprovider':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium mb-2">Company Name</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Enter company name"
                    className="input-with-icon w-full"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium mb-2">Registration Number</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                    placeholder="Company registration number"
                    className="input-with-icon w-full"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium mb-2">Industry/Field</label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  placeholder="e.g., Technology, Healthcare, etc."
                  className="w-full p-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium mb-2">Year Established</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="number"
                    value={formData.yearEstablished}
                    onChange={(e) => setFormData({ ...formData, yearEstablished: e.target.value })}
                    placeholder="e.g., 2020"
                    className="input-with-icon w-full"
                    min="1900"
                    max="2024"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium mb-2">Headquarters Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.headquarters}
                    onChange={(e) => setFormData({ ...formData, headquarters: e.target.value })}
                    placeholder="City, State, Country"
                    className="input-with-icon w-full"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium mb-2">Official Contact Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="tel"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    placeholder="+91 12345 67890"
                    className="input-with-icon w-full"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-2">Official Website (Optional)</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://company.com"
                  className="input-with-icon w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Company Size</label>
                <select
                  value={formData.companySize}
                  onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                  className="w-full p-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Select company size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-1000">201-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Annual Revenue Range</label>
                <select
                  value={formData.revenueRange}
                  onChange={(e) => setFormData({ ...formData, revenueRange: e.target.value })}
                  className="w-full p-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Select revenue range</option>
                  <option value="<1CR">Less than 1 Crore</option>
                  <option value="1-10CR">1-10 Crore</option>
                  <option value="10-50CR">10-50 Crore</option>
                  <option value="50-100CR">50-100 Crore</option>
                  <option value="100CR+">100+ Crore</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Types of Job Opportunities</label>
              <textarea
                value={formData.jobOpportunities}
                onChange={(e) => setFormData({ ...formData, jobOpportunities: e.target.value })}
                placeholder="Describe the types of positions you typically hire for..."
                className="w-full p-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 min-h-[80px] resize-y"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Company Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Provide a brief description of your company and its mission..."
                className="w-full p-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 min-h-[100px] resize-y"
                required
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBackToRoleSelection}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Change role
          </button>
          <span className="text-muted-foreground">|</span>
          <button
            onClick={onBackToLogin}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to login
          </button>
        </div>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">
            Register as <span className={`${roleColor.gradient} bg-clip-text text-transparent`}>
              {getRoleDisplayName(selectedRole)}
            </span>
          </h1>
          <p className="text-muted-foreground">
            Create your SkillBridge account and start your journey
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Common Fields */}
        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter your full name"
                className="input-with-icon w-full"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                className="input-with-icon w-full"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium mb-2">Create Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Create password"
                  className="input-with-icon w-full pr-12"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Confirm password"
                  className="input-with-icon w-full pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-2">Aadhaar Number</label>
            <input
              type="text"
              value={formData.aadhaarNumber}
              onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
              placeholder="Enter your Aadhaar number"
              className="w-full p-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              required
              pattern="[0-9]{12}"
              maxLength={12}
            />
          </div>
        </div>

        {/* Role-specific fields */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {getRoleDisplayName(selectedRole)} Information
          </h3>
          {renderRoleSpecificFields()}
        </div>

        {/* Important Note for non-students */}
        {selectedRole !== 'student' && (
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">Important Note</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  As a {getRoleDisplayName(selectedRole)}, your account will require manual verification by our team. 
                  You will receive an email with your login credentials once verification is complete.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full ${roleColor.gradient} text-white py-3 rounded-lg font-medium hover-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300`}
        >
          {isLoading ? 'Creating Account...' : `Create ${getRoleDisplayName(selectedRole)} Account`}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;