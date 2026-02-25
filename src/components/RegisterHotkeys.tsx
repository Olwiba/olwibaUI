'use client';

import * as React from 'react';

export interface Hotkey {
  key: string;
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
  handler: () => void;
  description?: string;
}

interface RegisterHotkeysProps {
  hotkeys: Hotkey[];
}

export function RegisterHotkeys({ hotkeys }: RegisterHotkeysProps) {
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      for (const hotkey of hotkeys) {
        const matches =
          event.key.toLowerCase() === hotkey.key.toLowerCase() &&
          !!event.ctrlKey === !!hotkey.ctrl &&
          !!event.metaKey === !!hotkey.meta &&
          !!event.shiftKey === !!hotkey.shift &&
          !!event.altKey === !!hotkey.alt;

        if (matches) {
          event.preventDefault();
          hotkey.handler();
          break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [hotkeys]);

  return null;
}
