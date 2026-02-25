'use client';

import * as React from 'react';

interface ThemeColorUpdaterProps {
  colorTheme?: string;
}

/**
 * Applies a data-theme attribute to the document root when a color theme is selected.
 * Use CSS selectors like `[data-theme="blue"] { --primary: ... }` to apply theme colors.
 */
export function ThemeColorUpdater({ colorTheme }: ThemeColorUpdaterProps) {
  React.useEffect(() => {
    if (colorTheme) {
      document.documentElement.setAttribute('data-theme', colorTheme);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [colorTheme]);

  return null;
}
