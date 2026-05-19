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

const navLinks = [
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "About", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];

export default function Layout({ children }) {
  return (
    <>
      {children}
      <Footer
        brand={{ name: "Nexus Inc" }}
        navLinks={navLinks}
      />
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

  // ─── Components ──────────────────────────────────────────────────────────────

  'dock': {
    id: 'dock',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/dock')),
    files: [{ path: 'components/Dock.tsx', language: 'tsx', code: `import { Dock } from "@olwiba/ui";
import { Bell, Home, Settings } from "lucide-react";

const items = [
  { icon: Home, label: "Home", onClick: () => {} },
  { icon: Bell, label: "Notifications", onClick: () => {} },
  { icon: Settings, label: "Settings", onClick: () => {} },
];

export default function Example() {
  return <Dock items={items} />;
}
` }],
  },

  'spotlight': {
    id: 'spotlight',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/spotlight')),
    files: [{ path: 'components/SpotlightDemo.tsx', language: 'tsx', code: `import { Spotlight } from "@olwiba/ui";
import { LayoutDashboard, Settings } from "lucide-react";

const groups = [
  {
    heading: "Pages",
    items: [
      { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="size-4" />, onSelect: () => {} },
    ],
  },
  {
    heading: "Settings",
    items: [
      { id: "settings", label: "Settings", icon: <Settings className="size-4" />, onSelect: () => {} },
    ],
  },
];

export default function Example() {
  return <Spotlight groups={groups} />;
}
` }],
  },

  'confirm-dialog': {
    id: 'confirm-dialog',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/confirm-dialog')),
    files: [{ path: 'components/ConfirmDemo.tsx', language: 'tsx', code: `import { ConfirmDialog, useConfirm } from "@olwiba/ui";
import { Button } from "@olwiba/cn";

export default function Example() {
  const { confirm, isOpen, options, handleConfirm, handleCancel } = useConfirm();

  async function handleDelete() {
    const ok = await confirm({
      title: "Delete project?",
      description: "This cannot be undone.",
      confirmLabel: "Delete",
    });
    if (ok) console.log("Deleted");
  }

  return (
    <>
      <Button variant="destructive" onClick={handleDelete}>Delete project</Button>
      <ConfirmDialog
        isOpen={isOpen}
        options={options}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        destructive
      />
    </>
  );
}
` }],
  },

  'context-menu': {
    id: 'context-menu',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/context-menu')),
    files: [{ path: 'components/ContextMenuDemo.tsx', language: 'tsx', code: `import { ContextMenu } from "@olwiba/ui";

const items = [
  { type: "item" as const, label: "Open", shortcut: "↵" },
  { type: "separator" as const },
  { type: "item" as const, label: "Delete", shortcut: "⌫" },
];

export default function Example() {
  return (
    <ContextMenu items={items}>
      <div className="rounded-xl border border-dashed p-8 text-sm text-muted-foreground">
        Right-click here
      </div>
    </ContextMenu>
  );
}
` }],
  },

  'glass-card': {
    id: 'glass-card',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/glass-card')),
    files: [{ path: 'components/GlassCardDemo.tsx', language: 'tsx', code: `import { GlassCard } from "@olwiba/ui";

export default function Example() {
  return (
    <div className="bg-gradient-to-br from-violet-500 to-cyan-400 p-12 rounded-2xl">
      <GlassCard blur="md" className="p-6">
        <h3 className="font-semibold">Glass card</h3>
        <p className="text-sm text-muted-foreground mt-1">Frosted glass effect.</p>
      </GlassCard>
    </div>
  );
}
` }],
  },

  'feature-card': {
    id: 'feature-card',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/feature-card')),
    files: [{ path: 'components/FeatureCardDemo.tsx', language: 'tsx', code: `import { FeatureCard } from "@olwiba/ui";
import { Zap } from "lucide-react";

export default function Example() {
  return (
    <FeatureCard
      icon={Zap}
      title="Fast by default"
      description="Built on optimised primitives."
      href="/docs"
    />
  );
}
` }],
  },

  'stat-card': {
    id: 'stat-card',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/stat-card')),
    files: [{ path: 'components/StatCardDemo.tsx', language: 'tsx', code: `import { StatCard } from "@olwiba/ui";

export default function Example() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard label="Revenue" value="£24,200" delta="+12%" trend="up" description="vs last month" />
      <StatCard label="Users" value="3,841" delta="+4%" trend="up" />
      <StatCard label="Churn" value="1.8%" delta="+0.3%" trend="down" />
    </div>
  );
}
` }],
  },

  'testimonial-card': {
    id: 'testimonial-card',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/testimonial-card')),
    files: [{ path: 'components/TestimonialCardDemo.tsx', language: 'tsx', code: `import { TestimonialCard } from "@olwiba/ui";

export default function Example() {
  return (
    <TestimonialCard
      quote="The component library cut our setup time in half."
      name="Sarah Chen"
      role="Product Engineer"
      company="Vercel"
      initials="SC"
      rating={5}
    />
  );
}
` }],
  },

  'pricing-card': {
    id: 'pricing-card',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/pricing-card')),
    files: [{ path: 'components/PricingCardDemo.tsx', language: 'tsx', code: `import { PricingCard } from "@olwiba/ui";

const features = [
  { label: "Unlimited projects", included: true },
  { label: "Priority support", included: true },
  { label: "Custom domains", included: true },
  { label: "SLA guarantee", included: false },
];

export default function Example() {
  return (
    <PricingCard
      name="Pro"
      price="£15"
      description="For teams shipping production apps."
      features={features}
      cta="Upgrade to Pro"
      highlighted
      badge="Most popular"
      onSelect={() => {}}
    />
  );
}
` }],
  },

  'image-card': {
    id: 'image-card',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/image-card')),
    files: [{ path: 'components/ImageCardDemo.tsx', language: 'tsx', code: `import { ImageCard } from "@olwiba/ui";

export default function Example() {
  return (
    <ImageCard
      src="https://picsum.photos/seed/landscape/640/360"
      alt="Landscape"
      overlay="subtle"
    >
      <h3 className="font-semibold text-lg text-white">Mountain escape</h3>
      <p className="text-sm text-white/80">Swiss Alps</p>
    </ImageCard>
  );
}
` }],
  },

  // ─── Motion ──────────────────────────────────────────────────────────────────

  'count-up': {
    id: 'count-up',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/count-up')),
    files: [{ path: 'components/CountUpDemo.tsx', language: 'tsx', code: `import { CountUp } from "@olwiba/ui";

export default function Example() {
  return (
    <div className="flex gap-8 text-center">
      <div>
        <CountUp to={12400} prefix="£" duration={1800} className="text-3xl font-bold" />
        <p className="text-sm text-muted-foreground">Revenue</p>
      </div>
      <div>
        <CountUp to={98.6} decimals={1} suffix="%" duration={1800} className="text-3xl font-bold" />
        <p className="text-sm text-muted-foreground">Uptime</p>
      </div>
    </div>
  );
}
` }],
  },

  'fade-in': {
    id: 'fade-in',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/fade-in')),
    files: [{ path: 'components/FadeInDemo.tsx', language: 'tsx', code: `import { FadeIn } from "@olwiba/ui";

export default function Example() {
  return (
    <FadeIn direction="up" delay={100}>
      <div className="rounded-xl border bg-card p-6">
        <h3 className="font-semibold">Fades in from below</h3>
        <p className="text-sm text-muted-foreground mt-1">Triggered on intersection.</p>
      </div>
    </FadeIn>
  );
}
` }],
  },

  'stagger-children': {
    id: 'stagger-children',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/stagger-children')),
    files: [{ path: 'components/StaggerDemo.tsx', language: 'tsx', code: `import { StaggerChildren } from "@olwiba/ui";

export default function Example() {
  return (
    <StaggerChildren className="flex flex-col gap-2" stagger={80}>
      {["Dashboard", "Analytics", "Projects", "Team"].map((item) => (
        <div key={item} className="rounded-xl border bg-card px-4 py-3 text-sm">
          {item}
        </div>
      ))}
    </StaggerChildren>
  );
}
` }],
  },

  'page-transition': {
    id: 'page-transition',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/page-transition')),
    files: [{ path: 'routes/page.tsx', language: 'tsx', code: `import { PageTransition } from "@olwiba/ui";

export default function Page() {
  return (
    <PageTransition variant="slide-up">
      <main className="p-6">
        <h1 className="text-2xl font-bold">Page content</h1>
        <p className="text-muted-foreground mt-2">Animates in on mount.</p>
      </main>
    </PageTransition>
  );
}
` }],
  },

  // ─── Hooks ───────────────────────────────────────────────────────────────────

  'use-copy-to-clipboard': {
    id: 'use-copy-to-clipboard',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/use-copy-to-clipboard')),
    files: [{ path: 'components/CopyButton.tsx', language: 'tsx', code: `import { useCopyToClipboard } from "@olwiba/ui";
import { Button } from "@olwiba/cn";
import { Check, Copy } from "lucide-react";

export function CopyButton({ text }: { text: string }) {
  const [copied, copy] = useCopyToClipboard();

  return (
    <Button size="sm" variant="outline" onClick={() => copy(text)}>
      {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}
` }],
  },

  'use-debounce': {
    id: 'use-debounce',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/use-debounce')),
    files: [{ path: 'components/SearchInput.tsx', language: 'tsx', code: `import { useDebounce } from "@olwiba/ui";
import { Input } from "@olwiba/cn";
import React from "react";

export function SearchInput() {
  const [query, setQuery] = React.useState("");
  const debounced = useDebounce(query, 400);

  // debounced updates 400ms after the user stops typing
  console.log("Search for:", debounced);

  return <Input placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />;
}
` }],
  },

  'use-intersection-observer': {
    id: 'use-intersection-observer',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/use-intersection-observer')),
    files: [{ path: 'components/LazySection.tsx', language: 'tsx', code: `import { useIntersectionObserver } from "@olwiba/ui";

export function LazySection() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={isVisible ? "opacity-100" : "opacity-0"}>
      {isVisible ? "Now visible!" : "Waiting to enter viewport..."}
    </div>
  );
}
` }],
  },

  'use-local-storage': {
    id: 'use-local-storage',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/use-local-storage')),
    files: [{ path: 'components/ThemePicker.tsx', language: 'tsx', code: `import { useLocalStorage } from "@olwiba/ui";

export function ThemePicker() {
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Current: {theme}
    </button>
  );
}
` }],
  },

  'use-media-query': {
    id: 'use-media-query',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/use-media-query')),
    files: [{ path: 'components/ResponsiveLayout.tsx', language: 'tsx', code: `import { useMediaQuery } from "@olwiba/ui";

export function ResponsiveLayout() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <div>
      <p>{isDesktop ? "Desktop layout" : "Mobile layout"}</p>
      <p>{prefersDark ? "Dark mode" : "Light mode"}</p>
    </div>
  );
}
` }],
  },

  'use-pagination': {
    id: 'use-pagination',
    defaultViewport: 'desktop',
    preview: React.lazy(() => import('~/demos/use-pagination')),
    files: [{ path: 'components/PaginatedList.tsx', language: 'tsx', code: `import { usePagination } from "@olwiba/ui";
import { Button } from "@olwiba/cn";

const ITEMS = Array.from({ length: 20 }, (_, i) => \`Item \${i + 1}\`);

export function PaginatedList() {
  const { page, totalPages, offset, pageSize, hasPrev, hasNext, prev, next } = usePagination(ITEMS.length, 5);
  const visible = ITEMS.slice(offset, offset + pageSize);

  return (
    <div className="space-y-2">
      {visible.map((item) => <div key={item} className="rounded border p-2 text-sm">{item}</div>)}
      <div className="flex gap-2">
        <Button size="sm" variant="outline" disabled={!hasPrev} onClick={prev}>Prev</Button>
        <span className="text-sm self-center">{page} / {totalPages}</span>
        <Button size="sm" variant="outline" disabled={!hasNext} onClick={next}>Next</Button>
      </div>
    </div>
  );
}
` }],
  },
};

registerSandboxes(uiSandboxes);
