import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";

export default function Account() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [creditsToAdd, setCreditsToAdd] = useState("");

  const updateCreditsMutation = useMutation({
    mutationFn: async (newCredits: number) => {
      const response = await apiRequest("POST", "/api/users/credits", { credits: newCredits });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      toast({
        title: "Credits Updated",
        description: "Your account credits have been updated successfully.",
      });
      setCreditsToAdd("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update credits",
        variant: "destructive",
      });
    },
  });

  const handleAddCredits = () => {
    const amount = parseInt(creditsToAdd);
    if (amount > 0) {
      const newTotal = (user?.credits || 0) + amount;
      updateCreditsMutation.mutate(newTotal);
    }
  };

  const creditPackages = [
    { credits: 10, price: "$99", popular: false },
    { credits: 25, price: "$199", popular: true },
    { credits: 50, price: "$349", popular: false },
    { credits: 100, price: "$599", popular: false },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6 lg:p-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight" data-testid="account-title">
          Account Management
        </h1>
        <p className="text-muted-foreground" data-testid="account-subtitle">
          Manage your profile, credits, and usage statistics
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6" data-testid="account-tabs">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" data-testid="tab-profile">
            Profile
          </TabsTrigger>
          <TabsTrigger value="credits" data-testid="tab-credits">
            Credits & Usage
          </TabsTrigger>
          <TabsTrigger value="billing" data-testid="tab-billing">
            Billing
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" data-testid="content-profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                {user?.profileImageUrl && (
                  <img
                    src={user.profileImageUrl}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-2 border-border"
                    data-testid="profile-image"
                  />
                )}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold" data-testid="profile-name">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p className="text-muted-foreground" data-testid="profile-email">
                    {user?.email}
                  </p>
                  <Badge variant="secondary" data-testid="profile-member-since">
                    Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={user?.firstName || ""}
                    disabled
                    data-testid="input-first-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={user?.lastName || ""}
                    disabled
                    data-testid="input-last-name"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ""}
                    disabled
                    data-testid="input-email"
                  />
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <span className="material-symbols-outlined mr-2 text-sm">info</span>
                  Profile information is managed through your Replit account. 
                  Changes to your name and email should be made in your Replit settings.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Credits Tab */}
        <TabsContent value="credits" data-testid="content-credits">
          <div className="space-y-6">
            {/* Current Credits */}
            <Card data-testid="current-credits-card">
              <CardHeader>
                <CardTitle>Current Credits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <span className="material-symbols-outlined text-primary text-2xl">
                        account_balance_wallet
                      </span>
                    </div>
                    <div>
                      <p className="text-3xl font-bold" data-testid="current-credits-amount">
                        {user?.credits || 0}
                      </p>
                      <p className="text-muted-foreground">Research credits available</p>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>Each credit = 1 market research report</p>
                    <p>Credits never expire</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Purchase Credits */}
            <Card data-testid="purchase-credits-card">
              <CardHeader>
                <CardTitle>Purchase Additional Credits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {creditPackages.map((pkg) => (
                    <Card
                      key={pkg.credits}
                      className={`relative cursor-pointer transition-all hover:shadow-lg ${
                        pkg.popular ? "border-primary shadow-lg" : ""
                      }`}
                      data-testid={`credit-package-${pkg.credits}`}
                    >
                      {pkg.popular && (
                        <Badge
                          className="absolute -top-2 left-1/2 transform -translate-x-1/2"
                          data-testid="popular-badge"
                        >
                          Most Popular
                        </Badge>
                      )}
                      <CardContent className="p-6 text-center">
                        <div className="text-2xl font-bold">{pkg.credits}</div>
                        <div className="text-sm text-muted-foreground mb-4">Credits</div>
                        <div className="text-xl font-semibold text-primary mb-4">{pkg.price}</div>
                        <Button
                          className="w-full"
                          variant={pkg.popular ? "default" : "outline"}
                          onClick={() => {
                            const newTotal = (user?.credits || 0) + pkg.credits;
                            updateCreditsMutation.mutate(newTotal);
                          }}
                          disabled={updateCreditsMutation.isPending}
                          data-testid={`buy-credits-${pkg.credits}`}
                        >
                          {updateCreditsMutation.isPending ? "Processing..." : "Purchase"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="border-t border-border pt-6">
                  <h4 className="font-semibold mb-4">Custom Amount</h4>
                  <div className="flex gap-4 max-w-md">
                    <Input
                      type="number"
                      placeholder="Enter credits to add"
                      value={creditsToAdd}
                      onChange={(e) => setCreditsToAdd(e.target.value)}
                      min="1"
                      data-testid="input-custom-credits"
                    />
                    <Button
                      onClick={handleAddCredits}
                      disabled={!creditsToAdd || updateCreditsMutation.isPending}
                      data-testid="add-custom-credits"
                    >
                      Add Credits
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Add a custom amount of credits to your account
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Usage Statistics */}
            <Card data-testid="usage-stats-card">
              <CardHeader>
                <CardTitle>Usage Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">0</div>
                    <div className="text-sm text-muted-foreground">This Month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">0</div>
                    <div className="text-sm text-muted-foreground">Last 30 Days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">0</div>
                    <div className="text-sm text-muted-foreground">All Time</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" data-testid="content-billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-6xl text-muted-foreground mb-4 block">
                  receipt_long
                </span>
                <h3 className="text-xl font-semibold mb-2">No Billing History</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  You haven't made any purchases yet. Your billing history will appear here once you purchase credits.
                </p>
              </div>

              <div className="border-t border-border pt-6">
                <h4 className="font-semibold mb-4">Payment Methods</h4>
                <div className="text-center py-6">
                  <span className="material-symbols-outlined text-4xl text-muted-foreground mb-2 block">
                    credit_card
                  </span>
                  <p className="text-muted-foreground">No payment methods on file</p>
                  <Button variant="outline" className="mt-4" data-testid="add-payment-method">
                    Add Payment Method
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}