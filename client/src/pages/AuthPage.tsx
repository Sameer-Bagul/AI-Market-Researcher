import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { registerSchema, loginSchema } from "@shared/schema";
import { useEffect } from "react";

// Country options
const countries = [
  "United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Italy", "Spain", "Netherlands", "Sweden", "Norway", "Denmark", "Finland", "Switzerland", "Austria", "Belgium", "Ireland", "Portugal", "Greece", "Poland", "Czech Republic", "Hungary", "Romania", "Bulgaria", "Croatia", "Slovenia", "Slovakia", "Estonia", "Latvia", "Lithuania", "Luxembourg", "Malta", "Cyprus", "India", "China", "Japan", "South Korea", "Singapore", "Malaysia", "Thailand", "Indonesia", "Philippines", "Vietnam", "Taiwan", "Hong Kong", "Brazil", "Mexico", "Argentina", "Chile", "Colombia", "Peru", "Uruguay", "Costa Rica", "Panama", "Guatemala", "Nicaragua", "Honduras", "El Salvador", "Dominican Republic", "Jamaica", "Trinidad and Tobago", "Barbados", "South Africa", "Kenya", "Nigeria", "Ghana", "Morocco", "Egypt", "Tunisia", "Algeria", "Israel", "United Arab Emirates", "Saudi Arabia", "Kuwait", "Qatar", "Bahrain", "Oman", "Jordan", "Lebanon", "Turkey", "Russia", "Ukraine", "Belarus", "Kazakhstan", "Georgia", "Armenia", "Azerbaijan", "Uzbekistan", "Kyrgyzstan", "Tajikistan", "Turkmenistan", "Mongolia", "New Zealand", "Fiji", "Papua New Guinea", "Samoa", "Tonga", "Vanuatu", "Solomon Islands", "Palau", "Marshall Islands", "Micronesia", "Kiribati", "Tuvalu", "Nauru"
];

// Country codes for phone numbers
const countryCodes = [
  { code: "+1", country: "US/CA" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "IN" },
  { code: "+86", country: "CN" },
  { code: "+81", country: "JP" },
  { code: "+82", country: "KR" },
  { code: "+65", country: "SG" },
  { code: "+60", country: "MY" },
  { code: "+66", country: "TH" },
  { code: "+62", country: "ID" },
  { code: "+63", country: "PH" },
  { code: "+84", country: "VN" },
  { code: "+886", country: "TW" },
  { code: "+852", country: "HK" },
  { code: "+55", country: "BR" },
  { code: "+52", country: "MX" },
  { code: "+54", country: "AR" },
  { code: "+56", country: "CL" },
  { code: "+57", country: "CO" },
  { code: "+51", country: "PE" },
  { code: "+598", country: "UY" },
  { code: "+506", country: "CR" },
  { code: "+507", country: "PA" },
  { code: "+49", country: "DE" },
  { code: "+33", country: "FR" },
  { code: "+39", country: "IT" },
  { code: "+34", country: "ES" },
  { code: "+31", country: "NL" },
  { code: "+46", country: "SE" },
  { code: "+47", country: "NO" },
  { code: "+45", country: "DK" },
  { code: "+358", country: "FI" },
  { code: "+41", country: "CH" },
  { code: "+43", country: "AT" },
  { code: "+32", country: "BE" },
  { code: "+353", country: "IE" },
  { code: "+351", country: "PT" },
  { code: "+30", country: "GR" },
  { code: "+48", country: "PL" },
  { code: "+61", country: "AU" },
  { code: "+64", country: "NZ" },
  { code: "+27", country: "ZA" },
  { code: "+254", country: "KE" },
  { code: "+234", country: "NG" },
  { code: "+233", country: "GH" },
  { code: "+212", country: "MA" },
  { code: "+20", country: "EG" },
  { code: "+216", country: "TN" },
  { code: "+213", country: "DZ" },
  { code: "+972", country: "IL" },
  { code: "+971", country: "AE" },
  { code: "+966", country: "SA" },
  { code: "+965", country: "KW" },
  { code: "+974", country: "QA" },
  { code: "+973", country: "BH" },
  { code: "+968", country: "OM" },
  { code: "+962", country: "JO" },
  { code: "+961", country: "LB" },
  { code: "+90", country: "TR" },
  { code: "+7", country: "RU" },
  { code: "+380", country: "UA" }
];

// Industry options
const industries = [
  "Technology & Software", "Healthcare & Pharmaceuticals", "Financial Services & Banking", "Manufacturing & Industrial", "Retail & E-commerce", "Real Estate & Construction", "Energy & Utilities", "Transportation & Logistics", "Media & Entertainment", "Education & Training", "Food & Beverage", "Automotive", "Aerospace & Defense", "Agriculture & Farming", "Tourism & Hospitality", "Fashion & Apparel", "Sports & Recreation", "Non-profit & NGO", "Government & Public Sector", "Legal Services", "Consulting & Professional Services", "Marketing & Advertising", "Telecommunications", "Mining & Metals", "Chemical & Materials", "Environmental Services", "Insurance", "Investment & Asset Management", "Art & Culture", "Research & Development", "Other"
];

