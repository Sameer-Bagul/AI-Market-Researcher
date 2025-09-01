import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

// Marketing website components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Pricing from "@/pages/Pricing";
import AuthPage from "@/pages/AuthPage";
import NotFound from "@/pages/not-found";

// App components
import AppLayout from "@/components/AppLayout";
import Dashboard from "@/pages/app/Dashboard";
import Studies from "@/pages/app/Studies";
import StudyDetail from "@/pages/app/StudyDetail";
import NewStudy from "@/pages/app/NewStudy";
import Account from "@/pages/app/Account";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/auth";
      }, 500);
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="loading-skeleton w-16 h-16 rounded-full"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppLayout>
      <Component />
    </AppLayout>
  );
}

function AppRouter() {
  const [location] = useLocation();
  const isAppRoute = location.startsWith("/app");

  if (isAppRoute) {
    // App routes with protected layout
    return (
      <Switch>
        <Route path="/app">
          <ProtectedRoute component={Dashboard} />
        </Route>
        <Route path="/app/dashboard">
          <ProtectedRoute component={Dashboard} />
        </Route>
        <Route path="/app/studies">
          <ProtectedRoute component={Studies} />
        </Route>
        <Route path="/app/studies/:id">
          <ProtectedRoute component={StudyDetail} />
        </Route>
        <Route path="/app/new-study">
          <ProtectedRoute component={NewStudy} />
        </Route>
        <Route path="/app/account">
          <ProtectedRoute component={Account} />
        </Route>
        <Route component={NotFound} />
      </Switch>
    );
  }

  // Public marketing routes with header/footer
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/auth" component={AuthPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AppRouter />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
