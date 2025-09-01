import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { useState } from "react";

export default function Studies() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: studies = [], isLoading } = useQuery({
    queryKey: ["/api/studies"],
  });

  const filteredStudies = studies.filter((study: any) =>
    study.industryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    study.companyType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    study.reportScope.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="space-y-6 p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight" data-testid="studies-title">
            Market Research Studies
          </h1>
          <p className="text-muted-foreground" data-testid="studies-subtitle">
            Manage and view all your market research studies
          </p>
        </div>
        <Link href="/app/new-study">
          <Button className="shrink-0" data-testid="create-new-study">
            <span className="material-symbols-outlined mr-2">add</span>
            New Study
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card data-testid="search-filters">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-3 text-muted-foreground">
                search
              </span>
              <Input
                placeholder="Search studies by industry, company type, or scope..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="search-studies"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="material-symbols-outlined">filter_list</span>
              <span>
                {filteredStudies.length} of {studies.length} studies
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Studies Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} data-testid={`loading-study-${i}`}>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="loading-skeleton h-6 w-3/4 rounded"></div>
                  <div className="loading-skeleton h-4 w-full rounded"></div>
                  <div className="loading-skeleton h-4 w-2/3 rounded"></div>
                  <div className="loading-skeleton h-8 w-20 rounded-full"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredStudies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudies.map((study: any) => (
            <Card
              key={study.id}
              className="hover:shadow-lg transition-shadow cursor-pointer group"
              data-testid={`study-card-${study.id}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-2" data-testid={`study-title-${study.id}`}>
                    {study.industryName}
                  </CardTitle>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0 ml-2 ${getStatusColor(
                      study.status
                    )}`}
                    data-testid={`study-status-${study.id}`}
                  >
                    {study.status}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">business</span>
                    <span data-testid={`study-company-type-${study.id}`}>{study.companyType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">public</span>
                    <span data-testid={`study-scope-${study.id}`}>{study.reportScope}</span>
                  </div>
                  {study.country && (
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      <span data-testid={`study-country-${study.id}`}>{study.country}</span>
                    </div>
                  )}
                  {study.region && (
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">map</span>
                      <span data-testid={`study-region-${study.id}`}>{study.region}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    <span data-testid={`study-date-${study.id}`}>
                      {new Date(study.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <Link href={`/app/studies/${study.id}`}>
                    <Button
                      variant={study.status === "completed" ? "default" : "outline"}
                      size="sm"
                      data-testid={`view-study-${study.id}`}
                    >
                      {study.status === "completed" ? (
                        <>
                          <span className="material-symbols-outlined mr-2 text-sm">visibility</span>
                          View Report
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined mr-2 text-sm">pending</span>
                          View Status
                        </>
                      )}
                    </Button>
                  </Link>
                  
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      data-testid={`study-actions-${study.id}`}
                    >
                      <span className="material-symbols-outlined">more_vert</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card data-testid="no-studies-card">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <span className="material-symbols-outlined text-6xl text-muted-foreground mb-4">
              analytics
            </span>
            <h3 className="text-xl font-semibold mb-2">
              {searchTerm ? "No studies found" : "No studies yet"}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              {searchTerm
                ? `No studies match your search "${searchTerm}". Try adjusting your search terms.`
                : "Start by creating your first market research study to unlock valuable industry insights."}
            </p>
            {!searchTerm && (
              <Link href="/app/new-study">
                <Button data-testid="create-first-study">
                  <span className="material-symbols-outlined mr-2">add</span>
                  Create Your First Study
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}