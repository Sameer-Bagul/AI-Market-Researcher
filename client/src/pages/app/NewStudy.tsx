import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CreditCard } from "lucide-react";

const countries = [
  "United States", "Canada", "United Kingdom", "Germany", "France", "Italy", "Spain", 
  "Japan", "China", "India", "Australia", "Brazil", "Mexico", "South Korea", "Netherlands",
  "Sweden", "Norway", "Denmark", "Finland", "Switzerland", "Austria", "Belgium", "Poland",
  "Czech Republic", "Hungary", "Romania", "Bulgaria", "Croatia", "Greece", "Portugal",
  "Ireland", "Luxembourg", "Slovenia", "Slovakia", "Estonia", "Latvia", "Lithuania",
  "Cyprus", "Malta", "Israel", "Turkey", "Russia", "Ukraine", "South Africa", "Egypt",
  "Morocco", "Nigeria", "Kenya", "Ghana", "Ethiopia", "Tanzania", "Uganda", "Zimbabwe",
  "Botswana", "Namibia", "Zambia", "Malawi", "Rwanda", "Singapore", "Malaysia", "Thailand",
  "Vietnam", "Philippines", "Indonesia", "Taiwan", "Hong Kong", "New Zealand", "Chile",
  "Argentina", "Colombia", "Peru", "Ecuador", "Uruguay", "Paraguay", "Bolivia", "Venezuela",
  "Costa Rica", "Panama", "Guatemala", "Honduras", "El Salvador", "Nicaragua", "Jamaica",
  "Trinidad and Tobago", "Barbados", "Dominican Republic", "Puerto Rico", "Cuba", "Haiti"
];

const formSchema = z.object({
  industryName: z.string().min(1, "Industry name is required"),
  companyType: z.enum(["Corporate", "Individual"], {
    required_error: "Please select a company type",
  }),
  reportScope: z.string().min(1, "Please select a report scope"),
  country: z.string().optional(),
  region: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function NewStudy() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industryName: "",
      companyType: undefined,
      reportScope: "",
      country: "",
      region: "",
    },
  });

  const companyType = form.watch("companyType");
  const reportScope = form.watch("reportScope");

  const createStudyMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/studies", data);
      return await response.json();
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/studies"] });
      toast({
        title: "Study Created Successfully!",
        description: "Your market research study is being generated.",
      });
      setLocation(`/app/studies/${data.id}`);
    },
    onError: (error) => {
      toast({
        title: "Error Creating Study",
        description: error.message || "Failed to create market research study",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    createStudyMutation.mutate(data);
  };

  const getScopeOptions = () => {
    if (companyType === "Corporate") {
      return ["Global", "USA + Canada", "Europe", "Middle East + Africa", "Asia Pacific", "Country Specific"];
    } else if (companyType === "Individual") {
      return ["Country Specific", "Region Specific"];
    }
    return [];
  };

  const showCountrySelect = reportScope === "Country Specific";
  const showRegionInput = reportScope === "Region Specific";
  
  // Check if user has sufficient credits (minimum 10 required)
  const hasInsufficientCredits = !user || (user.credits || 0) < 10;

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-6 lg:p-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight" data-testid="new-study-title">
          Create New Market Research Study
        </h1>
        <p className="text-muted-foreground" data-testid="new-study-subtitle">
          Generate comprehensive market insights tailored to your business needs
        </p>
        
        {/* Credits Display */}
        <div className="flex items-center gap-2 text-sm">
          <CreditCard className="h-4 w-4" />
          <span>Available Credits: <strong>{user?.credits || 0}</strong></span>
          {hasInsufficientCredits && (
            <span className="text-destructive">(10 credits required)</span>
          )}
        </div>
      </div>

      {/* Insufficient Credits Alert */}
      {hasInsufficientCredits && (
        <Alert data-testid="insufficient-credits-alert">
          <CreditCard className="h-4 w-4" />
          <AlertDescription>
            You need at least 10 credits to generate a market research study. 
            Your current balance is {user?.credits || 0} credits.
            Please contact support to purchase additional credits.
          </AlertDescription>
        </Alert>
      )}

      <Card data-testid="study-form-card">
        <CardHeader>
          <CardTitle>Study Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="study-form">
              <FormField
                control={form.control}
                name="industryName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Healthcare Technology, Renewable Energy, E-commerce"
                        data-testid="input-industry-name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage data-testid="error-industry-name" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-company-type">
                          <SelectValue placeholder="Select your company type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Corporate" data-testid="option-corporate">
                          Corporate
                        </SelectItem>
                        <SelectItem value="Individual" data-testid="option-individual">
                          Individual
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage data-testid="error-company-type" />
                  </FormItem>
                )}
              />

              {companyType && (
                <FormField
                  control={form.control}
                  name="reportScope"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Report Study Scope</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-report-scope">
                            <SelectValue placeholder="Select report scope" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {getScopeOptions().map((option) => (
                            <SelectItem key={option} value={option} data-testid={`option-scope-${option.toLowerCase().replace(/\s+/g, '-')}`}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage data-testid="error-report-scope" />
                    </FormItem>
                  )}
                />
              )}

              {showCountrySelect && (
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-country">
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country} data-testid={`option-country-${country.toLowerCase().replace(/\s+/g, '-')}`}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage data-testid="error-country" />
                    </FormItem>
                  )}
                />
              )}

              {showRegionInput && (
                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Region</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., North America, Southeast Asia, Western Europe"
                          data-testid="input-region"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage data-testid="error-region" />
                    </FormItem>
                  )}
                />
              )}

              <div className="flex items-center justify-between pt-6">
                <div className="text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">info</span>
                    This will consume 1 research credit
                  </p>
                </div>
                <Button
                  type="submit"
                  disabled={createStudyMutation.isPending || hasInsufficientCredits}
                  data-testid="submit-study"
                >
                  {createStudyMutation.isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="loading-skeleton w-4 h-4 rounded-full"></div>
                      Generating Report...
                    </div>
                  ) : hasInsufficientCredits ? (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Insufficient Credits
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined mr-2">auto_awesome</span>
                      Generate Report
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20" data-testid="info-card">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-primary text-2xl shrink-0">
              lightbulb
            </span>
            <div className="space-y-2">
              <h3 className="font-semibold text-primary">How it works</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Your study will be processed using advanced AI algorithms</li>
                <li>• Comprehensive market analysis will be generated within minutes</li>
                <li>• You'll receive detailed insights including competitor analysis, market trends, and forecasts</li>
                <li>• The report will be available in an easy-to-read tabbed format</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}