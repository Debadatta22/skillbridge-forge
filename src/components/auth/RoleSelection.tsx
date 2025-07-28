import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { UserRole } from '../../types/auth';
import { getRoleIcon, getRoleDisplayName, getRoleDescription, getRoleColor } from '../../utils/roleHelpers';

interface RoleSelectionProps {
  onSelectRole: (role: UserRole) => void;
  onBackToLogin: () => void;
}

const roles: UserRole[] = ['student', 'indExpert', 'certifier', 'jobprovider'];

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole, onBackToLogin }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <button
          onClick={onBackToLogin}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to login
        </button>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-2">
            Choose Your Role
          </h1>
          <p className="text-muted-foreground">
            Select the role that best describes your purpose on SkillBridge
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role) => {
          const Icon = getRoleIcon(role);
          const roleColor = getRoleColor(role);
          
          return (
            <div
              key={role}
              className="group relative p-8 border border-border rounded-2xl hover:border-transparent transition-all duration-300 cursor-pointer hover:shadow-elegant"
              onClick={() => onSelectRole(role)}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 ${roleColor.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
              
              <div className="relative z-10 text-center">
                <div className={`inline-flex p-4 rounded-full ${roleColor.bgClass} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8" style={{ color: roleColor.primary }} />
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {getRoleDisplayName(role)}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {getRoleDescription(role)}
                </p>
                
                <button
                  className={`px-6 py-2 ${roleColor.gradient} text-white rounded-lg font-medium hover-glow transition-all duration-300`}
                >
                  Select {getRoleDisplayName(role)}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          Not sure which role fits you? You can always change this later in your profile settings.
        </p>
      </div>
    </div>
  );
};

export default RoleSelection;