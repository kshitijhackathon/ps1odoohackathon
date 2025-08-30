import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Target, 
  Lightbulb, 
  Folder, 
  GraduationCap, 
  Award,
  FileText,
  Home,
  LogOut,
  Menu,
  X
} from "lucide-react";

interface ResumeData {
  template: number;
  personalInfo: {
    name: string;
    mobile: string;
    branch: string;
    email: string;
    enrollment: string;
    passingYear: string;
  };
  careerObjective: string;
  skills: string;
  projects: string;
  academicDetails: Array<{
    degree: string;
    passingYear: string;
    university: string;
    cgpa: string;
    specialization: string;
  }>;
  certificates: Array<{
    certificateName: string;
    certificateLink: string;
    validTill: string;
  }>;
}

interface ResumeVersion {
  id: string;
  title: string;
  template: number;
  lastUpdated: string;
}

export default function ResumeBuilder() {
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData>({
    template: 1,
    personalInfo: {
      name: "John Doe",
      mobile: "+91 9876543210",
      branch: "Computer Science",
      email: "john.doe@example.com",
      enrollment: "123456",
      passingYear: "2025"
    },
    careerObjective: "Aspiring Software Engineer with a passion for innovative technology.",
    skills: "JavaScript, React, Node.js",
    projects: "Project 1: Campus Portal, Project 2: Quiz App",
    academicDetails: [
      {
        degree: "",
        passingYear: "",
        university: "",
        cgpa: "",
        specialization: ""
      }
    ],
    certificates: [
      {
        certificateName: "",
        certificateLink: "",
        validTill: ""
      }
    ]
  });

  const [resumeVersions] = useState<ResumeVersion[]>([
    {
      id: "1",
      title: "Resume for Software Engineer",
      template: 1,
      lastUpdated: "2025-08-26"
    },
    {
      id: "2",
      title: "Resume for Data Analyst",
      template: 2,
      lastUpdated: "2025-08-20"
    }
  ]);

  const handleLogout = () => {
    window.location.href = '/';
  };

  const handleTemplateSelect = (templateNumber: number) => {
    setResumeData(prev => ({ ...prev, template: templateNumber }));
    toast({
      title: "Template Selected",
      description: `Template ${templateNumber} has been selected.`,
    });
  };

  const handlePersonalInfoChange = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const addAcademicEntry = () => {
    setResumeData(prev => ({
      ...prev,
      academicDetails: [
        ...prev.academicDetails,
        {
          degree: "",
          passingYear: "",
          university: "",
          cgpa: "",
          specialization: ""
        }
      ]
    }));
  };

  const updateAcademicEntry = (index: number, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      academicDetails: prev.academicDetails.map((entry, i) =>
        i === index ? { ...entry, [field]: value } : entry
      )
    }));
  };

  const addCertificate = () => {
    setResumeData(prev => ({
      ...prev,
      certificates: [
        ...prev.certificates,
        {
          certificateName: "",
          certificateLink: "",
          validTill: ""
        }
      ]
    }));
  };

  const updateCertificate = (index: number, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      certificates: prev.certificates.map((cert, i) =>
        i === index ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const handleReset = () => {
    setResumeData({
      template: 1,
      personalInfo: {
        name: "John Doe",
        mobile: "+91 9876543210",
        branch: "Computer Science",
        email: "john.doe@example.com",
        enrollment: "123456",
        passingYear: "2025"
      },
      careerObjective: "Aspiring Software Engineer with a passion for innovative technology.",
      skills: "JavaScript, React, Node.js",
      projects: "Project 1: Campus Portal, Project 2: Quiz App",
      academicDetails: [
        {
          degree: "",
          passingYear: "",
          university: "",
          cgpa: "",
          specialization: ""
        }
      ],
      certificates: [
        {
          certificateName: "",
          certificateLink: "",
          validTill: ""
        }
      ]
    });
    toast({
      title: "Form Reset",
      description: "All fields have been reset to default values.",
    });
  };

  const handleGenerateResume = () => {
    toast({
      title: "Resume Generated",
      description: "Your resume has been generated successfully!",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-purple-900 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Home className="h-6 w-6 text-purple-200" />
                <span className="font-semibold text-xl">Placement Tracker Portal</span>
              </div>
              <div className="flex space-x-4">
                <Button 
                  variant="ghost" 
                  className="text-white hover:bg-purple-800 transition-colors"
                  onClick={() => window.location.href = '/student-dashboard'}
                >
                  Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-white hover:bg-purple-800 transition-colors"
                  onClick={() => window.location.href = '/jobs'}
                >
                  Jobs
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-white hover:bg-purple-800 transition-colors"
                  onClick={() => window.location.href = '/practice-exam'}
                >
                  Practice & Exam
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-white bg-purple-700 hover:bg-purple-600 transition-colors"
                >
                  Resume builder
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-white hover:bg-purple-800 transition-colors"
                  onClick={() => window.location.href = '/leaderboard'}
                >
                  Leader-board
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-white hover:bg-purple-800 transition-colors"
                  onClick={() => window.location.href = '/history'}
                >
                  History
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white hover:bg-purple-800 transition-colors">
                Profile 👤
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-purple-200 text-purple-800 text-sm font-medium">
                  JD
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">John Doe</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-white hover:bg-purple-800 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Home className="h-5 w-5 text-purple-200" />
              <span className="font-semibold">Placement Tracker</span>
            </div>
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-purple-800"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 bg-purple-800 rounded-lg p-4 space-y-2">
              <Button 
                variant="ghost" 
                className="w-full text-white hover:bg-purple-700 justify-start"
                onClick={() => window.location.href = '/student-dashboard'}
              >
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-white hover:bg-purple-700 justify-start"
                onClick={() => window.location.href = '/jobs'}
              >
                Jobs
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-white hover:bg-purple-700 justify-start"
                onClick={() => window.location.href = '/practice-exam'}
              >
                Practice & Exam
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-white bg-purple-600 hover:bg-purple-500 justify-start"
              >
                Resume builder
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-white hover:bg-purple-700 justify-start"
                onClick={() => window.location.href = '/leaderboard'}
              >
                Leader-board
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-white hover:bg-purple-700 justify-start"
                onClick={() => window.location.href = '/history'}
              >
                History
              </Button>
              <div className="pt-2 border-t border-purple-600">
                <div className="flex items-center space-x-2 mb-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-purple-200 text-purple-800 text-xs">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">John Doe</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="w-full text-white hover:bg-purple-700 justify-start"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'cursive' }}>
            Dein gesamtes Unternehmen auf
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'cursive' }}>
            <span className="bg-yellow-300 px-2 rounded">einer Plattform</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600" style={{ fontFamily: 'cursive' }}>
            Einfach, effizient, und sogar{" "}
            <span className="text-blue-500 underline">erschwinglich!</span>
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Form */}
          <div className="xl:col-span-3 space-y-6">
            {/* Template Selection */}
            <Card className="border-2 border-purple-200 bg-white shadow-lg">
              <CardHeader className="bg-purple-50">
                <CardTitle className="flex items-center space-x-2 text-purple-800">
                  <FileText className="h-5 w-5" />
                  <span>Select a Resume Template</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[1, 2, 3].map((template) => (
                    <div key={template} className="text-center">
                      <div className="border-2 border-purple-300 rounded-lg p-4 mb-2 min-h-[100px] flex items-center justify-center bg-gradient-to-br from-purple-50 to-white">
                        <span className="font-semibold text-purple-700">Template {template}</span>
                      </div>
                      <Button
                        onClick={() => handleTemplateSelect(template)}
                        className={`w-full ${
                          resumeData.template === template
                            ? 'bg-purple-600 hover:bg-purple-700'
                            : 'bg-purple-500 hover:bg-purple-600'
                        } text-white transition-colors`}
                      >
                        Select Template
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card className="border-2 border-purple-200 bg-white shadow-lg">
              <CardHeader className="bg-purple-50">
                <CardTitle className="flex items-center space-x-2 text-purple-800">
                  <User className="h-5 w-5" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-purple-700 font-medium">Name</Label>
                    <Input
                      id="name"
                      value={resumeData.personalInfo.name}
                      onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                      className="border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mobile" className="text-purple-700 font-medium">Mobile</Label>
                    <Input
                      id="mobile"
                      value={resumeData.personalInfo.mobile}
                      onChange={(e) => handlePersonalInfoChange('mobile', e.target.value)}
                      className="border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="branch" className="text-purple-700 font-medium">Branch</Label>
                    <Input
                      id="branch"
                      value={resumeData.personalInfo.branch}
                      onChange={(e) => handlePersonalInfoChange('branch', e.target.value)}
                      className="border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-purple-700 font-medium">Email</Label>
                    <Input
                      id="email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                      className="border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="enrollment" className="text-purple-700 font-medium">Enrollment</Label>
                    <Input
                      id="enrollment"
                      value={resumeData.personalInfo.enrollment}
                      onChange={(e) => handlePersonalInfoChange('enrollment', e.target.value)}
                      className="border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="passingYear" className="text-purple-700 font-medium">Passing Year</Label>
                    <Input
                      id="passingYear"
                      value={resumeData.personalInfo.passingYear}
                      onChange={(e) => handlePersonalInfoChange('passingYear', e.target.value)}
                      className="border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Career Objective */}
            <Card className="border-2 border-purple-200 bg-white shadow-lg">
              <CardHeader className="bg-purple-50">
                <CardTitle className="flex items-center space-x-2 text-purple-800">
                  <Target className="h-5 w-5" />
                  <span>Career Objective</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Textarea
                  value={resumeData.careerObjective}
                  onChange={(e) => setResumeData(prev => ({ ...prev, careerObjective: e.target.value }))}
                  className="border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500 min-h-[100px] resize-none"
                  placeholder="Enter your career objective..."
                />
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="border-2 border-purple-200 bg-white shadow-lg">
              <CardHeader className="bg-purple-50">
                <CardTitle className="flex items-center space-x-2 text-purple-800">
                  <Lightbulb className="h-5 w-5" />
                  <span>Skills</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Textarea
                  value={resumeData.skills}
                  onChange={(e) => setResumeData(prev => ({ ...prev, skills: e.target.value }))}
                  className="border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500 min-h-[80px] resize-none"
                  placeholder="Enter your skills..."
                />
              </CardContent>
            </Card>

            {/* Projects */}
            <Card className="border-2 border-purple-200 bg-white shadow-lg">
              <CardHeader className="bg-purple-50">
                <CardTitle className="flex items-center space-x-2 text-purple-800">
                  <Folder className="h-5 w-5" />
                  <span>Projects</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Textarea
                  value={resumeData.projects}
                  onChange={(e) => setResumeData(prev => ({ ...prev, projects: e.target.value }))}
                  className="border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500 min-h-[80px] resize-none"
                  placeholder="Enter your projects..."
                />
              </CardContent>
            </Card>

            {/* Academic Details */}
            <Card className="border-2 border-purple-200 bg-white shadow-lg">
              <CardHeader className="bg-purple-50">
                <CardTitle className="flex items-center space-x-2 text-purple-800">
                  <GraduationCap className="h-5 w-5" />
                  <span>Academic Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 border-purple-300">
                        <th className="text-left p-2 text-purple-700 font-medium">Degree</th>
                        <th className="text-left p-2 text-purple-700 font-medium">Passing year</th>
                        <th className="text-left p-2 text-purple-700 font-medium">University</th>
                        <th className="text-left p-2 text-purple-700 font-medium">CGPA</th>
                        <th className="text-left p-2 text-purple-700 font-medium">Specialization</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resumeData.academicDetails.map((entry, index) => (
                        <tr key={index} className="border-b border-purple-200">
                          <td className="p-2">
                            <Input
                              value={entry.degree}
                              onChange={(e) => updateAcademicEntry(index, 'degree', e.target.value)}
                              className="border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                            />
                          </td>
                          <td className="p-2">
                            <Input
                              value={entry.passingYear}
                              onChange={(e) => updateAcademicEntry(index, 'passingYear', e.target.value)}
                              className="border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                            />
                          </td>
                          <td className="p-2">
                            <Input
                              value={entry.university}
                              onChange={(e) => updateAcademicEntry(index, 'university', e.target.value)}
                              className="border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                            />
                          </td>
                          <td className="p-2">
                            <Input
                              value={entry.cgpa}
                              onChange={(e) => updateAcademicEntry(index, 'cgpa', e.target.value)}
                              className="border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                            />
                          </td>
                          <td className="p-2">
                            <Input
                              value={entry.specialization}
                              onChange={(e) => updateAcademicEntry(index, 'specialization', e.target.value)}
                              className="border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Button
                  onClick={addAcademicEntry}
                  className="mt-4 bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                >
                  + Add Another Academic Entry
                </Button>
              </CardContent>
            </Card>

            {/* Additional Certificates */}
            <Card className="border-2 border-purple-200 bg-white shadow-lg">
              <CardHeader className="bg-purple-50">
                <CardTitle className="flex items-center space-x-2 text-purple-800">
                  <Award className="h-5 w-5" />
                  <span>Additional Certificates</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 border-purple-300">
                        <th className="text-left p-2 text-purple-700 font-medium">Certificate name</th>
                        <th className="text-left p-2 text-purple-700 font-medium">Link of certificate</th>
                        <th className="text-left p-2 text-purple-700 font-medium">Valid till</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resumeData.certificates.map((cert, index) => (
                        <tr key={index} className="border-b border-purple-200">
                          <td className="p-2">
                            <Input
                              value={cert.certificateName}
                              onChange={(e) => updateCertificate(index, 'certificateName', e.target.value)}
                              className="border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                            />
                          </td>
                          <td className="p-2">
                            <Input
                              value={cert.certificateLink}
                              onChange={(e) => updateCertificate(index, 'certificateLink', e.target.value)}
                              className="border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                            />
                          </td>
                          <td className="p-2">
                            <Input
                              value={cert.validTill}
                              onChange={(e) => updateCertificate(index, 'validTill', e.target.value)}
                              className="border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Button
                  onClick={addCertificate}
                  className="mt-4 bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                >
                  + Add Another additional certificate
                </Button>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                onClick={handleReset}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white transition-colors"
              >
                Reset
              </Button>
              <Button
                onClick={handleGenerateResume}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white transition-colors"
              >
                Generate Resume
              </Button>
            </div>
          </div>

          {/* Sidebar - Resume Versions */}
          <div className="xl:col-span-1">
            <Card className="border-2 border-purple-200 bg-white shadow-lg sticky top-4">
              <CardHeader className="bg-purple-50">
                <CardTitle className="flex items-center space-x-2 text-purple-800">
                  <Folder className="h-5 w-5" />
                  <span>Your Resume Versions</span>
                </CardTitle>
                <div className="flex items-center space-x-2 text-sm text-purple-600">
                  <span>←</span>
                  <span>keeps save your resume history</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {resumeVersions.map((version) => (
                  <Card key={version.id} className="border-2 border-purple-200 bg-white hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">{version.title}</h3>
                      <p className="text-sm text-gray-600">
                        Template {version.template} | Last Updated: {version.lastUpdated}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-purple-900 text-white p-6 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <span className="font-semibold text-xl">Placement Tracker Portal</span>
          </div>
          
          {/* Event Section */}
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                <span className="text-2xl">🇮🇳</span>
                <span className="text-gray-800 font-medium">Odoo x CGC Mohali Hackathon 2025</span>
                <span className="text-gray-600">Aug 30, 2025</span>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Registrieren →
              </Button>
            </div>
          </div>

          {/* App Icons */}
          <div className="flex justify-center space-x-6">
            {[
              { color: "from-purple-400 to-teal-400", icon: "%" },
              { color: "from-teal-400 to-purple-400", icon: "□" },
              { color: "from-blue-400 to-blue-600", icon: "~" },
              { color: "from-teal-400 to-purple-400", icon: "◆" },
              { color: "from-blue-400 to-blue-600", icon: "🔧" },
              { color: "from-orange-400 to-teal-400", icon: "↻" }
            ].map((app, index) => (
              <div
                key={index}
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${app.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
              >
                {app.icon}
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
