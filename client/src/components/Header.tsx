import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Product" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/pricing", label: "Pricing" },
  ];

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-background/80 px-6 lg:px-10 py-4 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <Link href="/" data-testid="logo-link">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="size-6 text-primary">
              <span className="material-symbols-outlined text-2xl">insights</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">Market Insights Co.</h1>
          </div>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            data-testid={`nav-${item.label.toLowerCase()}`}
          >
            <span
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                location === item.path
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

      {/* Desktop Auth Buttons */}
      <div className="hidden md:flex items-center gap-4">
        <Link href="/auth">
          <Button
            variant="secondary"
            size="sm"
            data-testid="button-login"
          >
            Log In
          </Button>
        </Link>
        <Link href="/auth?mode=signup">
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90"
            data-testid="button-signup"
          >
            Get Started
          </Button>
        </Link>
      </div>

      {/* Mobile Menu */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-2"
            data-testid="button-mobile-menu"
          >
            <span className="material-symbols-outlined">menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <nav className="flex flex-col gap-4 mt-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                data-testid={`mobile-nav-${item.label.toLowerCase()}`}
              >
                <span
                  className={`text-sm font-medium transition-colors hover:text-foreground block py-2 ${
                    location === item.path
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-border mt-4">
              <Link href="/auth" onClick={() => setIsOpen(false)}>
                <Button
                  variant="secondary"
                  className="w-full"
                  data-testid="mobile-button-login"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/auth?mode=signup" onClick={() => setIsOpen(false)}>
                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  data-testid="mobile-button-signup"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
