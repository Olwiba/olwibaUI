import { Navbar } from '@olwiba/ui';
import { demoBrandLogo, demoBrandName } from '~/lib/demo-brand';

/**
 * Every prop is supplied deliberately. `brand` and `navLinks` are required, and
 * this demo previously rendered `<Navbar />` bare — which threw on `brand.href`
 * before the component painted anything, so the page showed no preview at all.
 *
 * The lockup comes from `~/lib/demo-brand`, shared with the AppShell demo, so
 * the marketing header and the app sidebar are showing the same badge rather
 * than two copies that can drift apart.
 *
 * Lowercase throughout on purpose — a lowercase name has no cap-height and no
 * descenders, which is the least forgiving case for the vertical alignment
 * between the name and the logo badge beside it.
 */
export default function Demo() {
  return (
    <Navbar
      brand={{ name: demoBrandName, logo: demoBrandLogo, href: '/' }}
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
