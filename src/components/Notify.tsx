'use client';

/**
 * Toasts live in @olwiba/cn, next to the `<Toaster />` that renders them.
 *
 * This used to be a second implementation: a `NotificationToast` component
 * fired through sonner's `toast.custom`. That made it a JSX toast, and sonner
 * marks those `data-styled="false"` — which put it outside every rule the cn
 * Toaster ships, since all of them are scoped to `[data-styled='true']`. The
 * two systems looked identical when written and drifted apart the moment the
 * Toaster was reworked, with products getting whichever one they happened to
 * import.
 *
 * Re-exported rather than removed so `import { notify } from '@olwiba/ui'`
 * keeps working. New code should import it from @olwiba/cn directly.
 */
export { notify, dismissNotification } from '@olwiba/cn';
export type { NotifyOptions, NotifyAction, NotifyVariant } from '@olwiba/cn';
