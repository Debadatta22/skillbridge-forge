import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { FaGoogle, FaApple, FaGithub } from 'react-icons/fa';
import { UserRole } from '../../types/auth';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from '../../hooks/use-toast';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student' as UserRole,
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await login({
        email: formData.email,
        password: formData.password,
        role: formData.role,
        rememberMe: formData.rememberMe,
      });
      
      toast({
        title: "Welcome Back!",
        description: "You have successfully logged in.",
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: "Coming Soon",
      description: `${provider} login will be available soon!`,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-2">
          Welcome Back
        </h1>
        <p className="text-muted-foreground">
          Continue your learning journey with SkillBridge
        </p>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-3 mb-6">
        <button
          onClick={() => handleSocialLogin('Google')}
          className="w-full flex items-center justify-center gap-3 p-3 border border-border rounded-lg hover:bg-accent hover:shadow-md transition-all duration-200 group"
        >
          <FaGoogle className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Continue with Google</span>
        </button>
        
        <button
          onClick={() => handleSocialLogin('Apple')}
          className="w-full flex items-center justify-center gap-3 p-3 border border-border rounded-lg hover:bg-accent hover:shadow-md transition-all duration-200 group"
        >
          <FaApple className="w-5 h-5 text-gray-800 dark:text-white group-hover:scale-110 transition-transform" />
          <span className="font-medium">Continue with Apple</span>
        </button>
        
        <button
          onClick={() => handleSocialLogin('GitHub')}
          className="w-full flex items-center justify-center gap-3 p-3 border border-border rounded-lg hover:bg-accent hover:shadow-md transition-all duration-200 group"
        >
          <FaGithub className="w-5 h-5 text-gray-800 dark:text-white group-hover:scale-110 transition-transform" />
          <span className="font-medium">Continue with GitHub</span>
        </button>
      </div>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">Or continue with email</span>
        </div>
      </div>

      {/* Email Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Role Selection */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium mb-2">
            Select Your Role
          </label>
          <select
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
            className="w-full p-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          >
            <option value="student">Student</option>
            <option value="educator">Educator</option>
            <option value="certifier">Certifier</option>
            <option value="jobprovider">Job Provider</option>
          </select>
        </div>

        {/* Email Input */}
        <div className="relative">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              className="input-with-icon w-full"
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your password"
              className="input-with-icon w-full pr-12"
              required
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

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.rememberMe}
              onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
              className="w-4 h-4 text-primary focus:ring-primary border-border rounded"
            />
            <span className="text-sm text-muted-foreground">Remember me</span>
          </label>
          <button
            type="button"
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </button>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full gradient-primary text-white py-3 rounded-lg font-medium hover-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>

        {/* Create Account Link */}
        <div className="text-center mt-6">
          <span className="text-muted-foreground">Don't have an account? </span>
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-primary hover:underline font-medium"
          >
            Create new account
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;