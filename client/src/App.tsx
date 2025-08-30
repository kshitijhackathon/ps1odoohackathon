import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PlacementTracker from "@/pages/placement-tracker";
import StudentDashboard from "@/pages/student-dashboard";
import Jobs from "@/pages/jobs";
import JobDetails from "@/pages/job-details";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={PlacementTracker} />
      <Route path="/student-dashboard" component={StudentDashboard} />
      <Route path="/jobs" component={Jobs} />
      <Route path="/job-details/:id" component={JobDetails} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
