import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [activeTab, setActiveTab] = useState("api");

  const features = [
    {
      icon: "bolt",
      title: "Lightning Fast Delivery",
      description: "Receive comprehensive market reports within hours, not weeks. Our AI-powered platform processes data in real-time.",
    },
    {
      icon: "payments",
      title: "Unbeatable Pricing",
      description: "Access premium market research at a fraction of the cost of traditional methods. Starting at just $100 per report.",
    },
    {
      icon: "auto_awesome",
      title: "AI-Powered Insights",
      description: "Leverage advanced AI algorithms to uncover hidden patterns and predict future trends with unprecedented accuracy.",
    },
    {
      icon: "analytics",
      title: "Comprehensive Analytics",
      description: "Get detailed consumer insights, competitive landscape analysis, and market trend forecasting in one unified platform.",
    },
    {
      icon: "integration_instructions",
      title: "Easy Integration",
      description: "Seamlessly integrate our data into your existing workflows with our robust API and pre-built connectors.",
    },
    {
      icon: "support_agent",
      title: "Expert Support",
      description: "Get dedicated support from our team of market research experts to help you maximize your insights.",
    },
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center text-center px-4 py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(17, 17, 24, 0.9) 0%, rgba(17, 17, 24, 0.6) 50%, rgba(17, 17, 24, 0.9) 100%), url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')`
          }}
        />
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-8">
          <div className="animate-fade-in-down">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter" data-testid="hero-title">
              Unlock Market Potential with
              <span className="text-primary"> AI-Powered Insights</span>
            </h1>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl animate-fade-in-up" data-testid="hero-description">
            Gain a competitive edge with our lightning-fast delivery and unbeatable pricing. Identify key consumer segments, analyze competitors, and stay ahead of market trends.
          </p>
          
          <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-base font-bold min-w-[160px]"
              data-testid="hero-button-get-started"
              asChild
            >
              <a href="/auth">Get Started Now</a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base font-medium min-w-[160px]"
              data-testid="hero-button-watch-demo"
            >
              <span className="material-symbols-outlined mr-2">play_circle</span>
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 md:px-10 lg:px-20 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter" data-testid="features-title">
              Why Choose Market Insights Co.?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="features-description">
              Our platform combines cutting-edge AI with market research expertise to deliver actionable insights that drive business growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="transition-all hover:border-primary hover:shadow-2xl hover:shadow-primary/10"
                data-testid={`feature-card-${index}`}
              >
                <CardContent className="flex flex-col gap-4 p-6">
                  <div className="text-primary">
                    <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold" data-testid={`feature-title-${index}`}>
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm" data-testid={`feature-description-${index}`}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-card px-4 md:px-10 lg:px-20 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter" data-testid="how-it-works-title">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="how-it-works-description">
              Our streamlined process ensures you get the insights you need quickly and efficiently.
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col gap-8">
            <TabsList className="flex justify-center gap-2 md:gap-4 p-2 bg-background rounded-full">
              <TabsTrigger 
                value="api" 
                className="px-4 py-2 text-sm md:text-base font-medium rounded-full"
                data-testid="tab-api"
              >
                Real-time APIs
              </TabsTrigger>
              <TabsTrigger 
                value="ml" 
                className="px-4 py-2 text-sm md:text-base font-medium rounded-full"
                data-testid="tab-ml"
              >
                Machine Learning
              </TabsTrigger>
              <TabsTrigger 
                value="predictive" 
                className="px-4 py-2 text-sm md:text-base font-medium rounded-full"
                data-testid="tab-predictive"
              >
                Predictive Analytics
              </TabsTrigger>
            </TabsList>
            
            <div className="relative min-h-[300px]">
              <TabsContent value="api" className="bg-background p-8 rounded-xl border border-border" data-testid="tab-content-api">
                <h3 className="text-2xl font-bold text-primary mb-4">Real-time APIs</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-green-500 mt-1">check_circle</span>
                    <span>Access a continuous stream of data from social media, news outlets, and industry-specific sources in real-time.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-green-500 mt-1">check_circle</span>
                    <span>Monitor brand mentions, competitor activities, and customer sentiment as it happens across multiple platforms.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-green-500 mt-1">check_circle</span>
                    <span>Integrate our data directly into your existing workflows and business intelligence tools with minimal setup.</span>
                  </li>
                </ul>
              </TabsContent>
              
              <TabsContent value="ml" className="bg-background p-8 rounded-xl border border-border" data-testid="tab-content-ml">
                <h3 className="text-2xl font-bold text-primary mb-4">Machine Learning</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-green-500 mt-1">check_circle</span>
                    <span>Advanced algorithms analyze patterns in consumer behavior and market trends automatically.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-green-500 mt-1">check_circle</span>
                    <span>Natural language processing extracts insights from unstructured data sources like reviews and social media.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-green-500 mt-1">check_circle</span>
                    <span>Continuous learning improves accuracy and relevance of insights over time.</span>
                  </li>
                </ul>
              </TabsContent>
              
              <TabsContent value="predictive" className="bg-background p-8 rounded-xl border border-border" data-testid="tab-content-predictive">
                <h3 className="text-2xl font-bold text-primary mb-4">Predictive Analytics</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-green-500 mt-1">check_circle</span>
                    <span>Forecast market trends and consumer behavior with high accuracy using historical data patterns.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-green-500 mt-1">check_circle</span>
                    <span>Identify emerging opportunities and potential risks before they impact your business.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-green-500 mt-1">check_circle</span>
                    <span>Scenario modeling helps you prepare for different market conditions and strategic decisions.</span>
                  </li>
                </ul>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="px-4 md:px-10 lg:px-20 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter" data-testid="pricing-preview-title">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="pricing-preview-description">
              No hidden fees, no long-term contracts. Just high-quality market insights at a fraction of the traditional cost.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="flex flex-col" data-testid="pricing-card-report">
              <CardContent className="flex-grow p-8">
                <h3 className="text-xl font-bold">Market Research Report</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-5xl font-black tracking-tight" data-testid="price-amount">$100</span>
                  <span className="text-lg font-semibold text-muted-foreground">per report</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <span className="material-symbols-outlined text-green-500">check_circle</span>
                    <span>Comprehensive market analysis</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <span className="material-symbols-outlined text-green-500">check_circle</span>
                    <span>Detailed consumer insights</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <span className="material-symbols-outlined text-green-500">check_circle</span>
                    <span>Competitive landscape overview</span>
                  </li>
                </ul>
              </CardContent>
              <div className="p-8 pt-0">
                <Link href="/pricing">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    data-testid="pricing-button-get-started"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </Card>
            
            <Card className="flex flex-col justify-between border-2 border-dashed border-border bg-transparent" data-testid="pricing-comparison">
              <CardContent className="p-8">
                <div>
                  <h3 className="text-2xl font-bold">vs. Industry Standard</h3>
                  <p className="mt-2 text-muted-foreground">See how we compare to traditional research firms.</p>
                </div>
                <div className="mt-8 space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-500/10 rounded-lg">
                    <span className="text-lg font-semibold">Our Price</span>
                    <span className="text-2xl font-black text-green-400" data-testid="comparison-our-price">$100</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-red-500/10 rounded-lg">
                    <span className="text-lg font-semibold">Typical Cost</span>
                    <span className="text-2xl font-black text-red-400" data-testid="comparison-typical-cost">$3,000+</span>
                  </div>
                </div>
                <p className="mt-6 text-center text-muted-foreground">
                  Save <span className="font-bold text-primary">over 95%</span> compared to traditional market research.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary px-4 md:px-10 lg:px-20 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground" data-testid="cta-title">
            Ready to Transform Your Market Research?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto" data-testid="cta-description">
            Join thousands of businesses who trust Market Insights Co. for their market research needs. Get started today and see the difference our AI-powered platform can make.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button
                variant="secondary"
                size="lg"
                className="bg-background text-foreground hover:bg-background/90 text-base font-bold min-w-[160px]"
                data-testid="cta-button-free-trial"
              >
                Start Free Trial
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 text-base font-medium min-w-[160px]"
              data-testid="cta-button-contact-sales"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
