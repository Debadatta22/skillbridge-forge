import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, User, Menu, X, Bell, Edit3 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types/auth';
import { getRoleColor, getRoleIcon, getRoleDisplayName } from '../../utils/roleHelpers';
import ProfileModal from './ProfileModal';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path: string;
}

interface RoleLayoutProps {
  role: UserRole;
  menuItems: MenuItem[];
  children?: React.ReactNode;
}

const RoleLayout: React.FC<RoleLayoutProps> = ({ role, menuItems, children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  const roleConfig = getRoleColor(role);
  const RoleIcon = getRoleIcon(role);
  const roleDisplayName = getRoleDisplayName(role);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50/30 to-purple-50/30 dark:from-background dark:via-blue-900/10 dark:to-purple-900/10">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b border-border shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md hover:bg-accent transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:block p-2 rounded-md hover:bg-accent transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className={`w-8 h-8 ${roleConfig.gradient} rounded-lg flex items-center justify-center`}>
                <RoleIcon className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-foreground">SkillBridge {roleDisplayName} Portal</h1>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile Button */}
              <button
                onClick={() => setShowProfileModal(true)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{user?.fullName}</span>
                <Edit3 className="w-3 h-3" />
              </button>
              
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 ${
          sidebarCollapsed ? 'w-16' : 'w-72'
        } bg-background/95 backdrop-blur-sm border-r border-border transition-all duration-300 ease-in-out`}>
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 lg:hidden">
              <span className="font-semibold text-foreground">Menu</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-md hover:bg-accent transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? `bg-primary/10 text-primary border border-primary/20 shadow-sm`
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  } ${sidebarCollapsed ? 'justify-center' : ''}`}
                  title={sidebarCollapsed ? item.label : ''}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          {children || <Outlet />}
        </main>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <ProfileModal
          role={role}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </div>
  );
};

export default RoleLayout;