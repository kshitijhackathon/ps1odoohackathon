import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  badge: string;
  isCurrentUser?: boolean;
}

export default function Leaderboard() {
  const [user] = useState({
    name: "John Doe",
    role: "Student"
  });

  // Leaderboard data with current user highlighted
  const leaderboardData: LeaderboardEntry[] = [
    {
      rank: 0, // Special rank for current user
      name: "John Doe",
      score: 980,
      badge: "Your Rank",
      isCurrentUser: true
    },
    {
      rank: 1,
      name: "Alice Johnson",
      score: 980,
      badge: "Top Scorer"
    },
    {
      rank: 2,
      name: "Ravi Kumar",
      score: 940,
      badge: "Consistent Performer"
    },
    {
      rank: 3,
      name: "Priya Sharma",
      score: 910,
      badge: "Rising Star"
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
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Your Rank":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Top Scorer":
        return "bg-green-100 text-green-800 border-green-300";
      case "Consistent Performer":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Rising Star":
        return "bg-purple-100 text-purple-800 border-purple-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getRowColor = (entry: LeaderboardEntry) => {
    if (entry.isCurrentUser) {
      return "bg-yellow-50 border-2 border-yellow-400";
    }
    return "bg-card hover:bg-muted/50";
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
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80 bg-primary/20" data-testid="nav-leaderboard">
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
          Campus Leaderboard
        </h2>
        <p className="text-muted-foreground mt-2 text-sm" data-testid="page-subtitle">
          Current leaderboard student's rank to always appear at the top
        </p>
      </div>

      {/* Leaderboard Table */}
      <div className="px-4 mb-8">
        <Card>
          <CardContent className="p-0">
            {/* Table Header */}
            <div className="bg-blue-100 border-b border-border">
              <div className="grid grid-cols-4 gap-4 p-4 font-semibold text-blue-800">
                <div className="text-center" data-testid="header-rank">Rank</div>
                <div className="text-center" data-testid="header-student-name">Student Name</div>
                <div className="text-center" data-testid="header-score">Score</div>
                <div className="text-center" data-testid="header-badges">Badges</div>
              </div>
            </div>

            {/* Table Rows */}
            <div className="space-y-0">
              {leaderboardData.map((entry, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-4 gap-4 p-4 border-b border-border transition-colors ${getRowColor(entry)}`}
                  data-testid={`leaderboard-row-${index}`}
                >
                  {/* Rank */}
                  <div className="text-center font-medium" data-testid={`rank-${index}`}>
                    {entry.isCurrentUser ? "🏆" : entry.rank}
                  </div>

                  {/* Student Name */}
                  <div className="text-center font-medium" data-testid={`name-${index}`}>
                    {entry.name}
                  </div>

                  {/* Score */}
                  <div className="text-center font-medium" data-testid={`score-${index}`}>
                    {entry.score}
                  </div>

                  {/* Badge */}
                  <div className="text-center" data-testid={`badge-${index}`}>
                    <Badge 
                      className={`${getBadgeColor(entry.badge)} px-3 py-1 text-sm font-medium border`}
                    >
                      {entry.badge}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
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