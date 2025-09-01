import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Services() {
  const serviceCategories = [
    {
      title: "Consumer Insights",
      services: [
        {
          icon: "group",
          title: "Consumer Segmentation",
          description: "Identify and understand distinct customer groups to tailor your marketing efforts.",
        },
        {
          icon: "psychology",
          title: "Behavioral Analysis",
          description: "Uncover patterns in consumer behavior to predict future actions and preferences.",
        },
        {
          icon: "campaign",
          title: "Brand Perception Studies",
          description: "Gauge how your brand is perceived by your target audience and the broader market.",
        },
      ],
    },
    {
      title: "Competitive Intelligence",
      services: [
        {
          icon: "search",
          title: "Competitor Analysis",
          description: "Gain deep understanding of your competitors' strengths, weaknesses, and strategies.",
        },
        {
          icon: "pie_chart",
          title: "Market Share Tracking",
          description: "Monitor your market share and identify opportunities for growth.",
        },
        {
          icon: "sentiment_satisfied",
          title: "Satisfaction Benchmarking",
          description: "Benchmark your customer satisfaction against competitors to identify improvement areas.",
        },
      ],
    },
    {
      title: "Market Trends",
      services: [
        {
          icon: "trending_up",
          title: "Trend Forecasting",
          description: "Identify emerging trends and predict future market developments.",
        },
        {
          icon: "public",
          title: "Market Sizing",
          description: "Estimate the size of your target market and potential revenue opportunities.",
        },
        {
          icon: "bar_chart",
          title: "Industry Analysis",
          description: "Gain insights into industry dynamics, growth drivers, and challenges.",
        },
      ],
    },
    {
      title: "Custom Research",
      services: [
        {
          icon: "edit_note",
          title: "Survey Design & Implementation",
          description: "Develop and implement custom surveys to gather specific insights tailored to your research objectives.",
        },
        {
          icon: "forum",
          title: "Focus Groups & Interviews",
          description: "Conduct focus groups and interviews to gain qualitative insights into consumer attitudes and behaviors.",
        },
        {
          icon: "extension",
          title: "Data Analysis & Reporting",
          description: "Analyze research data and generate comprehensive reports with actionable recommendations.",
        },
      ],
    },
  ];

  return (
    <div className="space-y-0">
      <section className="px-4 sm:px-10 lg:px-20 xl:px-40 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter" data-testid="services-title">
              Our Services
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="services-description">
              Explore our comprehensive suite of market research services designed to empower your business with actionable insights. From consumer behavior analysis to competitive landscape assessments, we provide the tools and expertise to drive your strategic decisions.
            </p>
          </div>

          <div className="space-y-20">
            {serviceCategories.map((category, categoryIndex) => (
              <section key={categoryIndex}>
                <h2 
                  className="text-3xl font-bold mb-8 border-l-4 border-primary pl-4"
                  data-testid={`category-title-${categoryIndex}`}
                >
                  {category.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.services.map((service, serviceIndex) => (
                    <Card
                      key={serviceIndex}
                      className="transition-all hover:border-primary hover:shadow-2xl hover:shadow-primary/10"
                      data-testid={`service-card-${categoryIndex}-${serviceIndex}`}
                    >
                      <CardContent className="flex items-start gap-4 p-6">
                        <span className="material-symbols-outlined text-3xl text-primary">
                          {service.icon}
                        </span>
                        <div>
                          <h3 className="text-lg font-bold" data-testid={`service-title-${categoryIndex}-${serviceIndex}`}>
                            {service.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1" data-testid={`service-description-${categoryIndex}-${serviceIndex}`}>
                            {service.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Services CTA */}
          <Card className="mt-24 border border-border" data-testid="services-cta">
            <CardContent className="p-10 lg:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold" data-testid="services-cta-title">
                Ready to unlock the power of market research?
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto" data-testid="services-cta-description">
                Start your free trial today and gain access to our comprehensive suite of services.
              </p>
              <div className="mt-8 flex justify-center">
                <Link href="/login">
                  <Button
                    className="bg-primary hover:bg-primary/90 px-6"
                    data-testid="services-cta-button"
                  >
                    <span>Get Started</span>
                    <span className="material-symbols-outlined ml-2">arrow_forward</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
