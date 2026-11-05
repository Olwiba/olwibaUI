import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/llms-full.txt')({
  server: {
    handlers: {
      GET: async () => {
        const [{ docsLlmsResponse }, { source }] = await Promise.all([import('@olwiba/docs/agent'), import('~/lib/source')]);
        return docsLlmsResponse(source, {
          full: true,
          title: 'olwibaUI',
          description:
            'App shells, marketing sections, interactive components and hooks for TanStack Start apps (@olwiba/ui), built on @olwiba/cn primitives. Paid page patterns live in @olwiba/ui-pro.',
        });
      },
    },
  },
});
