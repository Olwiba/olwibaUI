'use client';

import * as React from 'react';

export interface ConfirmOptions {
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

export interface UseConfirmReturn {
  confirm: (options?: ConfirmOptions) => Promise<boolean>;
  isOpen: boolean;
  options: ConfirmOptions;
  handleConfirm: () => void;
  handleCancel: () => void;
}

/**
 * Headless confirmation hook. Returns state and handlers for building a confirm dialog.
 *
 * @example
 * const { confirm, isOpen, options, handleConfirm, handleCancel } = useConfirm();
 *
 * // Trigger confirmation
 * const ok = await confirm({ title: 'Delete item?', description: 'This cannot be undone.' });
 *
 * // Wire up your dialog
 * <AlertDialog open={isOpen}>
 *   <AlertDialogContent>
 *     <AlertDialogTitle>{options.title}</AlertDialogTitle>
 *     <AlertDialogFooter>
 *       <AlertDialogCancel onClick={handleCancel} />
 *       <AlertDialogAction onClick={handleConfirm} />
 *     </AlertDialogFooter>
 *   </AlertDialogContent>
 * </AlertDialog>
 */
export function useConfirm(): UseConfirmReturn {
  const [isOpen, setIsOpen] = React.useState(false);
  const [options, setOptions] = React.useState<ConfirmOptions>({});
  const resolveRef = React.useRef<((value: boolean) => void) | null>(null);

  const confirm = React.useCallback((opts: ConfirmOptions = {}): Promise<boolean> => {
    setOptions(opts);
    setIsOpen(true);
    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve;
    });
  }, []);

  const handleConfirm = React.useCallback(() => {
    resolveRef.current?.(true);
    setIsOpen(false);
  }, []);

  const handleCancel = React.useCallback(() => {
    resolveRef.current?.(false);
    setIsOpen(false);
  }, []);

  return { confirm, isOpen, options, handleConfirm, handleCancel };
}
