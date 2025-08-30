import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function StudentDashboard() {
  const [user] = useState({
    name: "John Doe",
    role: "Student"
  });

  const [appliedJobsCount, setAppliedJobsCount] = useState(5);

  useEffect(() => {
    // Get applied jobs count from localStorage
    const savedCount = localStorage.getItem('appliedJobsCount');
    if (savedCount) {
      setAppliedJobsCount(parseInt(savedCount, 10));
    }
  }, []);

  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="bg-primary text-primary-foreground p-4 rounded-lg m-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-bold" data-testid="nav-title">🏠 Placement Tracker Portal</h1>
            <div className="flex space-x-4">
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80 bg-primary/20" data-testid="nav-dashboard">
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                className="text-primary-foreground hover:bg-primary/80" 
                onClick={() => window.location.href = '/jobs'}
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

      {/* Welcome Message */}
      <div className="px-4 mb-6">
        <h2 className="text-2xl font-bold text-green-600 flex items-center" data-testid="welcome-message">
          Welcome, Student 👋
        </h2>
      </div>

      {/* Dashboard Cards */}
      <div className="px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Applied Jobs Card */}
          <Card className="border-2 border-green-400 bg-card hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <CardTitle className="text-lg font-semibold text-foreground" data-testid="card-applied-jobs-title">
                Applied Jobs
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-foreground mb-2" data-testid="applied-jobs-count">
                {appliedJobsCount}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Exams Card */}
          <Card className="border-2 border-orange-400 bg-card hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <CardTitle className="text-lg font-semibold text-orange-600" data-testid="card-upcoming-exams-title">
                Upcoming Exams
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2" data-testid="upcoming-exams-count">
                2
              </div>
            </CardContent>
          </Card>

          {/* Placement Status Card */}
          <Card className="border-2 border-red-400 bg-card hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <CardTitle className="text-lg font-semibold text-foreground" data-testid="card-placement-status-title">
                Placement Status
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Badge variant="destructive" className="text-lg px-4 py-2 font-bold" data-testid="placement-status">
                Not Placed
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-4 right-4">
        <Badge variant="secondary" className="bg-orange-200 text-orange-800 px-3 py-1" data-testid="footer-badge">
          Handmade Butterfly
        </Badge>
      </div>
    </div>
  );
}