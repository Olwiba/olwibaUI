import { createFileRoute } from '@tanstack/react-router';
import { source } from '~/lib/source';

export const Route = createFileRoute('/api/pages/')({
  server: {
    handlers: {
      GET: async () => {
        const pages = source.getPages().map((page) => ({
          title: page.data.title ?? page.url,
          description: page.data.description,
          url: page.url,
        }));

        return Response.json(pages);
      },
    },
  },
});
