'use client';

import * as React from 'react';
import { Badge as CNBadge, type BadgeProps as CNBadgeProps } from '@olwiba/cn';

// Badge no longer supports mode — variant/size/disabled only.
export type BadgeProps = CNBadgeProps;

export function Badge(props: BadgeProps) {
  return <CNBadge {...props} />;
}
