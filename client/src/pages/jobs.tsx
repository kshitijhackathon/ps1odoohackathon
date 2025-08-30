import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  package: string;
  eligibility: string;
}

interface Application {
  company: string;
  role: string;
  status: 'Interview Scheduled' | 'Offer Received' | 'Applied';
}

export default function Jobs() {
  const [user] = useState({
    name: "John Doe",
    role: "Student"
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Sample job data
  const jobs: Job[] = [
    {
      id: "1",
      title: "Software Engineer",
      company: "Company 1",
      location: "Bangalore",
      package: "6-8 LPA",
      eligibility: "Any B.Tech CGPA: CS/IT"
    },
    {
      id: "2",
      title: "Software Engineer",
      company: "Company 2",
      location: "Bangalore",
      package: "6-8 LPA",
      eligibility: "Any B.Tech CGPA: CS/IT"
    },
    {
      id: "3",
      title: "Software Engineer",
      company: "Company 3",
      location: "Bangalore",
      package: "6-8 LPA",
      eligibility: "Any B.Tech CGPA: CS/IT"
    },
    {
      id: "4",
      title: "Software Engineer",
      company: "Company 4",
      location: "Bangalore",
      package: "6-8 LPA",
      eligibility: "Any B.Tech CGPA: CS/IT"
    },
    {
      id: "5",
      title: "Software Engineer",
      company: "Company 5",
      location: "Bangalore",
      package: "6-8 LPA",
      eligibility: "Any B.Tech CGPA: CS/IT"
    },
    {
      id: "6",
      title: "Software Engineer",
      company: "Company 6",
      location: "Bangalore",
      package: "6-8 LPA",
      eligibility: "Any B.Tech CGPA: CS/IT"
    }
  ];

  // Sample application data
  const applications: Application[] = [
    {
      company: "TechCorp",
      role: "Backend Developer",
      status: "Interview Scheduled"
    },
    {
      company: "FinTech Ltd",
      role: "Data Analyst",
      status: "Interview Scheduled"
    },
    {
      company: "MarketPro",
      role: "Marketing Intern",
      status: "Offer Received"
    }
  ];

  const handleLogout = () => {
    window.location.href = "/";
  };

  const handleNavigation = (path: string) => {
    if (path === "dashboard") {
      window.location.href = "/student-dashboard";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Interview Scheduled":
        return "bg-yellow-200 text-yellow-800";
      case "Offer Received":
        return "bg-green-200 text-green-800";
      default:
        return "bg-blue-200 text-blue-800";
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
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80 bg-primary/20" data-testid="nav-jobs">
                Jobs
              </Button>
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80" data-testid="nav-practice">
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

      {/* Search Filters */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <Input
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              data-testid="input-search-jobs"
            />
          </div>
          <div>
            <Select value={selectedDomain} onValueChange={setSelectedDomain}>
              <SelectTrigger data-testid="select-domain">
                <SelectValue placeholder="Domain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="software">Software</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="data">Data</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">Search by Domain</p>
          </div>
          <div>
            <Select value={selectedPackage} onValueChange={setSelectedPackage}>
              <SelectTrigger data-testid="select-package">
                <SelectValue placeholder="Package" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3-5">3-5 LPA</SelectItem>
                <SelectItem value="5-8">5-8 LPA</SelectItem>
                <SelectItem value="8+">8+ LPA</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">Search by Package</p>
          </div>
          <div>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger data-testid="select-location">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="gujarat">Gujarat</SelectItem>
                <SelectItem value="maharashtra">Maharashtra</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">Search by Location</p>
          </div>
        </div>
      </div>

      {/* Job Applications */}
      <div className="px-4 mb-8">
        <h2 className="text-2xl font-bold mb-4" data-testid="job-applications-title">Job Applications</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <Card key={job.id} className="border hover:shadow-lg transition-shadow" data-testid={`job-card-${job.id}`}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold" data-testid={`job-title-${job.id}`}>
                  {job.title} - {job.company}
                </CardTitle>
                <p className="text-sm text-muted-foreground" data-testid={`job-location-${job.id}`}>
                  {job.location} | {job.package}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4" data-testid={`job-eligibility-${job.id}`}>
                  Eligibility: {job.eligibility}
                </p>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    data-testid={`button-apply-${job.id}`}
                  >
                    Apply
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    data-testid={`button-view-details-${job.id}`}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* My Applications */}
      <div className="px-4 mb-8">
        <h2 className="text-2xl font-bold mb-4" data-testid="my-applications-title">My Applications</h2>
        <Card className="border">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary text-primary-foreground">
                  <tr>
                    <th className="text-left p-4 font-medium" data-testid="table-header-company">Company</th>
                    <th className="text-left p-4 font-medium" data-testid="table-header-role">Role</th>
                    <th className="text-left p-4 font-medium" data-testid="table-header-status">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, index) => (
                    <tr key={index} className="border-b border-border" data-testid={`application-row-${index}`}>
                      <td className="p-4" data-testid={`application-company-${index}`}>{app.company}</td>
                      <td className="p-4" data-testid={`application-role-${index}`}>{app.role}</td>
                      <td className="p-4">
                        <Badge 
                          className={getStatusColor(app.status)}
                          data-testid={`application-status-${index}`}
                        >
                          {app.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="fixed bottom-4 right-4">
        <Badge variant="secondary" className="bg-orange-200 text-orange-800 px-3 py-1" data-testid="footer-badge">
          Graceful Lyrebird
        </Badge>
      </div>
    </div>
  );
}