import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ApplicationHistory {
  id: string;
  company: string;
  appliedDate: string;
  testScore?: string;
  stages: {
    applied: boolean;
    testQualified?: boolean;
    shortlisted?: boolean;
    interviewScheduled?: boolean;
    offerReceived?: boolean;
  };
}

export default function History() {
  const [user] = useState({
    name: "John Doe",
    role: "Student"
  });

  // Application history data matching the mockup
  const applicationHistory: ApplicationHistory[] = [
    {
      id: "1",
      company: "TechCorp Solutions",
      appliedDate: "2025-07-15",
      testScore: "85%",
      stages: {
        applied: true,
        testQualified: true,
        shortlisted: true,
        interviewScheduled: true
      }
    },
    {
      id: "2", 
      company: "InnovateX Labs",
      appliedDate: "2025-07-20",
      testScore: "92%",
      stages: {
        applied: true,
        testQualified: true,
        shortlisted: true,
        interviewScheduled: true,
        offerReceived: true
      }
    },
    {
      id: "3",
      company: "NextGen Software",
      appliedDate: "2025-08-01",
      stages: {
        applied: true
      }
    }
  ];

  const handleLogout = () => {
    window.location.href = "/";
  };

  const handleNavigation = (path: string) => {
    if (path === "dashboard") {
      window.location.href = "/student-dashboard";
    } else if (path === "jobs") {
      window.location.href = "/jobs";
    } else if (path === "practice") {
      window.location.href = "/practice-exam";
    } else if (path === "leaderboard") {
      window.location.href = "/leaderboard";
    }
  };

  const getStageColor = (stage: string, isActive: boolean) => {
    if (!isActive) return "bg-gray-300 text-gray-600";
    
    switch (stage) {
      case "applied":
        return "bg-gray-500 text-white";
      case "testQualified":
        return "bg-yellow-500 text-white";
      case "shortlisted":
        return "bg-blue-500 text-white";
      case "interviewScheduled":
        return "bg-green-500 text-white";
      case "offerReceived":
        return "bg-blue-400 text-white";
      default:
        return "bg-gray-300 text-gray-600";
    }
  };

  const getStageText = (stage: string) => {
    switch (stage) {
      case "applied":
        return "Applied";
      case "testQualified":
        return "Test Qualified";
      case "shortlisted":
        return "Shortlisted";
      case "interviewScheduled":
        return "Interview Scheduled";
      case "offerReceived":
        return "Offer Received";
      default:
        return stage;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
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
                className="text-primary-foreground hover:bg-primary/80" 
                onClick={() => handleNavigation("jobs")}
                data-testid="nav-jobs"
              >
                Jobs
              </Button>
              <Button 
                variant="ghost" 
                className="text-primary-foreground hover:bg-primary/80" 
                onClick={() => handleNavigation("practice")}
                data-testid="nav-practice"
              >
                Practice & Exam
              </Button>
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80" data-testid="nav-resume">
                Resume builder
              </Button>
              <Button 
                variant="ghost" 
                className="text-primary-foreground hover:bg-primary/80" 
                onClick={() => handleNavigation("leaderboard")}
                data-testid="nav-leaderboard"
              >
                Leader-board
              </Button>
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80 bg-primary/20" data-testid="nav-history">
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

      {/* Page Title */}
      <div className="px-4 mb-6">
        <h2 className="text-3xl font-bold text-orange-600 flex items-center" data-testid="page-title">
          <span className="mr-3">📋</span>
          Placement History Timeline
        </h2>
      </div>

      {/* Application History Timeline */}
      <div className="px-4 mb-8 space-y-6">
        {applicationHistory.map((application) => (
          <Card key={application.id} className="border-2 border-border bg-card" data-testid={`history-card-${application.id}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg font-semibold text-foreground" data-testid={`company-name-${application.id}`}>
                    {application.company}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1" data-testid={`applied-date-${application.id}`}>
                    Applied on: {formatDate(application.appliedDate)}
                  </p>
                </div>
                {application.testScore && (
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Test Score:</p>
                    <p className="text-lg font-bold text-foreground" data-testid={`test-score-${application.id}`}>
                      {application.testScore}
                    </p>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {/* Status Stages */}
              <div className="flex flex-wrap gap-2" data-testid={`status-stages-${application.id}`}>
                <Badge 
                  className={`px-3 py-1 text-sm font-medium ${getStageColor("applied", application.stages.applied)}`}
                  data-testid={`stage-applied-${application.id}`}
                >
                  {getStageText("applied")}
                </Badge>
                
                <Badge 
                  className={`px-3 py-1 text-sm font-medium ${getStageColor("testQualified", application.stages.testQualified || false)}`}
                  data-testid={`stage-test-qualified-${application.id}`}
                >
                  {getStageText("testQualified")}
                </Badge>
                
                <Badge 
                  className={`px-3 py-1 text-sm font-medium ${getStageColor("shortlisted", application.stages.shortlisted || false)}`}
                  data-testid={`stage-shortlisted-${application.id}`}
                >
                  {getStageText("shortlisted")}
                </Badge>
                
                <Badge 
                  className={`px-3 py-1 text-sm font-medium ${getStageColor("interviewScheduled", application.stages.interviewScheduled || false)}`}
                  data-testid={`stage-interview-scheduled-${application.id}`}
                >
                  {getStageText("interviewScheduled")}
                </Badge>
                
                {application.stages.offerReceived && (
                  <Badge 
                    className={`px-3 py-1 text-sm font-medium ${getStageColor("offerReceived", true)}`}
                    data-testid={`stage-offer-received-${application.id}`}
                  >
                    {getStageText("offerReceived")}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
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