'use client';

import * as React from 'react';

export function useCopyToClipboard(): [boolean, (text: string) => void] {
  const [copied, setCopied] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  const copy = React.useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  React.useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return [copied, copy];
}
