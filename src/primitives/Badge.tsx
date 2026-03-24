'use client';

import * as React from 'react';
import { Badge as CNBadge, type BadgeProps as CNBadgeProps } from '@olwiba/cn';
import { useUIMode } from '../context/OlwibaUIContext';

export type BadgeProps = CNBadgeProps;

export function Badge({ playful, smooth, ...props }: BadgeProps) {
  const mode = useUIMode();
  return (
    <CNBadge
      playful={playful ?? mode === 'playful'}
      smooth={smooth ?? mode === 'smooth'}
      {...props}
    />
  );
}
