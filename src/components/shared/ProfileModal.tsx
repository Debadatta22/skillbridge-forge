import React, { useState } from 'react';
import { X, Upload, Save, User, Building, Award, Briefcase } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole, CertifierProfile, IndExpertProfile, JobProviderProfile } from '../../types/auth';
import { toast } from '@/hooks/use-toast';

interface ProfileModalProps {
  role: UserRole;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ role, onClose }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // Initialize profile data based on role
  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem(`${role}_profile_${user?.id}`);
    if (saved) return JSON.parse(saved);
    
    // Default profile structure based on role
    const base = {
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: '',
      location: '',
      bio: '',
      profileImage: null as string | null,
    };

    switch (role) {
      case 'certifier':
        return {
          ...base,
          aadhaarNumber: '',
          organizationName: '',
          accreditationDetails: '',
          website: '',
          establishedYear: '',
          certificationTypes: [] as string[],
          verificationLevel: 'Basic',
        };
      case 'indExpert':
        return {
          ...base,
          aadhaarNumber: '',
          organizationName: '',
          experience: '',
          specialization: '',
          expertise: [] as string[],
          linkedin: '',
          github: '',
          portfolio: '',
        };
      case 'jobprovider':
        return {
          ...base,
          aadhaarNumber: '',
          companyName: '',
          registrationNumber: '',
          industry: '',
          yearEstablished: '',
          headquarters: '',
          contactNumber: '',
          website: '',
          companySize: '',
          revenueRange: '',
          jobOpportunities: '',
          description: '',
          employeeCount: '',
        };
      default:
        return base;
    }
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 2MB",
          variant: "destructive",
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setProfileImage(imageUrl);
        setProfileData(prev => ({ ...prev, profileImage: imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayInput = (field: string, value: string) => {
    const array = value.split(',').map(item => item.trim()).filter(Boolean);
    setProfileData(prev => ({ ...prev, [field]: array }));
  };

  const handleSave = () => {
    // TODO: Connect to backend API
    // POST /api/profiles or PATCH /api/profiles/:id
    
    // For now, save to localStorage
    localStorage.setItem(`${role}_profile_${user?.id}`, JSON.stringify(profileData));
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    });
    
    setIsEditing(false);
  };

  const renderRoleSpecificFields = () => {
    switch (role) {
      case 'certifier':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Aadhaar Number</label>
                <input
                  type="text"
                  value={profileData.aadhaarNumber || ''}
                  onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Organization Name</label>
                <input
                  type="text"
                  value={profileData.organizationName || ''}
                  onChange={(e) => handleInputChange('organizationName', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Accreditation Details</label>
              <textarea
                value={profileData.accreditationDetails || ''}
                onChange={(e) => handleInputChange('accreditationDetails', e.target.value)}
                disabled={!isEditing}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Website</label>
                <input
                  type="url"
                  value={profileData.website || ''}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Established Year</label>
                <input
                  type="number"
                  value={profileData.establishedYear || ''}
                  onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Certification Types (comma-separated)</label>
              <input
                type="text"
                value={Array.isArray(profileData.certificationTypes) ? profileData.certificationTypes.join(', ') : ''}
                onChange={(e) => handleArrayInput('certificationTypes', e.target.value)}
                disabled={!isEditing}
                placeholder="e.g., Web Development, Data Science, AI/ML"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
              />
            </div>
          </>
        );

      case 'indExpert':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Aadhaar Number</label>
                <input
                  type="text"
                  value={profileData.aadhaarNumber || ''}
                  onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Organization/Company</label>
                <input
                  type="text"
                  value={profileData.organizationName || ''}
                  onChange={(e) => handleInputChange('organizationName', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Years of Experience</label>
                <input
                  type="number"
                  value={profileData.experience || ''}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Primary Specialization</label>
                <input
                  type="text"
                  value={profileData.specialization || ''}
                  onChange={(e) => handleInputChange('specialization', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Areas of Expertise (comma-separated)</label>
              <input
                type="text"
                value={Array.isArray(profileData.expertise) ? profileData.expertise.join(', ') : ''}
                onChange={(e) => handleArrayInput('expertise', e.target.value)}
                disabled={!isEditing}
                placeholder="e.g., React, Node.js, Machine Learning, Cloud Computing"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">LinkedIn Profile</label>
                <input
                  type="url"
                  value={profileData.linkedin || ''}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">GitHub Profile</label>
                <input
                  type="url"
                  value={profileData.github || ''}
                  onChange={(e) => handleInputChange('github', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Portfolio Website</label>
                <input
                  type="url"
                  value={profileData.portfolio || ''}
                  onChange={(e) => handleInputChange('portfolio', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                />
              </div>
            </div>
          </>
        );

      case 'jobprovider':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Aadhaar Number</label>
                <input
                  type="text"
                  value={profileData.aadhaarNumber || ''}
                  onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Company Name</label>
                <input
                  type="text"
                  value={profileData.companyName || ''}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Registration Number</label>
                <input
                  type="text"
                  value={profileData.registrationNumber || ''}
                  onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Industry</label>
                <input
                  type="text"
                  value={profileData.industry || ''}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Year Established</label>
                <input
                  type="number"
                  value={profileData.yearEstablished || ''}
                  onChange={(e) => handleInputChange('yearEstablished', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Company Size</label>
                <select
                  value={profileData.companySize || ''}
                  onChange={(e) => handleInputChange('companySize', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                >
                  <option value="">Select size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501-1000">501-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Revenue Range</label>
                <select
                  value={profileData.revenueRange || ''}
                  onChange={(e) => handleInputChange('revenueRange', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                >
                  <option value="">Select range</option>
                  <option value="0-1CR">₹0-1 Crore</option>
                  <option value="1-10CR">₹1-10 Crore</option>
                  <option value="10-50CR">₹10-50 Crore</option>
                  <option value="50-100CR">₹50-100 Crore</option>
                  <option value="100CR+">₹100+ Crore</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Headquarters</label>
                <input
                  type="text"
                  value={profileData.headquarters || ''}
                  onChange={(e) => handleInputChange('headquarters', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Contact Number</label>
                <input
                  type="tel"
                  value={profileData.contactNumber || ''}
                  onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Company Website</label>
              <input
                type="url"
                value={profileData.website || ''}
                onChange={(e) => handleInputChange('website', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Company Description</label>
              <textarea
                value={profileData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                disabled={!isEditing}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const getRoleIcon = () => {
    switch (role) {
      case 'certifier': return Award;
      case 'indExpert': return User;
      case 'jobprovider': return Briefcase;
      default: return User;
    }
  };

  const RoleIcon = getRoleIcon();

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 gradient-${role} rounded-lg flex items-center justify-center`}>
                <RoleIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Profile Information</h2>
                <p className="text-muted-foreground capitalize">{role.replace(/([A-Z])/g, ' $1').trim()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Edit Profile
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Profile Image Section */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center overflow-hidden">
                  {profileImage || profileData.profileImage ? (
                    <img
                      src={profileImage || profileData.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-white" />
                  )}
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
                    <Upload className="w-4 h-4 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">{profileData.fullName}</h3>
                <p className="text-muted-foreground">{profileData.email}</p>
              </div>
            </div>

            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b pb-2">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profileData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                />
              </div>
            </div>

            {/* Role-specific fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b pb-2">Professional Information</h3>
              {renderRoleSpecificFields()}
            </div>

            {/* Action buttons */}
            {isEditing && (
              <div className="flex gap-3 pt-6 border-t">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 border border-border rounded-lg text-foreground hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;