export type UserRole = 'student' | 'educator' | 'certifier' | 'jobprovider';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  verified: boolean;
  profileData?: StudentProfile | EducatorProfile | CertifierProfile | JobProviderProfile;
}

export interface StudentProfile {
  aadhaarNumber: string;
  collegeName: string;
  course: string;
  enrollmentReason: string;
  selectedSkills?: string[];
}

export interface EducatorProfile {
  aadhaarNumber: string;
  organizationName: string;
  experience: number;
  specialization: string;
}

export interface CertifierProfile {
  aadhaarNumber: string;
  organizationName: string;
  accreditationDetails: string;
  website?: string;
}

export interface JobProviderProfile {
  aadhaarNumber: string;
  companyName: string;
  registrationNumber: string;
  industry: string;
  yearEstablished: number;
  headquarters: string;
  contactNumber: string;
  website?: string;
  companySize: string;
  revenueRange: string;
  jobOpportunities: string;
  description: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: UserRole;
  rememberMe?: boolean;
}

export interface RegisterData {
  role: UserRole;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  profileData: StudentProfile | EducatorProfile | CertifierProfile | JobProviderProfile;
}