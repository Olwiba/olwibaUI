import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/debug/nav/')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const from = url.searchParams.get('from') ?? '';
        const to = url.searchParams.get('to') ?? '';
        const label = url.searchParams.get('label') ?? '';
        const kind = url.searchParams.get('kind') ?? '';
        const timestamp = new Date().toISOString();
        const line = `[docs-nav-click] ${JSON.stringify({ timestamp, from, to, label, kind })}\n`;

        process.stdout.write(line);

        return new Response(null, { status: 204 });
      },
    },
  },
});
