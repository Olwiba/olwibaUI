import { createFileRoute } from '@tanstack/react-router';
import { DocsPage, clientLoader, getDocsSlugsFromPath, logDocsLoader, serverLoader } from '~/lib/docs-page';
import type { PageLoaderData } from '@olwiba/docs';

export const Route = createFileRoute('/docs/$')({
  component: Page,
  loader: async ({ params, cause, location }) => {
    const paramSlugs = params._splat?.split('/') ?? [];
    const locationSlugs = getDocsSlugsFromPath(location.pathname);
    console.log('[docs-loader:pathname-check]', {
      route: 'docs-splat',
      cause,
      pathname: location.pathname,
      splat: params._splat ?? '',
      paramSlugs,
      locationSlugs,
    });
    const slugs = locationSlugs;
    logDocsLoader('docs-splat', cause, params._splat, slugs);
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