export default function AuthPage() {
  // Check URL parameters to determine initial mode
  const urlParams = new URLSearchParams(window.location.search);
  const initialMode = urlParams.get('mode') === 'signup' ? false : true;
  
  const [isLogin, setIsLogin] = useState(initialMode);
  const [countryCode, setCountryCode] = useState("+1");
  const [, setLocation] = useLocation();
  const { isAuthenticated, loginMutation, registerMutation } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setLocation("/app");
    }
  }, [isAuthenticated, setLocation]);

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      country: "",
      contactNumber: "",
      industry: "",
    },
    mode: "onChange", // Enable real-time validation
  });

  const handleLogin = (data: any) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        setLocation("/app");
      },
    });
  };

  const handleRegister = (data: any) => {
    // Combine country code with contact number
    const formData = {
      ...data,
      contactNumber: `${countryCode} ${data.contactNumber}`
    };
    
    registerMutation.mutate(formData, {
      onSuccess: () => {
        setLocation("/app");
      },
    });
  };

  const handleOAuthLogin = (provider: string) => {
    window.location.href = `/api/auth/${provider}`;
  };

  if (isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-2xl border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                {isLogin ? "Welcome Back" : "Create Account"}
              </CardTitle>
              <CardDescription>
                {isLogin 
                  ? "Sign in to access your market research dashboard" 
                  : "Join us to unlock powerful market insights"
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isLogin ? (
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="Enter your email" 
                              data-testid="input-email" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage data-testid="error-email" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="Enter your password" 
                              data-testid="input-password"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage data-testid="error-password" />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={loginMutation.isPending}
                      data-testid="button-login"
                    >
                      {loginMutation.isPending ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </Form>
              ) : (
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={registerForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="John" data-testid="input-firstName" {...field} />
                            </FormControl>
                            <FormMessage data-testid="error-firstName" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" data-testid="input-lastName" {...field} />
                            </FormControl>
                            <FormMessage data-testid="error-lastName" />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="john@example.com" 
                              data-testid="input-email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage data-testid="error-email" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-country">
                                <SelectValue placeholder="Select your country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem key={country} value={country}>
                                  {country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage data-testid="error-country" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="contactNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Number *</FormLabel>
                          <div className="flex gap-2">
                            <Select defaultValue="+1" onValueChange={setCountryCode}>
                              <SelectTrigger className="w-24" data-testid="select-country-code">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {countryCodes.map((item) => (
                                  <SelectItem key={item.code} value={item.code}>
                                    {item.code}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormControl>
                              <Input 
                                placeholder="1234567890" 
                                data-testid="input-contact-number"
                                {...field} 
                              />
                            </FormControl>
                          </div>
                          <FormMessage data-testid="error-contactNumber" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industry *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-industry">
                                <SelectValue placeholder="Select your industry" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {industries.map((industry) => (
                                <SelectItem key={industry} value={industry}>
                                  {industry}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage data-testid="error-industry" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password *</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="Choose a secure password" 
                              data-testid="input-password"
                              {...field} 
                            />
                          </FormControl>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <p>Password must contain:</p>
                            <ul className="list-disc list-inside space-y-0.5">
                              <li>At least 8 characters</li>
                              <li>One uppercase letter</li>
                              <li>One lowercase letter</li>
                              <li>One number</li>
                              <li>One special character</li>
                            </ul>
                          </div>
                          <FormMessage data-testid="error-password" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Re-enter Password *</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="Confirm your password" 
                              data-testid="input-confirm-password"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage data-testid="error-confirmPassword" />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={registerMutation.isPending}
                      data-testid="button-register"
                    >
                      {registerMutation.isPending ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </Form>
              )}

              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                  or continue with
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => handleOAuthLogin("google")}
                  data-testid="button-google"
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleOAuthLogin("linkedin")}
                  data-testid="button-linkedin"
                >
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </Button>
              </div>

              <div className="text-center">
                <Button
                  variant="link"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    loginForm.reset();
                    registerForm.reset();
                  }}
                  data-testid="button-switch-mode"
                >
                  {isLogin 
                    ? "Don't have an account? Sign up" 
                    : "Already have an account? Sign in"
                  }
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right side - Hero content */}
        <div className="hidden lg:block">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              AI-Powered Market Research
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              Unlock Market Insights
              <span className="block text-primary">At Lightning Speed</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-md mx-auto">
              Get comprehensive market analysis, competitor insights, and actionable data 
              to drive your business decisions forward.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="material-symbols-outlined text-primary">speed</span>
                </div>
                <h3 className="font-semibold mb-1">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">Reports in minutes</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="material-symbols-outlined text-primary">psychology</span>
                </div>
                <h3 className="font-semibold mb-1">AI-Powered</h3>
                <p className="text-sm text-muted-foreground">Advanced algorithms</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="material-symbols-outlined text-primary">attach_money</span>
                </div>
                <h3 className="font-semibold mb-1">Affordable</h3>
                <p className="text-sm text-muted-foreground">Unbeatable pricing</p>
              </div>
            </div>
            <div className="pt-6">
              <Link href="/" data-testid="link-home">
                <Button variant="outline" size="sm">
                  <span className="material-symbols-outlined mr-2 text-sm">arrow_back</span>
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}