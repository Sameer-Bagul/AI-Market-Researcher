import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import type { Study } from "@shared/schema";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';

export default function StudyDetail() {
  const [match, params] = useRoute("/app/studies/:id");
  const studyId = params?.id;

  const { data: study, isLoading, error } = useQuery<Study>({
    queryKey: ["/api/studies", studyId],
    enabled: !!studyId,
  });

  if (isLoading) {
    return (
      <div className="space-y-6 p-6 lg:p-10">
        <div className="loading-skeleton h-8 w-64 rounded"></div>
        <div className="loading-skeleton h-96 w-full rounded-lg"></div>
      </div>
    );
  }

  if (error || !study) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-6">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <span className="material-symbols-outlined text-6xl text-muted-foreground mb-4 block">
              error
            </span>
            <h2 className="text-xl font-semibold mb-2">Study Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The requested study could not be found or you don't have access to it.
            </p>
            <Link href="/app/studies">
              <Button>Back to Studies</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "generating":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const apiResponse = study.apiResponse as any;

  // Colors for charts
  const COLORS = ['#1313ec', '#3b82f6', '#8b5cf6', '#ef4444', '#f59e0b', '#10b981', '#ec4899', '#f97316'];

  // Prepare market size data for chart
  const prepareMarketSizeData = () => {
    if (!apiResponse?.[1]?.marketEstimate) return [];
    
    const historicData = apiResponse[1].marketEstimate["Historic Market Size"]?.map((item: any) => ({
      year: item.year,
      marketSize: parseFloat(item.marketSize),
      type: 'Historic'
    })) || [];
    
    const futureData = apiResponse[1].marketEstimate["Future Market Estimate"]?.map((item: any) => ({
      year: item.year,
      marketSize: parseFloat(item.marketSize),
      type: 'Forecast'
    })) || [];
    
    return [...historicData, ...futureData].sort((a, b) => a.year - b.year);
  };

  // Prepare competitor market share data
  const prepareCompetitorData = () => {
    if (!apiResponse?.[2]?.competitorAnalysis) return [];
    
    return apiResponse[2].competitorAnalysis.map((competitor: any) => ({
      name: competitor.name,
      marketShare: parseFloat(competitor["market share percentage"]?.value || 0)
    }));
  };

  // Prepare regional market data
  const prepareRegionalData = () => {
    if (!apiResponse?.[4]?.marketSegmentation?.["By Region"]) return [];
    
    return apiResponse[4].marketSegmentation["By Region"].map((region: any) => ({
      region: region["Region Name"],
      marketShare: parseFloat(region["Market Share"]?.[0]?.value || 0)
    }));
  };

  return (
    <div className="space-y-6 p-6 lg:p-10">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Link href="/app/studies">
              <Button variant="ghost" size="sm" data-testid="back-to-studies">
                <span className="material-symbols-outlined mr-2">arrow_back</span>
                Back to Studies
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight" data-testid="study-detail-title">
            {study.industryName}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">business</span>
              {study.companyType}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">public</span>
              {study.reportScope}
            </span>
            {study.country && (
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">location_on</span>
                {study.country}
              </span>
            )}
            {study.region && (
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">map</span>
                {study.region}
              </span>
            )}
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">schedule</span>
              {study.createdAt ? new Date(study.createdAt).toLocaleDateString() : 'N/A'}
            </span>
          </div>
        </div>
        <Badge className={getStatusColor(study.status || 'pending')} data-testid="study-status">
          {study.status || 'pending'}
        </Badge>
      </div>

      {/* Study Content */}
      {study.status === "completed" || study.status === "Completed" ? (
        apiResponse ? (
        <Tabs defaultValue="executive-summary" className="space-y-6" data-testid="study-tabs">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="executive-summary" data-testid="tab-executive-summary">
              Executive Summary
            </TabsTrigger>
            <TabsTrigger value="market-estimate" data-testid="tab-market-estimate">
              Market Estimate
            </TabsTrigger>
            <TabsTrigger value="competitor-analysis" data-testid="tab-competitor-analysis">
              Competitor Analysis
            </TabsTrigger>
            <TabsTrigger value="growth-trends" data-testid="tab-growth-trends">
              Growth Trends
            </TabsTrigger>
            <TabsTrigger value="segmentation" data-testid="tab-segmentation">
              Market Segmentation
            </TabsTrigger>
          </TabsList>

          {/* Executive Summary Tab */}
          <TabsContent value="executive-summary" data-testid="content-executive-summary">
            <Card>
              <CardHeader>
                <CardTitle>Executive Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {apiResponse?.[0]?.executiveSummary && (
                  <>
                    <div>
                      <h3 className="font-semibold mb-2">Market Definition</h3>
                      <p className="text-muted-foreground">{apiResponse[0].executiveSummary["Market Definition"]}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">History of the Market</h3>
                      <p className="text-muted-foreground">{apiResponse[0].executiveSummary["History of the Market"]}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Market Dynamics</h3>
                      <p className="text-muted-foreground">{apiResponse[0].executiveSummary["Market Dynamics"]}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Key Findings</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {apiResponse[0].executiveSummary["Key findings"]?.map((finding: string, index: number) => (
                          <li key={index}>{finding}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Market Estimate Tab */}
          <TabsContent value="market-estimate" data-testid="content-market-estimate">
            <Card>
              <CardHeader>
                <CardTitle>Market Estimate</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {apiResponse?.[1]?.marketEstimate && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="font-semibold mb-2">Current Market Size</h3>
                        <p className="text-muted-foreground">{apiResponse[1].marketEstimate["Current Market Size"]}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">CAGR</h3>
                        <p className="text-muted-foreground">{apiResponse[1].marketEstimate.CAGR}</p>
                      </div>
                    </div>
                    
                    {prepareMarketSizeData().length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-4">Market Size Trend</h3>
                        <div className="w-full h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={prepareMarketSizeData()}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="year" />
                              <YAxis />
                              <Tooltip formatter={(value: any) => [`$${value}B`, 'Market Size']} />
                              <Line 
                                type="monotone" 
                                dataKey="marketSize" 
                                stroke="#1313ec" 
                                strokeWidth={2}
                                dot={{ fill: '#1313ec', strokeWidth: 2, r: 4 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Competitor Analysis Tab */}
          <TabsContent value="competitor-analysis" data-testid="content-competitor-analysis">
            <div className="space-y-6">
              {prepareCompetitorData().length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Market Share Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={prepareCompetitorData()}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: ${value}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="marketShare"
                          >
                            {prepareCompetitorData().map((entry: any, index: number) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: any) => [`${value}%`, 'Market Share']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {apiResponse?.[2]?.competitorAnalysis?.map((competitor: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{competitor.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Market Share</h4>
                        <p className="text-muted-foreground">
                          {competitor["market share percentage"]?.value}% ({competitor["market share in amount"]?.value} {competitor["market share in amount"]?.unit})
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Overview</h4>
                        <p className="text-muted-foreground">{competitor.overview}</p>
                      </div>
                    </div>
                    {competitor.swot && (
                      <div>
                        <h4 className="font-semibold mb-2">SWOT Analysis</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-sm font-medium text-green-600 mb-1">Strengths</h5>
                            <ul className="text-sm text-muted-foreground">
                              {competitor.swot.strengths?.map((item: string, i: number) => (
                                <li key={i}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-red-600 mb-1">Weaknesses</h5>
                            <ul className="text-sm text-muted-foreground">
                              {competitor.swot.weaknesses?.map((item: string, i: number) => (
                                <li key={i}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-blue-600 mb-1">Opportunities</h5>
                            <ul className="text-sm text-muted-foreground">
                              {competitor.swot.opportunities?.map((item: string, i: number) => (
                                <li key={i}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-orange-600 mb-1">Threats</h5>
                            <ul className="text-sm text-muted-foreground">
                              {competitor.swot.threats?.map((item: string, i: number) => (
                                <li key={i}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Growth Trends Tab */}
          <TabsContent value="growth-trends" data-testid="content-growth-trends">
            <div className="space-y-6">
              {apiResponse?.[3]?.marketGrowthTrends?.swotAnalysis && (
                <Card>
                  <CardHeader>
                    <CardTitle>SWOT Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">Strengths</h4>
                      <p className="text-muted-foreground text-sm">{apiResponse[3].marketGrowthTrends.swotAnalysis.strengths}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-600 mb-2">Weaknesses</h4>
                      <p className="text-muted-foreground text-sm">{apiResponse[3].marketGrowthTrends.swotAnalysis.weaknesses}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">Opportunities</h4>
                      <p className="text-muted-foreground text-sm">{apiResponse[3].marketGrowthTrends.swotAnalysis.opportunities}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-600 mb-2">Threats</h4>
                      <p className="text-muted-foreground text-sm">{apiResponse[3].marketGrowthTrends.swotAnalysis.threats}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {apiResponse?.[3]?.marketGrowthTrends?.pestelAnalysis && (
                <Card>
                  <CardHeader>
                    <CardTitle>PESTEL Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Political</h4>
                      <p className="text-muted-foreground text-sm">{apiResponse[3].marketGrowthTrends.pestelAnalysis.political}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Economic</h4>
                      <p className="text-muted-foreground text-sm">{apiResponse[3].marketGrowthTrends.pestelAnalysis.economic}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Social</h4>
                      <p className="text-muted-foreground text-sm">{apiResponse[3].marketGrowthTrends.pestelAnalysis.social}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Technological</h4>
                      <p className="text-muted-foreground text-sm">{apiResponse[3].marketGrowthTrends.pestelAnalysis.technological}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Environmental</h4>
                      <p className="text-muted-foreground text-sm">{apiResponse[3].marketGrowthTrends.pestelAnalysis.environmental}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Legal</h4>
                      <p className="text-muted-foreground text-sm">{apiResponse[3].marketGrowthTrends.pestelAnalysis.legal}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Market Segmentation Tab */}
          <TabsContent value="segmentation" data-testid="content-segmentation">
            <div className="space-y-6">
              {apiResponse?.[4]?.marketSegmentation?.["By Segment"] && (
                <Card>
                  <CardHeader>
                    <CardTitle>By Segment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {apiResponse[4].marketSegmentation["By Segment"].map((segment: any, index: number) => (
                      <div key={index} className="border border-border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">{segment["Segment Name"]}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Market Share: {segment["Market Share"]?.[0]?.value} {segment["Market Share"]?.[0]?.unit}
                        </p>
                        {segment["By Sub-Segment"]?.length > 0 && (
                          <div className="ml-4">
                            <h5 className="font-medium mb-2">Sub-Segments:</h5>
                            {segment["By Sub-Segment"].map((subSegment: any, i: number) => (
                              <div key={i} className="text-sm text-muted-foreground">
                                {subSegment["Sub-Segment Name"]}: {subSegment["Market Share"]?.[0]?.value} {subSegment["Market Share"]?.[0]?.unit}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
              
              {apiResponse?.[4]?.marketSegmentation?.["By Region"] && (
                <Card>
                  <CardHeader>
                    <CardTitle>By Region</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {prepareRegionalData().length > 0 && (
                      <div className="w-full h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={prepareRegionalData()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="region" />
                            <YAxis />
                            <Tooltip formatter={(value: any) => [`${value}%`, 'Market Share']} />
                            <Bar dataKey="marketShare" fill="#1313ec" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                    <div className="space-y-2">
                      {apiResponse[4].marketSegmentation["By Region"].map((region: any, index: number) => (
                        <div key={index} className="flex justify-between p-2 bg-muted rounded">
                          <span>{region["Region Name"]}</span>
                          <span>{region["Market Share"]?.[0]?.value} {region["Market Share"]?.[0]?.unit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
        ) : (
          <Card data-testid="no-data-available">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <h3 className="text-xl font-semibold mb-2">No Data Available</h3>
              <p className="text-muted-foreground">
                The study has been completed but no analysis data is available yet.
              </p>
            </CardContent>
          </Card>
        )
      ) : study.status === "pending" || study.status === "processing" || study.status === "generating" ? (
        <Card data-testid="processing-status">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="loading-skeleton w-16 h-16 rounded-full mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">
              {study.status === "pending" ? "Study Queued" : 
               study.status === "generating" ? "Generating Report" : "Processing Study"}
            </h3>
            <p className="text-muted-foreground max-w-md">
              Your market research study is being generated. This usually takes a few minutes. 
              You'll be notified once it's complete.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card data-testid="failed-status">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <span className="material-symbols-outlined text-6xl text-red-500 mb-4 block">
              error
            </span>
            <h3 className="text-xl font-semibold mb-2">Study Failed</h3>
            <p className="text-muted-foreground max-w-md mb-4">
              Unfortunately, there was an error generating your market research study. Please try creating a new study.
            </p>
            <Link href="/app/new-study">
              <Button>Create New Study</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}