'use client';

import * as React from 'react';
import { CtaSection } from './CtaSection';
import type { AppShellRenderLink } from '../app/AppShell';

export interface CtaCardSectionProps {
  heading: string;
  description?: string;
  primaryCta: { label: string; href: string };
  footnote?: string;
  icon?: React.ReactNode;
  renderLink?: AppShellRenderLink;
}

/**
 * @deprecated Use `CtaSection` with `variant="showcase"` instead.
 * Will be removed in 0.2.0.
 */
export function CtaCardSection(props: CtaCardSectionProps) {
  return <CtaSection variant="showcase" {...props} />;
}
