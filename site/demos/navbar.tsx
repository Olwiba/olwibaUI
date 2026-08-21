import { Orbit } from 'lucide-react';
import { Navbar } from '@olwiba/ui';

/**
 * Every prop is supplied deliberately. `brand` and `navLinks` are required, and
 * this demo previously rendered `<Navbar />` bare — which threw on `brand.href`
 * before the component painted anything, so the page showed no preview at all.
 *
 * The logo is a generic lucide mark in a tinted badge rather than a real brand
 * asset — the same 32px badge shape products actually pass (nestrrr's BrandLogo
 * is one), so the lockup's proportions are honest, without putting any one
 * product's branding in the docs.
 *
 * Lowercase throughout on purpose — a lowercase name has no cap-height and no
 * descenders, which is the least forgiving case for the vertical alignment
 * between the name and the logo badge beside it.
 */
export default function Demo() {
  return (
    <Navbar
      brand={{
        name: 'nexus',
        logo: (
          <span
            aria-hidden="true"
            className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
          >
            {/* Orbit: space-themed for "nexus", and radially balanced, so it
                has no optical top or bottom to fight the badge centring — which
                matters when the badge is the reference the wordmark aligns to. */}
            <Orbit className="size-5" />
          </span>
        ),
        href: '/',
      }}
      navLinks={[
        { label: 'features', href: '#features' },
        { label: 'pricing', href: '#pricing' },
        { label: 'docs', href: '#docs' },
      ]}
      cta={{
        secondary: { label: 'sign in', href: '#sign-in' },
        primary: { label: 'get started', href: '#get-started' },
      }}
    />
  );
}
