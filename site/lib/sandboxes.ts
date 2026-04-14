import * as React from 'react';
import {
  registerSandboxes,
  type SandboxDefinition,
} from '@olwiba/docs';

const uiSandboxes: Record<string, SandboxDefinition> = {
  'app-shell': {
    id: 'app-shell',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/app-shell')),
    files: [
      {
        path: 'app/layout.tsx',
        language: 'tsx',
        code: `import { AppShell } from "@olwiba/ui";
import { LayoutDashboard, Users, FileText, Settings, Plus } from "lucide-react";

export default function AppLayout({ children }) {
  return (
    <AppShell
      brand={{ name: "Acme App", href: "/" }}
      navItems={[
        { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", isActive: true },
        { icon: Users, label: "Team", href: "/team" },
        { icon: FileText, label: "Documents", href: "/docs" },
        { icon: Settings, label: "Settings", href: "/settings" },
      ]}
      action={{ icon: Plus, label: "New project", href: "/new" }}
      user={{
        name: "Alex Johnson",
        email: "alex@acme.com",
        plan: "pro",
        onSignOut: () => signOut(),
        onBilling: () => router.push("/billing"),
      }}
      pageTitle="Dashboard"
    >
      {children}
    </AppShell>
  );
}
`,
      },
    ],
  },
  'auth-section': {
    id: 'auth-section',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/auth-section')),
    files: [
      {
        path: 'app/sign-in/page.tsx',
        language: 'tsx',
        code: `import { AuthSection } from "@olwiba/ui";

// Centered layout (default)
export default function SignInPage() {
  return (
    <AuthSection
      onSubmit={(e) => { e.preventDefault(); signIn() }}
      onSso={() => signInWithSso()}
      signUpHref="/register"
      forgotPasswordHref="/forgot-password"
    />
  );
}
`,
      },
      {
        path: 'app/sign-in/split-layout.tsx',
        language: 'tsx',
        code: `import { AuthSection } from "@olwiba/ui";

// Split layout with decorative panel
export default function SignInPage() {
  return (
    <AuthSection
      layout="split"
      onSubmit={(e) => { e.preventDefault(); signIn() }}
      onSso={() => signInWithSso()}
      signUpHref="/register"
      forgotPasswordHref="/forgot-password"
    />
  );
}
`,
      },
    ],
  },
  'auth-split-block': {
    id: 'auth-split-block',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/auth-split-block')),
    files: [
      {
        path: 'app/page.tsx',
        language: 'tsx',
        code: `import { AuthSplitBlock } from "@olwiba/ui";

export default function Page() {
  return <AuthSplitBlock />;
}
`,
      },
      {
        path: 'src/blocks/AuthSplitBlock.tsx',
        language: 'tsx',
        code: `import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label } from "@olwiba/cn";

export function AuthSplitBlock() {
  return (
    <section className="grid min-h-[560px] overflow-hidden rounded-2xl border bg-card lg:grid-cols-2">
      <div className="relative hidden p-8 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-muted" />
        <div className="relative z-10">
          <Badge variant="secondary" className="mb-4">Welcome</Badge>
          <h2 className="text-3xl font-semibold tracking-tight">Build better interfaces faster</h2>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-10">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>Enter your email and password to continue.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@company.com" />
            </div>
            <Button className="w-full">Continue</Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
`,
      },
    ],
  },
  'dashboard-overview-block': {
    id: 'dashboard-overview-block',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/dashboard-overview-block')),
    files: [
      {
        path: 'app/page.tsx',
        language: 'tsx',
        code: `import { DashboardOverviewBlock } from "@olwiba/ui";

export default function Page() {
  return <DashboardOverviewBlock />;
}
`,
      },
      {
        path: 'src/blocks/DashboardOverviewBlock.tsx',
        language: 'tsx',
        code: `import { ArrowUpRight } from "lucide-react";
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Progress, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@olwiba/cn";

export function DashboardOverviewBlock() {
  return (
    <section className="space-y-6 rounded-2xl border bg-card p-4 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
          <p className="text-sm text-muted-foreground">Snapshot of key product and revenue metrics.</p>
        </div>
        <Button variant="outline" size="sm">Export report <ArrowUpRight className="ml-2 size-4" /></Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent invoices</CardTitle>
          <CardDescription>Latest billing activity from your workspace.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>#INV-9031</TableCell>
                <TableCell><Badge>Paid</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-4"><Progress value={72} /></div>
        </CardContent>
      </Card>
    </section>
  );
}
`,
      },
    ],
  },
  'dashboard-shell-block': {
    id: 'dashboard-shell-block',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/dashboard-shell-block')),
    files: [
      {
        path: 'app/page.tsx',
        language: 'tsx',
        code: `import { DashboardShellBlock } from "@olwiba/ui";

export default function Page() {
  return <DashboardShellBlock />;
}
`,
      },
      {
        path: 'src/blocks/DashboardShellBlock.tsx',
        language: 'tsx',
        code: `import { DashboardShellBlock } from "@olwiba/ui";

export default function Example() {
  return <DashboardShellBlock />;
}
`,
      },
    ],
  },
  'marketing-hero-block': {
    id: 'marketing-hero-block',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/marketing-hero-block')),
    files: [
      {
        path: 'app/page.tsx',
        language: 'tsx',
        code: `import { MarketingHeroBlock } from "@olwiba/ui";

export default function Page() {
  return <MarketingHeroBlock />;
}
`,
      },
      {
        path: 'src/blocks/MarketingHeroBlock.tsx',
        language: 'tsx',
        code: `import { ArrowRight } from "lucide-react";
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@olwiba/cn";

export function MarketingHeroBlock() {
  return (
    <section className="overflow-hidden rounded-2xl border bg-card">
      <div className="relative px-6 py-14 sm:px-10 sm:py-20">
        <div className="relative mx-auto max-w-4xl text-center">
          <Badge className="mb-4" variant="secondary">Base UI Blocks</Badge>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Ship polished screens with olwibaCN-powered building blocks
          </h1>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg">Get started <ArrowRight className="ml-2 size-4" /></Button>
            <Button size="lg" variant="outline">View examples</Button>
          </div>
        </div>
      </div>
      <div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Composable by default</CardTitle>
            <CardDescription>Built from olwibaCN primitives.</CardDescription>
          </CardHeader>
          <CardContent />
        </Card>
      </div>
    </section>
  );
}
`,
      },
    ],
  },
  'application-sidebar-block': {
    id: 'application-sidebar-block',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/application-sidebar-block')),
    files: [
      {
        path: 'app/page.tsx',
        language: 'tsx',
        code: `import { ApplicationSidebarBlock } from "@olwiba/ui";

export default function Page() {
  return <ApplicationSidebarBlock />;
}
`,
      },
      {
        path: 'src/blocks/ApplicationSidebarBlock.tsx',
        language: 'tsx',
        code: `import { ApplicationSidebarBlock } from "@olwiba/ui";

export default function Example() {
  return <ApplicationSidebarBlock />;
}
`,
      },
    ],
  },
  'document-sidebar-block': {
    id: 'document-sidebar-block',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/document-sidebar-block')),
    files: [
      {
        path: 'app/page.tsx',
        language: 'tsx',
        code: `import { DocumentSidebarBlock } from "@olwiba/ui";

export default function Page() {
  return <DocumentSidebarBlock />;
}
`,
      },
      {
        path: 'src/blocks/DocumentSidebarBlock.tsx',
        language: 'tsx',
        code: `import { DocumentSidebarBlock } from "@olwiba/ui";

export default function Example() {
  return <DocumentSidebarBlock />;
}
`,
      },
    ],
  },
  'login-block': {
    id: 'login-block',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/login-block')),
    files: [
      {
        path: 'app/page.tsx',
        language: 'tsx',
        code: `import { LoginBlock } from "@olwiba/ui";

export default function Page() {
  return <LoginBlock />;
}
`,
      },
      {
        path: 'src/blocks/LoginBlock.tsx',
        language: 'tsx',
        code: `import { LoginBlock } from "@olwiba/ui";

export default function Example() {
  return <LoginBlock />;
}
`,
      },
    ],
  },
  'marketing-page': {
    id: 'marketing-page',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/marketing-page')),
    files: [
      {
        path: 'app/page.tsx',
        language: 'tsx',
        code: `import {
  MarketingNavBlock,
  MarketingHeroBlock,
  MarketingFeaturesBlock,
  MarketingStatsBlock,
  MarketingTestimonialsBlock,
  MarketingPricingBlock,
  MarketingCtaBlock,
  MarketingFooterBlock,
} from "@olwiba/ui";

export default function MarketingPage() {
  return (
    <div className="flex flex-col gap-4">
      <MarketingNavBlock />
      <MarketingHeroBlock />
      <MarketingFeaturesBlock />
      <MarketingStatsBlock />
      <MarketingTestimonialsBlock />
      <MarketingPricingBlock />
      <MarketingCtaBlock />
      <MarketingFooterBlock />
    </div>
  );
}
`,
      },
    ],
  },
  'billing-page': {
    id: 'billing-page',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/billing-page')),
    files: [
      {
        path: 'app/billing/page.tsx',
        language: 'tsx',
        code: `import { StatCard } from "@olwiba/ui";
import { Badge, Button, Separator, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@olwiba/cn";

// See the full source in the preview for the complete billing page composition.
export default function BillingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Nav + sidebar + billing content */}
    </div>
  );
}
`,
      },
    ],
  },
  'sign-in-page': {
    id: 'sign-in-page',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/sign-in-page')),
    files: [
      {
        path: 'app/sign-in/page.tsx',
        language: 'tsx',
        code: `import { MarketingNavBlock, AuthSplitBlock } from "@olwiba/ui";

export default function SignInPage() {
  return (
    <div className="flex flex-col gap-4">
      <MarketingNavBlock />
      <AuthSplitBlock />
    </div>
  );
}
`,
      },
    ],
  },
  'app-ui-page': {
    id: 'app-ui-page',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/app-ui-page')),
    files: [
      {
        path: 'app/dashboard/page.tsx',
        language: 'tsx',
        code: `import { DashboardShellBlock } from "@olwiba/ui";

export default function DashboardPage() {
  return <DashboardShellBlock />;
}
`,
      },
    ],
  },

  // ─── Marketing ───────────────────────────────────────────────────────────────

  'hero-section': {
    id: 'hero-section',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/hero-section')),
    files: [
      {
        path: 'app/page.tsx',
        language: 'tsx',
        code: `import { HeroSection } from "@olwiba/ui";

export default function Page() {
  return <HeroSection />;
}
`,
      },
    ],
  },
  'navbar': {
    id: 'navbar',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/navbar')),
    files: [
      {
        path: 'app/layout.tsx',
        language: 'tsx',
        code: `import { Navbar } from "@olwiba/ui";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
`,
      },
    ],
  },
  'features-section': {
    id: 'features-section',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/features-section')),
    files: [
      {
        path: 'app/page.tsx',
        language: 'tsx',
        code: `import { FeaturesSection } from "@olwiba/ui";

export default function Page() {
  return <FeaturesSection />;
}
`,
      },
    ],
  },
  'stats-section': {
    id: 'stats-section',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/stats-section')),
    files: [
      {
        path: 'app/page.tsx',
        language: 'tsx',
        code: `import { StatsSection } from "@olwiba/ui";

export default function Page() {
  return <StatsSection />;
}
`,
      },
    ],
  },
  'faq-section': {
    id: 'faq-section',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/faq-section')),
    files: [
      {
        path: 'app/page.tsx',
        language: 'tsx',
        code: `import { FaqSection } from "@olwiba/ui";

export default function Page() {
  return <FaqSection />;
}
`,
      },
    ],
  },
  'pricing-section': {
    id: 'pricing-section',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/pricing-section')),
    files: [
      {
        path: 'app/page.tsx',
        language: 'tsx',
        code: `import { PricingSection } from "@olwiba/ui";

export default function Page() {
  return <PricingSection />;
}
`,
      },
    ],
  },
  'testimonials-section': {
    id: 'testimonials-section',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/testimonials-section')),
    files: [
      {
        path: 'app/page.tsx',
        language: 'tsx',
        code: `import { TestimonialsSection } from "@olwiba/ui";

export default function Page() {
  return <TestimonialsSection />;
}
`,
      },
    ],
  },
  'team-section': {
    id: 'team-section',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/team-section')),
    files: [
      {
        path: 'app/page.tsx',
        language: 'tsx',
        code: `import { TeamSection } from "@olwiba/ui";

export default function Page() {
  return <TeamSection />;
}
`,
      },
    ],
  },
  'cta-section': {
    id: 'cta-section',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/cta-section')),
    files: [
      {
        path: 'app/page.tsx',
        language: 'tsx',
        code: `import { CtaSection } from "@olwiba/ui";

export default function Page() {
  return <CtaSection />;
}
`,
      },
    ],
  },
  'newsletter-section': {
    id: 'newsletter-section',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/newsletter-section')),
    files: [
      {
        path: 'app/page.tsx',
        language: 'tsx',
        code: `import { NewsletterSection } from "@olwiba/ui";

export default function Page() {
  return <NewsletterSection />;
}
`,
      },
    ],
  },
  'footer': {
    id: 'footer',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/footer')),
    files: [
      {
        path: 'app/layout.tsx',
        language: 'tsx',
        code: `import { Footer } from "@olwiba/ui";

export default function Layout({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
`,
      },
    ],
  },
  'contact-section': {
    id: 'contact-section',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/contact-section')),
    files: [
      {
        path: 'app/contact/page.tsx',
        language: 'tsx',
        code: `import { ContactSection } from "@olwiba/ui";

export default function ContactPage() {
  return <ContactSection />;
}
`,
      },
    ],
  },
};

registerSandboxes(uiSandboxes);
