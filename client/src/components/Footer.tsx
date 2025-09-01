import { Link } from "wouter";

export default function Footer() {
  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/" },
        { label: "Pricing", href: "/pricing" },
        { label: "Integrations", href: "/" },
        { label: "Changelog", href: "/" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/" },
        { label: "Press", href: "/" },
        { label: "Contact Us", href: "/" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/" },
        { label: "Help Center", href: "/" },
        { label: "API Docs", href: "/" },
        { label: "Case Studies", href: "/" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col items-start">
            <Link href="/" data-testid="footer-logo">
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="size-6 text-primary">
                  <span className="material-symbols-outlined text-2xl">insights</span>
                </div>
                <h2 className="text-xl font-bold">Market Insights Co.</h2>
              </div>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              © 2024 Market Insights Co. All rights reserved.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold">{section.title}</h3>
              <nav className="mt-4 flex flex-col gap-2">
                {section.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <span className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-border pt-8">
          <div className="flex gap-4">
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Twitter"
              data-testid="social-twitter"
            >
              <span className="material-symbols-outlined">link</span>
            </a>
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="LinkedIn"
              data-testid="social-linkedin"
            >
              <span className="material-symbols-outlined">work</span>
            </a>
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
              data-testid="social-github"
            >
              <span className="material-symbols-outlined">code</span>
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            Made with <span className="text-red-500">♥</span> for market research professionals
          </p>
        </div>
      </div>
    </footer>
  );
}
