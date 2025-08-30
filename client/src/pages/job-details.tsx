import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useParams } from "wouter";

interface JobDetail {
  id: string;
  title: string;
  company: string;
  location: string;
  package: string;
  eligibility: string;
  deadline: string;
  overview: string;
  skills: string;
  fixedSalary: string;
  variableSalary: string;
  benefits: string;
  onlineTest: string;
  interview: string;
  finalOffer: string;
}

export default function JobDetails() {
  const params = useParams();
  const jobId = params.id;
  
  const [user] = useState({
    name: "John Doe",
    role: "Student"
  });

  // Job details data
  const jobDetails: { [key: string]: JobDetail } = {
    "1": {
      id: "1",
      title: "Software Engineer",
      company: "InnovateX",
      location: "Hyderabad",
      package: "12 LPA",
      eligibility: "CS/IT, CGPA 6.5+",
      deadline: "Oct 5, 2025",
      overview: "Build scalable applications and AI-powered tools. Work with global teams to deliver high-impact solutions.",
      skills: "Java, Spring Boot, SQL",
      fixedSalary: "9 LPA",
      variableSalary: "3 LPA",
      benefits: "Stock Options, Health Insurance",
      onlineTest: "Oct 12, 2025",
      interview: "Oct 18, 2025",
      finalOffer: "Oct 25, 2025"
    },
    "2": {
      id: "2",
      title: "Data Analyst",
      company: "DataWiz",
      location: "Pune",
      package: "8 LPA",
      eligibility: "CS/IT/Math/Stats, CGPA 7+",
      deadline: "Sept 28, 2025",
      overview: "Analyze large datasets, build dashboards, and help drive data-driven decisions.",
      skills: "Python, SQL, Power BI",
      fixedSalary: "6 LPA",
      variableSalary: "2 LPA",
      benefits: "Training Programs, Insurance",
      onlineTest: "Oct 2, 2025",
      interview: "Oct 6, 2025",
      finalOffer: "Oct 12, 2025"
    },
    "3": {
      id: "3",
      title: "Frontend Developer",
      company: "PixelSoft",
      location: "Bangalore",
      package: "9 LPA",
      eligibility: "CS/IT, CGPA 6+",
      deadline: "Oct 1, 2025",
      overview: "Develop modern web interfaces with a strong focus on UI/UX. Collaborate with designers and backend developers.",
      skills: "HTML, CSS, React, TypeScript",
      fixedSalary: "7 LPA",
      variableSalary: "2 LPA",
      benefits: "Flexible Work, Health Insurance",
      onlineTest: "Oct 7, 2025",
      interview: "Oct 11, 2025",
      finalOffer: "Oct 17, 2025"
    },
    "4": {
      id: "4",
      title: "Cloud Engineer",
      company: "SkyNet Solutions",
      location: "Chennai",
      package: "11 LPA",
      eligibility: "CS/IT/ECE, CGPA 7+",
      deadline: "Sept 25, 2025",
      overview: "Deploy and manage cloud infrastructure. Optimize costs and ensure security of cloud environments.",
      skills: "AWS, Azure, Docker, Kubernetes",
      fixedSalary: "8.5 LPA",
      variableSalary: "2.5 LPA",
      benefits: "Certification Sponsorship, Health Insurance",
      onlineTest: "Sept 29, 2025",
      interview: "Oct 4, 2025",
      finalOffer: "Oct 9, 2025"
    },
    "5": {
      id: "5",
      title: "Cybersecurity Analyst",
      company: "SecureNet",
      location: "Noida",
      package: "10 LPA",
      eligibility: "CS/IT, CGPA 6.5+",
      deadline: "Oct 8, 2025",
      overview: "Identify and mitigate security threats, perform penetration testing, and ensure compliance with global standards.",
      skills: "Linux, Python, Networking, Cybersecurity Tools",
      fixedSalary: "7.5 LPA",
      variableSalary: "2.5 LPA",
      benefits: "Insurance, Free Certifications",
      onlineTest: "Oct 12, 2025",
      interview: "Oct 17, 2025",
      finalOffer: "Oct 22, 2025"
    },
    "6": {
      id: "6",
      title: "AI/ML Engineer",
      company: "BrainTech",
      location: "Gurgaon",
      package: "15 LPA",
      eligibility: "CS/IT/AI/DS, CGPA 7.5+",
      deadline: "Oct 3, 2025",
      overview: "Work on cutting-edge machine learning models, NLP systems, and AI-driven solutions for global clients.",
      skills: "Python, TensorFlow, PyTorch, ML Algorithms",
      fixedSalary: "12 LPA",
      variableSalary: "3 LPA",
      benefits: "Health Insurance, Research Grants",
      onlineTest: "Oct 8, 2025",
      interview: "Oct 14, 2025",
      finalOffer: "Oct 20, 2025"
    }
  };

  const job = jobDetails[jobId || "1"];

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

  if (!job) {
    return <div>Job not found</div>;
  }

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

      {/* Breadcrumb */}
      <div className="px-4 mb-6">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground" data-testid="breadcrumb">
          <span>→ Home</span>
          <span>&gt;</span>
          <span>Jobs</span>
          <span>&gt;</span>
          <span className="text-foreground font-medium">{job.title} @ {job.company}</span>
        </div>
      </div>

      {/* Job Title */}
      <div className="px-4 mb-6">
        <Card className="border-2 border-primary">
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold mb-4" data-testid="job-title">{job.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <span>📘</span>
                <span><strong>Company:</strong> {job.company}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🎯</span>
                <span><strong>Eligibility:</strong> {job.eligibility}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📍</span>
                <span><strong>Location:</strong> {job.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>⏳</span>
                <span><strong>Deadline:</strong> {job.deadline}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>💰</span>
                <span><strong>Package:</strong> {job.package}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job Details Sections */}
      <div className="px-4 space-y-6">
        {/* Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2" data-testid="overview-title">
              <span>💎</span>
              <span>Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground" data-testid="overview-content">{job.overview}</p>
          </CardContent>
        </Card>

        {/* Skills & Eligibility */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2" data-testid="skills-title">
              <span>💎</span>
              <span>Skills & Eligibility</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="font-medium">- Skills: </span>
              <span className="text-muted-foreground" data-testid="skills-content">{job.skills}</span>
            </div>
            <div>
              <span className="font-medium">- Eligibility: </span>
              <span className="text-muted-foreground" data-testid="eligibility-content">{job.eligibility}</span>
            </div>
          </CardContent>
        </Card>

        {/* Compensation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2" data-testid="compensation-title">
              <span>💎</span>
              <span>Compensation</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Fixed: </span>
              <span className="text-muted-foreground" data-testid="fixed-salary">{job.fixedSalary}</span>
            </div>
            <div>
              <span className="font-medium">Variable: </span>
              <span className="text-muted-foreground" data-testid="variable-salary">{job.variableSalary}</span>
            </div>
            <div>
              <span className="font-medium">Other Benefits: </span>
              <span className="text-muted-foreground" data-testid="benefits">{job.benefits}</span>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2" data-testid="timeline-title">
              <span>💎</span>
              <span>Timeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Online Test: </span>
              <span className="text-muted-foreground" data-testid="online-test">{job.onlineTest}</span>
            </div>
            <div>
              <span className="font-medium">Interview: </span>
              <span className="text-muted-foreground" data-testid="interview-date">{job.interview}</span>
            </div>
            <div>
              <span className="font-medium">Final Offer: </span>
              <span className="text-muted-foreground" data-testid="final-offer">{job.finalOffer}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-8">
        <div className="flex space-x-4 justify-center">
          <Button 
            variant="outline" 
            className="px-8"
            data-testid="button-save-job"
          >
            Save Jobs
          </Button>
          <Button 
            className="px-8"
            onClick={() => window.location.href = `/apply-job/${jobId}`}
            data-testid="button-apply-now"
          >
            Apply Now
          </Button>
          <Button 
            variant="outline" 
            className="px-8"
            onClick={() => window.location.href = '/jobs'}
            data-testid="button-back-to-jobs"
          >
            ← Back to Jobs
          </Button>
        </div>
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