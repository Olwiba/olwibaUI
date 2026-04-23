import { createFileRoute } from '@tanstack/react-router';
import { DocsPage, clientLoader, logDocsLoader, serverLoader } from '~/lib/docs-page';
import type { PageLoaderData } from '@olwiba/docs';

export const Route = createFileRoute('/docs/')({
  component: Page,
  loader: async ({ cause }) => {
    const slugs = [''];
    logDocsLoader('docs-index', cause, '', slugs);
    const data = (await serverLoader({ data: slugs })) as PageLoaderData;
    await clientLoader.preload(data.path);
    console.log(`[docs-loader] resolved path=${data.path} url=${data.url}`);
    return data;
  },
});

function Page() {
  const loaderData = Route.useLoaderData() as PageLoaderData;
  return <DocsPage loaderData={loaderData} />;
}
