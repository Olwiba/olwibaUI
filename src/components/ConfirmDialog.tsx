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
          <AlertDialogAction
            onClick={handleConfirm}
            className={destructive ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : undefined}
          >
            {options.confirmLabel ?? 'Confirm'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
