import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "wouter";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  fullName: string;
  enrollmentNumber: string;
  branch: string;
  passingYear: string;
  email: string;
  phone: string;
  resume: File | null;
  coverLetter: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ApplyJob() {
  const params = useParams();
  const jobId = params.id;
  const { toast } = useToast();
  
  const [user] = useState({
    name: "John Doe",
    role: "Student"
  });

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    enrollmentNumber: "",
    branch: "",
    passingYear: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: ""
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // Job titles for display
  const jobTitles: { [key: string]: string } = {
    "1": "Software Engineer at InnovateX",
    "2": "Data Analyst at DataWiz", 
    "3": "Frontend Developer at PixelSoft",
    "4": "Cloud Engineer at SkyNet Solutions",
    "5": "Cybersecurity Analyst at SecureNet",
    "6": "AI/ML Engineer at BrainTech"
  };

  const jobTitle = jobTitles[jobId || "1"] || "Job Application";

  const handleLogout = () => {
    window.location.href = "/";
  };

  const handleNavigation = (path: string) => {
    if (path === "dashboard") {
      window.location.href = "/student-dashboard";
    } else if (path === "jobs") {
      window.location.href = "/jobs";
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    
    if (file) {
      const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!validTypes.includes(file.type)) {
        setFormErrors(prev => ({ ...prev, resume: 'Please upload only PDF or Word documents' }));
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setFormErrors(prev => ({ ...prev, resume: 'File size should be less than 5MB' }));
        return;
      }
    }
    
    setFormData(prev => ({ ...prev, resume: file }));
    setFormErrors(prev => ({ ...prev, resume: '' }));
  };

  const validateForm = () => {
    const errors: FormErrors = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    if (!formData.enrollmentNumber.trim()) {
      errors.enrollmentNumber = 'Enrollment number is required';
    }
    
    if (!formData.branch) {
      errors.branch = 'Branch is required';
    }
    
    if (!formData.passingYear) {
      errors.passingYear = 'Passing year is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.resume) {
      errors.resume = 'Resume is required';
    }
    
    if (!formData.coverLetter.trim()) {
      errors.coverLetter = 'Cover letter is required';
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Update applied jobs count in localStorage
      const currentCount = parseInt(localStorage.getItem('appliedJobsCount') || '5', 10);
      localStorage.setItem('appliedJobsCount', (currentCount + 1).toString());
      
      toast({
        title: "Application Submitted Successfully!",
        description: `Your application for ${jobTitle} has been submitted.`,
      });
      
      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = "/student-dashboard";
      }, 2000);
    }, 2000);
  };

  const handleCancel = () => {
    window.location.href = "/jobs";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="bg-primary text-primary-foreground p-4 rounded-lg m-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-bold" data-testid="nav-title">🏠 Placement Tracker Portal</h1>
            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                className="text-primary-foreground hover:bg-primary/80" 
                onClick={() => handleNavigation("dashboard")}
                data-testid="nav-dashboard"
              >
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                className="text-primary-foreground hover:bg-primary/80 bg-primary/20" 
                onClick={() => handleNavigation("jobs")}
                data-testid="nav-jobs"
              >
                Jobs
              </Button>
              <Button 
                variant="ghost" 
                className="text-primary-foreground hover:bg-primary/80" 
                onClick={() => window.location.href = '/practice-exam'}
                data-testid="nav-practice"
              >
                Practice & Exam
              </Button>
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80" data-testid="nav-resume">
                Resume builder
              </Button>
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80" data-testid="nav-leaderboard">
                Leader-board
              </Button>
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80" data-testid="nav-history">
                History
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80" data-testid="nav-profile">
              Profile 👤
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary-foreground text-primary text-sm font-medium">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium" data-testid="nav-username">{user.name}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-primary-foreground hover:bg-primary/80"
              data-testid="button-logout"
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Application Form */}
      <div className="px-4 pb-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-xl text-orange-600" data-testid="form-title">
              <span>📄</span>
              <span>Apply for Job</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="mt-1"
                  data-testid="input-full-name"
                />
                {formErrors.fullName && (
                  <p className="text-destructive text-sm mt-1" data-testid="error-full-name">
                    {formErrors.fullName}
                  </p>
                )}
              </div>

              {/* Enrollment Number */}
              <div>
                <Label htmlFor="enrollmentNumber" className="text-sm font-medium">Enrollment Number</Label>
                <Input
                  id="enrollmentNumber"
                  type="text"
                  placeholder="Enter enrollment number"
                  value={formData.enrollmentNumber}
                  onChange={(e) => handleInputChange('enrollmentNumber', e.target.value)}
                  className="mt-1"
                  data-testid="input-enrollment-number"
                />
                {formErrors.enrollmentNumber && (
                  <p className="text-destructive text-sm mt-1" data-testid="error-enrollment-number">
                    {formErrors.enrollmentNumber}
                  </p>
                )}
              </div>

              {/* Branch */}
              <div>
                <Label htmlFor="branch" className="text-sm font-medium">Branch</Label>
                <Select value={formData.branch} onValueChange={(value) => handleInputChange('branch', value)}>
                  <SelectTrigger className="mt-1" data-testid="select-branch">
                    <SelectValue placeholder="-- Select Branch --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs">Computer Science</SelectItem>
                    <SelectItem value="it">Information Technology</SelectItem>
                    <SelectItem value="ece">Electronics & Communication</SelectItem>
                    <SelectItem value="ee">Electrical Engineering</SelectItem>
                    <SelectItem value="me">Mechanical Engineering</SelectItem>
                    <SelectItem value="ce">Civil Engineering</SelectItem>
                  </SelectContent>
                </Select>
                {formErrors.branch && (
                  <p className="text-destructive text-sm mt-1" data-testid="error-branch">
                    {formErrors.branch}
                  </p>
                )}
              </div>

              {/* Passing Year */}
              <div>
                <Label htmlFor="passingYear" className="text-sm font-medium">Passing Year</Label>
                <Select value={formData.passingYear} onValueChange={(value) => handleInputChange('passingYear', value)}>
                  <SelectTrigger className="mt-1" data-testid="select-passing-year">
                    <SelectValue placeholder="-- Select Year --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2027">2027</SelectItem>
                  </SelectContent>
                </Select>
                {formErrors.passingYear && (
                  <p className="text-destructive text-sm mt-1" data-testid="error-passing-year">
                    {formErrors.passingYear}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="mt-1"
                  data-testid="input-email"
                />
                {formErrors.email && (
                  <p className="text-destructive text-sm mt-1" data-testid="error-email">
                    {formErrors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="mt-1"
                  data-testid="input-phone"
                />
                {formErrors.phone && (
                  <p className="text-destructive text-sm mt-1" data-testid="error-phone">
                    {formErrors.phone}
                  </p>
                )}
              </div>

              {/* Resume Upload */}
              <div>
                <Label htmlFor="resume" className="text-sm font-medium">Resume</Label>
                <div className="mt-1 flex items-center space-x-2">
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    data-testid="input-resume"
                  />
                  <Label 
                    htmlFor="resume"
                    className="bg-muted hover:bg-muted/80 text-muted-foreground px-4 py-2 rounded-md cursor-pointer border border-border"
                    data-testid="button-choose-file"
                  >
                    Choose File
                  </Label>
                  <span className="text-sm text-muted-foreground" data-testid="file-status">
                    {formData.resume ? formData.resume.name : 'No file chosen'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Supported formats: PDF, DOC, DOCX (Max 5MB)
                </p>
                {formErrors.resume && (
                  <p className="text-destructive text-sm mt-1" data-testid="error-resume">
                    {formErrors.resume}
                  </p>
                )}
              </div>

              {/* Cover Letter */}
              <div>
                <Label htmlFor="coverLetter" className="text-sm font-medium">Cover Letter</Label>
                <Textarea
                  id="coverLetter"
                  placeholder="Write a short cover letter..."
                  value={formData.coverLetter}
                  onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                  className="mt-1 min-h-[120px]"
                  data-testid="textarea-cover-letter"
                />
                {formErrors.coverLetter && (
                  <p className="text-destructive text-sm mt-1" data-testid="error-cover-letter">
                    {formErrors.coverLetter}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-4">
                <Button 
                  type="button"
                  variant="outline" 
                  className="flex-1"
                  onClick={handleCancel}
                  disabled={isLoading}
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={isLoading}
                  data-testid="button-submit-application"
                >
                  {isLoading ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="pb-8">
        <Card className="mx-4 bg-primary text-primary-foreground">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-bold" data-testid="footer-title">Placement Tracker Portal</h3>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}