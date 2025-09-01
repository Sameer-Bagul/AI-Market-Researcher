import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const principles = [
    {
      icon: "analytics",
      title: "Data-Driven Insights",
      description: "We leverage advanced analytics and comprehensive data to deliver actionable insights.",
    },
    {
      icon: "groups",
      title: "Customer-Centric Approach",
      description: "We prioritize understanding customer needs and behaviors to inform our research.",
    },
    {
      icon: "lightbulb",
      title: "Innovation & Adaptability",
      description: "We continuously innovate and adapt to evolving market dynamics and technologies.",
    },
    {
      icon: "verified",
      title: "Integrity & Reliability",
      description: "We uphold the highest standards of integrity and reliability in our research and reporting.",
    },
  ];

  return (
    <div className="space-y-0">
      {/* Page Header */}
      <section className="flex flex-col items-center px-6 py-20 text-center md:py-32">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight" data-testid="about-title">
          About Market Insights Co.
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground" data-testid="about-description">
          We're dedicated to transforming market research with innovative solutions and actionable insights. Our mission is to empower businesses to make informed decisions, understand their customers, and stay ahead of market trends.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-16">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight" data-testid="mission-title">Our Mission</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground" data-testid="mission-description">
              To revolutionize market research by providing cutting-edge tools and comprehensive data analysis that drive business growth and success.
            </p>
          </div>

          {/* Principles Grid */}
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold tracking-tight" data-testid="principles-title">Our Principles</h2>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {principles.map((principle, index) => (
                <Card
                  key={index}
                  className="shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20"
                  data-testid={`principle-card-${index}`}
                >
                  <CardContent className="flex flex-col items-center p-8 text-center">
                    <div className="rounded-full bg-primary/10 p-4 text-primary">
                      <span className="material-symbols-outlined text-3xl">{principle.icon}</span>
                    </div>
                    <h3 className="mt-6 text-xl font-bold" data-testid={`principle-title-${index}`}>
                      {principle.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground" data-testid={`principle-description-${index}`}>
                      {principle.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
