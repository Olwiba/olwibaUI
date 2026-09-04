import { beforeEach, describe, expect, mock, test } from 'bun:test';

const calls = [];

// Captured rather than rendered: the thing under test is which duration
// reaches sonner, and the toast's markup is covered by its own component.
//
// The real module is spread back in because mock.module replaces it wholesale,
// and @olwiba/cn imports Toaster from here — without it the mock breaks an
// unrelated import chain rather than the thing under test.
const actualSonner = await import('sonner');

mock.module('sonner', () => ({
  ...actualSonner,
  toast: {
    custom: (_render, options) => {
      calls.push(options);
      return 'toast-id';
    },
    dismiss: () => {},
  },
}));

const { notify } = await import('../src/components/Notify.tsx');

beforeEach(() => {
  calls.length = 0;
});

describe('notify duration', () => {
  test('an explicit duration always wins', () => {
    notify({ variant: 'error', title: 'Boom', duration: 1234 });
    expect(calls[0].duration).toBe(1234);
  });

  test('errors linger, because a failure has to be read', () => {
    notify({ variant: 'error', title: 'Upload failed' });
    expect(calls[0].duration).toBe(10_000);
  });

  test('warnings linger, less so', () => {
    notify({ variant: 'warning', title: 'Trial ending' });
    expect(calls[0].duration).toBe(8_000);
  });

  test('a toast carrying an action gets time to act on it', () => {
    notify({
      variant: 'success',
      title: 'Monitor created',
      action: { label: 'View', onClick: () => {} },
    });
    expect(calls[0].duration).toBe(8_000);
  });

  test('a secondary action counts too', () => {
    notify({
      variant: 'info',
      title: 'Invite sent',
      secondaryAction: { label: 'Undo', onClick: () => {} },
    });
    expect(calls[0].duration).toBe(8_000);
  });

  test('a plain confirmation defers to the Toaster', () => {
    // undefined, not a number: a product that set its own Toaster default
    // should keep it rather than be silently overridden here.
    notify({ variant: 'success', title: 'Saved' });
    expect(calls[0].duration).toBeUndefined();
  });
});
