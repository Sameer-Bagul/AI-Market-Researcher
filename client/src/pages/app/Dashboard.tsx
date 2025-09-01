import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();
  
  const { data: studies = [], isLoading: studiesLoading } = useQuery({
    queryKey: ["/api/studies"],
  });

  const recentStudies = studies.slice(0, 3);
  const completedStudies = studies.filter((study: any) => study.status === "completed").length;
  const pendingStudies = studies.filter((study: any) => study.status === "pending").length;

  return (
    <div className="space-y-8 p-6 lg:p-10">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight" data-testid="dashboard-title">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-muted-foreground" data-testid="dashboard-subtitle">
          Here's an overview of your market research activities
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card data-testid="stats-card-total">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Studies</CardTitle>
            <span className="material-symbols-outlined text-muted-foreground">analytics</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="total-studies-count">
              {studiesLoading ? "..." : studies.length}
            </div>
            <p className="text-xs text-muted-foreground">
              All time research studies
            </p>
          </CardContent>
        </Card>

        <Card data-testid="stats-card-completed">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <span className="material-symbols-outlined text-green-500">check_circle</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="completed-studies-count">
              {studiesLoading ? "..." : completedStudies}
            </div>
            <p className="text-xs text-muted-foreground">
              Ready for analysis
            </p>
          </CardContent>
        </Card>

        <Card data-testid="stats-card-pending">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <span className="material-symbols-outlined text-orange-500">pending</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="pending-studies-count">
              {studiesLoading ? "..." : pendingStudies}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently processing
            </p>
          </CardContent>
        </Card>

        <Card data-testid="stats-card-credits">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credits Available</CardTitle>
            <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="credits-count">
              {user?.credits || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Research credits remaining
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Studies */}
        <Card data-testid="recent-studies-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Studies</CardTitle>
            <Link href="/app/studies">
              <Button variant="outline" size="sm" data-testid="view-all-studies">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {studiesLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="loading-skeleton h-16 rounded-lg"></div>
                ))}
              </div>
            ) : recentStudies.length > 0 ? (
              recentStudies.map((study: any) => (
                <div
                  key={study.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent transition-colors"
                  data-testid={`recent-study-${study.id}`}
                >
                  <div className="space-y-1">
                    <p className="font-medium" data-testid={`study-name-${study.id}`}>
                      {study.industryName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {study.companyType} • {study.reportScope}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        study.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : study.status === "pending"
                          ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {study.status}
                    </span>
                    <Link href={`/app/studies/${study.id}`}>
                      <Button variant="ghost" size="sm">
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <span className="material-symbols-outlined text-4xl mb-2 block">analytics</span>
                <p>No studies yet</p>
                <p className="text-sm">Create your first market research study</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card data-testid="quick-actions-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/app/new-study">
              <Button className="w-full justify-start" size="lg" data-testid="quick-action-new-study">
                <span className="material-symbols-outlined mr-3">add_circle</span>
                Create New Study
              </Button>
            </Link>
            
            <Link href="/app/studies">
              <Button variant="outline" className="w-full justify-start" size="lg" data-testid="quick-action-view-studies">
                <span className="material-symbols-outlined mr-3">list</span>
                View All Studies
              </Button>
            </Link>
            
            <Link href="/app/account">
              <Button variant="outline" className="w-full justify-start" size="lg" data-testid="quick-action-manage-account">
                <span className="material-symbols-outlined mr-3">settings</span>
                Manage Account
              </Button>
            </Link>
            
            <div className="p-4 bg-primary/10 rounded-lg">
              <h3 className="font-medium text-primary mb-2">Need More Credits?</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Purchase additional research credits to continue generating comprehensive market reports
              </p>
              <Link href="/app/account">
                <Button size="sm" data-testid="quick-action-buy-credits">
                  Buy Credits
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}