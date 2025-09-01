import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
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

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    country: "",
    contactNumber: "",
    industry: ""
  });

  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setLocation("/app");
    }
  }, [isAuthenticated, setLocation]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    
    return minLength && hasUpper && hasLower && hasNumber && hasSpecial;
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!loginForm.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(loginForm.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!loginForm.password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    loginMutation.mutate(loginForm, {
      onSuccess: () => {
        setLocation("/app");
      },
    });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!registerForm.firstName) {
      newErrors.firstName = "First name is required";
    }

    if (!registerForm.lastName) {
      newErrors.lastName = "Last name is required";
    }

    if (!registerForm.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(registerForm.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!registerForm.country) {
      newErrors.country = "Country is required";
    }

    if (!registerForm.contactNumber) {
      newErrors.contactNumber = "Contact number is required";
    }

    if (!registerForm.industry) {
      newErrors.industry = "Industry is required";
    }

    if (!registerForm.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(registerForm.password)) {
      newErrors.password = "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character";
    }

    if (!registerForm.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (registerForm.password !== registerForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    
    // Combine country code with contact number
    const formData = {
      ...registerForm,
      contactNumber: `${countryCode} ${registerForm.contactNumber}`
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
          <div className="bg-card/50 backdrop-blur-sm shadow-2xl border rounded-lg">
            <div className="p-6 text-center border-b">
              <h1 className="text-2xl font-bold">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-muted-foreground mt-2">
                {isLogin 
                  ? "Sign in to access your market research dashboard" 
                  : "Join us to unlock powerful market insights"
                }
              </p>
            </div>
            <div className="p-6 space-y-6">
              {isLogin ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter your email"
                      data-testid="input-email"
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1" data-testid="error-email">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter your password"
                      data-testid="input-password"
                    />
                    {errors.password && (
                      <p className="text-destructive text-sm mt-1" data-testid="error-password">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
                    data-testid="button-login"
                  >
                    {loginMutation.isPending ? "Signing in..." : "Sign In"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                        First Name *
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        value={registerForm.firstName}
                        onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="John"
                        data-testid="input-firstName"
                      />
                      {errors.firstName && (
                        <p className="text-destructive text-sm mt-1" data-testid="error-firstName">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                        Last Name *
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        value={registerForm.lastName}
                        onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Doe"
                        data-testid="input-lastName"
                      />
                      {errors.lastName && (
                        <p className="text-destructive text-sm mt-1" data-testid="error-lastName">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="john@example.com"
                      data-testid="input-email"
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1" data-testid="error-email">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium mb-2">
                      Country *
                    </label>
                    <select
                      id="country"
                      value={registerForm.country}
                      onChange={(e) => setRegisterForm({...registerForm, country: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      data-testid="select-country"
                    >
                      <option value="">Select your country</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    {errors.country && (
                      <p className="text-destructive text-sm mt-1" data-testid="error-country">
                        {errors.country}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contactNumber" className="block text-sm font-medium mb-2">
                      Contact Number *
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-24 px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        data-testid="select-country-code"
                      >
                        {countryCodes.map((item) => (
                          <option key={item.code} value={item.code}>
                            {item.code}
                          </option>
                        ))}
                      </select>
                      <input
                        id="contactNumber"
                        type="text"
                        value={registerForm.contactNumber}
                        onChange={(e) => setRegisterForm({...registerForm, contactNumber: e.target.value})}
                        className="flex-1 px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="1234567890"
                        data-testid="input-contact-number"
                      />
                    </div>
                    {errors.contactNumber && (
                      <p className="text-destructive text-sm mt-1" data-testid="error-contactNumber">
                        {errors.contactNumber}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium mb-2">
                      Industry *
                    </label>
                    <select
                      id="industry"
                      value={registerForm.industry}
                      onChange={(e) => setRegisterForm({...registerForm, industry: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      data-testid="select-industry"
                    >
                      <option value="">Select your industry</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                    {errors.industry && (
                      <p className="text-destructive text-sm mt-1" data-testid="error-industry">
                        {errors.industry}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                      Password *
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Choose a secure password"
                      data-testid="input-password"
                    />
                    <div className="text-xs text-muted-foreground space-y-1 mt-2">
                      <p>Password must contain:</p>
                      <ul className="list-disc list-inside space-y-0.5">
                        <li>At least 8 characters</li>
                        <li>One uppercase letter</li>
                        <li>One lowercase letter</li>
                        <li>One number</li>
                        <li>One special character</li>
                      </ul>
                    </div>
                    {errors.password && (
                      <p className="text-destructive text-sm mt-1" data-testid="error-password">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                      Re-enter Password *
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Confirm your password"
                      data-testid="input-confirm-password"
                    />
                    {errors.confirmPassword && (
                      <p className="text-destructive text-sm mt-1" data-testid="error-confirmPassword">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={registerMutation.isPending}
                    className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
                    data-testid="button-register"
                  >
                    {registerMutation.isPending ? "Creating account..." : "Create Account"}
                  </button>
                </form>
              )}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-2 text-muted-foreground">
                    or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleOAuthLogin("google")}
                  className="flex items-center justify-center px-4 py-2 border border-border rounded-md hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
                </button>
                <button
                  onClick={() => handleOAuthLogin("linkedin")}
                  className="flex items-center justify-center px-4 py-2 border border-border rounded-md hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  data-testid="button-linkedin"
                >
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </button>
              </div>

              <div className="text-center">
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setLoginForm({ email: "", password: "" });
                    setRegisterForm({
                      email: "",
                      password: "",
                      confirmPassword: "",
                      firstName: "",
                      lastName: "",
                      country: "",
                      contactNumber: "",
                      industry: ""
                    });
                    setErrors({});
                  }}
                  className="text-primary hover:underline text-sm"
                  data-testid="button-switch-mode"
                >
                  {isLogin 
                    ? "Don't have an account? Sign up" 
                    : "Already have an account? Sign in"
                  }
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Hero content */}
        <div className="hidden lg:block">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="text-sm">⚡</span>
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
                  <span className="text-primary">⚡</span>
                </div>
                <h3 className="font-semibold mb-1">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">Reports in minutes</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary">🧠</span>
                </div>
                <h3 className="font-semibold mb-1">AI-Powered</h3>
                <p className="text-sm text-muted-foreground">Advanced algorithms</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary">📊</span>
                </div>
                <h3 className="font-semibold mb-1">Data-Driven</h3>
                <p className="text-sm text-muted-foreground">Actionable insights</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}