'use client';

import * as React from 'react';

export interface UseControlledOpenReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Simple open/close state hook for modals, drawers, dropdowns, and any toggleable UI.
 *
 * @example
 * const { isOpen, open, close } = useControlledOpen();
 * return (
 *   <>
 *     <Button onClick={open}>Open</Button>
 *     <Dialog open={isOpen} onOpenChange={setIsOpen}>...</Dialog>
 *   </>
 * );
 */
export function useControlledOpen(defaultOpen = false): UseControlledOpenReturn {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);
  const toggle = React.useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle, setIsOpen };
}
