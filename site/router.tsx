import { createRouter } from '@tanstack/react-router';
import { RootErrorFallback } from '@olwiba/ui';
import { routeTree } from './routeTree.gen';

export function getRouter() {
  return createRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultStaleReloadMode: 'blocking',
    scrollRestoration: true,
    defaultErrorComponent: RootErrorFallback,
  });
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
