import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

type Role = "student" | "company" | "tpo";
type View = "landing" | "registration" | "login" | "success";

interface FormErrors {
  [key: string]: string;
}

const roleConfigs = {
  student: {
    description: "Student Registration",
    fields: [
      { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter full name', required: true },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter email', required: true },
      { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter password', required: true },
      { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Enter password', required: true },
      { name: 'rollNumber', label: 'Roll Number', type: 'text', placeholder: 'Enter roll number', required: true },
      { name: 'branch', label: 'Branch', type: 'text', placeholder: 'Enter branch', required: true },
      { name: 'graduationYear', label: 'Graduation Year', type: 'text', placeholder: 'Enter graduation year', required: true }
    ]
  },
  company: {
    description: "Company Registration",
    fields: [
      { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter full name', required: true },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter email', required: true },
      { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter password', required: true },
      { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Enter password', required: true },
      { name: 'hrContact', label: 'HR Contact Person', type: 'text', placeholder: 'HR Contact Person', required: true },
      { name: 'contactNumber', label: 'Contact Number', type: 'tel', placeholder: 'Enter Contact Number', required: true }
    ]
  },
  tpo: {
    description: "TPO Registration",
    fields: [
      { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter full name', required: true },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter email', required: true },
      { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter password', required: true },
      { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Enter password', required: true },
      { name: 'instituteName', label: 'Institute Name', type: 'text', placeholder: 'Enter Institute Name', required: true },
      { name: 'contactNumber', label: 'Contact Number', type: 'tel', placeholder: 'Enter Contact Number', required: true }
    ]
  }
};

export default function PlacementTracker() {
  const [currentView, setCurrentView] = useState<View>("landing");
  const [currentRole, setCurrentRole] = useState<Role>("student");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const validateForm = (data: Record<string, string>, role: Role) => {
    const errors: FormErrors = {};
    const config = roleConfigs[role];
    
    config.fields.forEach(field => {
      const value = data[field.name];
      
      if (field.required && (!value || value.trim() === '')) {
        errors[field.name] = `${field.label} is required`;
      }
      
      if (field.name === 'email' && value && !validateEmail(value)) {
        errors[field.name] = 'Please enter a valid email address';
      }
      
      if (field.name === 'password' && value && !validatePassword(value)) {
        errors[field.name] = 'Password must be at least 6 characters long';
      }
      
      if (field.name === 'confirmPassword' && value && value !== data.password) {
        errors[field.name] = 'Passwords do not match';
      }
    });
    
    return errors;
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm(formData, currentRole);
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      const roleDisplayName = currentRole.charAt(0).toUpperCase() + currentRole.slice(1);
      setSuccessMessage(`${roleDisplayName} account created successfully!`);
      setCurrentView("success");
      setFormData({});
      setFormErrors({});
    }, 2000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const email = formData.loginEmail || '';
    const password = formData.loginPassword || '';
    
    setFormErrors({});
    let hasErrors = false;
    
    if (!email) {
      setFormErrors(prev => ({ ...prev, loginEmail: 'Email is required' }));
      hasErrors = true;
    } else if (!validateEmail(email)) {
      setFormErrors(prev => ({ ...prev, loginEmail: 'Please enter a valid email address' }));
      hasErrors = true;
    }
    
    if (!password) {
      setFormErrors(prev => ({ ...prev, loginPassword: 'Password is required' }));
      hasErrors = true;
    }
    
    if (hasErrors) return;
    
    setIsLoading(true);
    
    // Simulate API call with hardcoded credentials
    setTimeout(() => {
      setIsLoading(false);
      
      if (email === 'kshitijsingh066@gmail.com' && password === 'Kshitij@2004') {
        // Redirect to student dashboard after successful login
        if (currentRole === 'student') {
          window.location.href = '/student-dashboard';
        } else {
          const roleDisplayName = currentRole.charAt(0).toUpperCase() + currentRole.slice(1);
          setSuccessMessage(`Welcome back! You are logged in as ${roleDisplayName}.`);
          setCurrentView("success");
        }
        setFormData({});
        setFormErrors({});
      } else {
        setFormErrors({ loginEmail: 'Invalid email or password' });
      }
    }, 1500);
  };

  const showRegistration = (role: Role) => {
    setCurrentRole(role);
    setCurrentView("registration");
    setFormData({ role });
    setFormErrors({});
  };

  const showLogin = () => {
    setCurrentView("login");
    setFormData({});
    setFormErrors({});
  };

  const showLanding = () => {
    setCurrentView("landing");
    setFormData({});
    setFormErrors({});
  };

  const renderLandingPage = () => (
    <Card className="w-full max-w-md mx-auto" data-testid="landing-page">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold mb-2">Placement Tracker</CardTitle>
        <p className="text-muted-foreground">Choose your role to get started</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={() => showRegistration('student')} 
          className="w-full py-4 text-lg"
          data-testid="button-register-student"
        >
          Register as Student
        </Button>
        <Button 
          onClick={() => showRegistration('company')} 
          variant="secondary"
          className="w-full py-4 text-lg"
          data-testid="button-register-company"
        >
          Register as Company
        </Button>
        <Button 
          onClick={() => showRegistration('tpo')} 
          variant="outline"
          className="w-full py-4 text-lg"
          data-testid="button-register-tpo"
        >
          Register as TPO
        </Button>
        
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">Already have an account?</p>
          <Button 
            variant="link" 
            onClick={showLogin} 
            className="text-primary font-medium p-0 h-auto mt-1"
            data-testid="link-login"
          >
            Login here
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderRegistrationForm = () => {
    const config = roleConfigs[currentRole];
    
    return (
      <Card className="w-full max-w-md mx-auto" data-testid="registration-form">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold mb-2">Create Your Account</CardTitle>
          <p className="text-muted-foreground">{config.description}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegistration} className="space-y-4">
            {/* Role Selection */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Select Role</Label>
              <RadioGroup 
                value={currentRole} 
                onValueChange={(value) => setCurrentRole(value as Role)}
                className="flex space-x-6"
                data-testid="radio-group-role"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student" data-testid="radio-student" />
                  <Label htmlFor="student" className="text-sm">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="company" id="company" data-testid="radio-company" />
                  <Label htmlFor="company" className="text-sm">Company</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tpo" id="tpo" data-testid="radio-tpo" />
                  <Label htmlFor="tpo" className="text-sm">TPO</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Dynamic Form Fields */}
            {config.fields.map(field => (
              <div key={field.name}>
                <Label htmlFor={field.name} className="text-sm font-medium mb-2 block">
                  {field.label}
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  required={field.required}
                  className="w-full"
                  data-testid={`input-${field.name}`}
                />
                {formErrors[field.name] && (
                  <p className="error-message" data-testid={`error-${field.name}`}>
                    {formErrors[field.name]}
                  </p>
                )}
              </div>
            ))}

            <Button 
              type="submit" 
              className="w-full py-3 mt-6"
              disabled={isLoading}
              data-testid="button-create-account"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">Already have an account?</p>
            <Button 
              variant="link" 
              onClick={showLogin} 
              className="text-primary font-medium p-0 h-auto mt-1"
              data-testid="link-login-from-register"
            >
              Login here
            </Button>
          </div>

          <Button 
            variant="link" 
            onClick={showLanding} 
            className="mt-4 text-muted-foreground hover:text-foreground p-0 h-auto"
            data-testid="link-back-to-landing"
          >
            ← Back to role selection
          </Button>
        </CardContent>
      </Card>
    );
  };

  const renderLoginForm = () => (
    <Card className="w-full max-w-md mx-auto" data-testid="login-form">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold mb-2">Login to Placement Tracker</CardTitle>
        <p className="text-muted-foreground">Welcome back! Please sign in to continue</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Role Selection */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Select Role</Label>
            <RadioGroup 
              value={currentRole} 
              onValueChange={(value) => setCurrentRole(value as Role)}
              className="flex space-x-6"
              data-testid="radio-group-login-role"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="login-student" data-testid="radio-login-student" />
                <Label htmlFor="login-student" className="text-sm">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="company" id="login-company" data-testid="radio-login-company" />
                <Label htmlFor="login-company" className="text-sm">Company</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tpo" id="login-tpo" data-testid="radio-login-tpo" />
                <Label htmlFor="login-tpo" className="text-sm">TPO</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Email Field */}
          <div>
            <Label htmlFor="loginEmail" className="text-sm font-medium mb-2 block">Email</Label>
            <Input
              id="loginEmail"
              type="email"
              placeholder="Enter email"
              value={formData.loginEmail || ''}
              onChange={(e) => handleInputChange('loginEmail', e.target.value)}
              required
              className="w-full"
              data-testid="input-login-email"
            />
            {formErrors.loginEmail && (
              <p className="error-message" data-testid="error-login-email">
                {formErrors.loginEmail}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <Label htmlFor="loginPassword" className="text-sm font-medium mb-2 block">Password</Label>
            <Input
              id="loginPassword"
              type="password"
              placeholder="Enter password"
              value={formData.loginPassword || ''}
              onChange={(e) => handleInputChange('loginPassword', e.target.value)}
              required
              className="w-full"
              data-testid="input-login-password"
            />
            {formErrors.loginPassword && (
              <p className="error-message" data-testid="error-login-password">
                {formErrors.loginPassword}
              </p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full py-3 mt-6"
            disabled={isLoading}
            data-testid="button-login"
          >
            Login
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground">Don't have an account?</p>
          <Button 
            variant="link" 
            onClick={showLanding} 
            className="text-primary font-medium p-0 h-auto mt-1"
            data-testid="link-signup-from-login"
          >
            Sign up
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderSuccessPage = () => (
    <Card className="w-full max-w-md mx-auto" data-testid="success-page">
      <CardContent className="text-center pt-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2" data-testid="text-success-title">Welcome!</h2>
        <p className="text-muted-foreground mb-6" data-testid="text-success-message">{successMessage}</p>
        <Button 
          onClick={showLanding} 
          className="px-6"
          data-testid="button-go-back"
        >
          Go Back
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      {isLoading && <LoadingSpinner />}
      
      <div className="w-full max-w-md">
        {currentView === "landing" && renderLandingPage()}
        {currentView === "registration" && renderRegistrationForm()}
        {currentView === "login" && renderLoginForm()}
        {currentView === "success" && renderSuccessPage()}
      </div>
    </div>
  );
}
