import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Pricing() {
  const features = [
    "Comprehensive market analysis",
    "Detailed consumer insights",
    "Competitive landscape overview",
    "Market trends and forecasts",
  ];

  return (
    <div className="space-y-0">
      <section className="flex flex-1 flex-col items-center justify-center py-20">
        <div className="w-full max-w-6xl px-4 text-center">
          <h1 className="text-5xl font-bold tracking-tighter" data-testid="pricing-title">
            Transparent and Simple Pricing
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground" data-testid="pricing-description">
            No hidden fees, no long-term contracts. Just high-quality market insights at a fraction of the traditional cost. You only pay for the reports you need, when you need them.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Pricing Card */}
            <Card className="flex flex-col" data-testid="pricing-card">
              <CardContent className="flex-grow p-8">
                <h3 className="text-xl font-bold">Market Research Report</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-5xl font-black tracking-tight" data-testid="pricing-amount">
                    $100
                  </span>
                  <span className="text-lg font-semibold text-muted-foreground">per report</span>
                </div>
                <ul className="mt-6 space-y-3 text-left">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-muted-foreground">
                      <span className="material-symbols-outlined text-green-500">check_circle</span>
                      <span data-testid={`feature-${index}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-8 pt-0">
                <Link href="/login">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    data-testid="pricing-purchase-button"
                  >
                    Purchase Report
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Pricing Comparison */}
            <Card className="flex flex-col justify-between border-2 border-dashed border-border bg-transparent lg:col-span-2" data-testid="pricing-comparison">
              <CardContent className="p-8">
                <div>
                  <h3 className="text-2xl font-bold">The Industry Standard</h3>
                  <p className="mt-2 text-muted-foreground">See how we stack up against the competition.</p>
                </div>
                <div className="relative mt-8">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 p-4 bg-green-500/10 rounded-lg mr-4">
                      <div className="text-center">
                        <p className="text-4xl font-black" data-testid="comparison-our-price">$100</p>
                        <p className="text-sm font-semibold text-green-400">Our Price</p>
                      </div>
                    </div>
                    <div className="flex-1 p-4 bg-red-500/10 rounded-lg">
                      <div className="text-center">
                        <p className="text-4xl font-black" data-testid="comparison-typical-cost">$3,000+</p>
                        <p className="text-sm font-semibold text-red-400">Typical Cost</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-8 text-center text-muted-foreground" data-testid="comparison-savings">
                  You get the same high-quality, comprehensive insights at
                  <span className="font-bold text-primary"> over 95% less</span>
                  than what you'd typically pay.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
