'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@olwiba/cn';
import type { UseConfirmReturn } from '../hooks/use-confirm';

export interface ConfirmDialogProps extends Pick<UseConfirmReturn, 'isOpen' | 'options' | 'handleConfirm' | 'handleCancel'> {
  destructive?: boolean;
}

export function ConfirmDialog({ isOpen, options, handleConfirm, handleCancel, destructive = false }: ConfirmDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => { if (!open) handleCancel(); }}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{options.title ?? 'Are you sure?'}</AlertDialogTitle>
          {options.description && (
            <AlertDialogDescription>{options.description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>
            {options.cancelLabel ?? 'Cancel'}
          </AlertDialogCancel>
          {/* The button's own variant, not hand-written colours. This used to
              set `text-destructive-foreground`, a token the theme does not
              define — so the background went red and the label stayed black.
              Going through the variant means it cannot drift from the real
              destructive button again. */}
          <AlertDialogAction
            onClick={handleConfirm}
            variant={destructive ? 'destructive' : undefined}
          >
            {options.confirmLabel ?? 'Confirm'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
