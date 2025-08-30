import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface MockTest {
  id: string;
  title: string;
  duration: string;
  questions: number;
  topics: string;
  difficulty: string;
  buttonText: string;
}

export default function PracticeExam() {
  const [user] = useState({
    name: "John Doe",
    role: "Student"
  });

  const [activeTab, setActiveTab] = useState("practice");

  const mockTests: MockTest[] = [
    {
      id: "1",
      title: "Aptitude Test - Beginner",
      duration: "30 mins",
      questions: 20,
      topics: "Quantitative, Logical Reasoning",
      difficulty: "Recommended",
      buttonText: "Start test"
    },
    {
      id: "2", 
      title: "Aptitude Test - Advanced",
      duration: "60 mins",
      questions: 40,
      topics: "Quantitative, Logical Reasoning, Data Interpretation",
      difficulty: "Advanced",
      buttonText: "Start test"
    },
    {
      id: "3",
      title: "Coding Test - JavaScript",
      duration: "45 mins",
      questions: 5,
      topics: "Algorithms, Data Structures",
      difficulty: "Intermediate",
      buttonText: "Start test"
    },
    {
      id: "4",
      title: "Mock Interview Preparation",
      duration: "20-30 mins",
      questions: 0,
      topics: "HR & Technical Interview Practice",
      difficulty: "Interview Prep",
      buttonText: "Start Mock Interview"
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
    }
  };

  const handleStartTest = (testId: string) => {
    window.location.href = `/test/${testId}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Recommended":
        return "text-green-600";
      case "Advanced":
        return "text-red-600";
      case "Intermediate":
        return "text-blue-600";
      case "Interview Prep":
        return "text-purple-600";
      default:
        return "text-muted-foreground";
    }
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
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80 bg-primary/20" data-testid="nav-practice">
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

      {/* Page Title */}
      <div className="px-4 mb-6">
        <h2 className="text-3xl font-bold text-orange-600 flex items-center" data-testid="page-title">
          <span className="mr-3">📋</span>
          Practice & Exam
        </h2>
      </div>

      {/* Tab Navigation */}
      <div className="px-4 mb-6">
        <div className="flex border-b border-border">
          <Button
            variant={activeTab === "practice" ? "default" : "ghost"}
            className={`px-6 py-3 ${activeTab === "practice" ? "border-b-2 border-green-500" : ""}`}
            onClick={() => setActiveTab("practice")}
            data-testid="tab-practice"
          >
            Practice & Mock up Exam
          </Button>
          <Button
            variant={activeTab === "company" ? "default" : "ghost"}
            className={`px-6 py-3 ${activeTab === "company" ? "border-b-2 border-green-500" : ""}`}
            onClick={() => setActiveTab("company")}
            data-testid="tab-company"
          >
            Company's Test
          </Button>
        </div>
      </div>

      {/* Available Mock Tests */}
      <div className="px-4 mb-8">
        <h3 className="text-xl font-bold mb-4" data-testid="section-title">Available Mock Tests</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockTests.map((test) => (
            <Card key={test.id} className="border-2 border-border hover:shadow-lg transition-shadow" data-testid={`test-card-${test.id}`}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold" data-testid={`test-title-${test.id}`}>
                  {test.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium" data-testid={`test-duration-${test.id}`}>{test.duration}</span>
                  </div>
                  {test.questions > 0 && (
                    <div className="flex justify-between">
                      <span>Questions:</span>
                      <span className="font-medium" data-testid={`test-questions-${test.id}`}>{test.questions}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Topics:</span>
                    <span className="font-medium text-right max-w-[200px]" data-testid={`test-topics-${test.id}`}>{test.topics}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <Badge className={getDifficultyColor(test.difficulty)} data-testid={`test-difficulty-${test.id}`}>
                    {test.difficulty}
                  </Badge>
                  <Button 
                    onClick={() => handleStartTest(test.id)}
                    className="px-6"
                    data-testid={`button-start-test-${test.id}`}
                  >
                    {test.buttonText}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
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