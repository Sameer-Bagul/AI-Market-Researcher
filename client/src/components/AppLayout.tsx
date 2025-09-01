import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutMutation } = useAuth();

  const navItems = [
    { path: "/app/dashboard", label: "Dashboard", icon: "dashboard" },
    { path: "/app/studies", label: "Studies", icon: "analytics" },
    { path: "/app/new-study", label: "New Study", icon: "add_circle" },
    { path: "/app/account", label: "Account", icon: "person" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* App Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-background/80 px-6 lg:px-10 py-4 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Link href="/app/dashboard" data-testid="app-logo-link">
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
              data-testid={`app-nav-${item.label.toLowerCase().replace(' ', '-')}`}
            >
              <div
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground ${
                  location === item.path
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                <span className="material-symbols-outlined text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>

        {/* User Profile & Logout */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-3">
            {user?.profileImageUrl && (
              <img
                src={user.profileImageUrl}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
                data-testid="user-profile-image"
              />
            )}
            <div className="text-sm">
              <p className="font-medium" data-testid="user-name">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-muted-foreground" data-testid="user-credits">
                Credits: {user?.credits || 0}
              </p>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              logoutMutation.mutate(undefined, {
                onSuccess: () => {
                  window.location.href = "/";
                },
              });
            }}
            disabled={logoutMutation.isPending}
            data-testid="button-logout"
          >
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </Button>
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
                  data-testid={`mobile-app-nav-${item.label.toLowerCase().replace(' ', '-')}`}
                >
                  <div
                    className={`flex items-center gap-3 text-sm font-medium transition-colors hover:text-foreground py-2 ${
                      location === item.path
                        ? "text-primary font-semibold"
                        : "text-muted-foreground"
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border mt-4">
                <div className="flex items-center gap-3 py-2">
                  {user?.profileImageUrl && (
                    <img
                      src={user.profileImageUrl}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <div className="text-sm">
                    <p className="font-medium">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-muted-foreground">
                      Credits: {user?.credits || 0}
                    </p>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => {
                    logoutMutation.mutate(undefined, {
                      onSuccess: () => {
                        window.location.href = "/";
                      },
                    });
                  }}
                  disabled={logoutMutation.isPending}
                  data-testid="mobile-button-logout"
                >
                  {logoutMutation.isPending ? "Logging out..." : "Logout"}
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}