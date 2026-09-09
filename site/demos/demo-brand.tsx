import { Orbit } from 'lucide-react';

/**
 * The brand lockup shared by the Navbar and AppShell demos.
 *
 * One definition rather than two copies, because the whole point of showing it
 * in both places is that they agree — a badge whose radius or size drifted
 * between the two previews would be demonstrating the opposite.
 *
 * `rounded-lg` matches AppShell's own fallback badge, so a product that passes
 * no logo lands on the same silhouette as one that does. Orbit is radially
 * balanced, so it has no optical top or bottom to fight the badge's centring.
 */
export const demoBrandLogo = (
  <span
    aria-hidden="true"
    className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"
  >
    <Orbit className="size-5" />
  </span>
);

export const demoBrandName = 'nexus';
