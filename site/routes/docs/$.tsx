import { createFileRoute, notFound } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { source } from '~/lib/source';
import '~/lib/sandboxes';
import browserCollections from 'fumadocs-mdx:collections/browser';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { useFumadocsLoader } from 'fumadocs-core/source/client';
import * as React from 'react';
import { mdxComponents, CopyCommandButton, extractTextFromReactNode, type PageLoaderData, type TocItem, type SidebarSection } from '@olwiba/docs';
import { ComponentPreview } from '~/components/ComponentPreview';
import { DocsSandbox } from '~/components/DocsSandbox';
import { DocsLayout } from '~/components/DocsLayout';
import { findNeighbour } from 'fumadocs-core/page-tree';

const sidebarSections: SidebarSection[] = [
  { name: 'Get Started', href: '/docs' },
  { name: 'Components', href: '/docs/components' },
  { name: 'Hooks', href: '/docs/hooks' },
  { name: 'Blocks', href: '/docs/blocks' },
  { name: 'Examples', href: '/docs/examples' },
];

export const Route = createFileRoute('/docs/$')({
  component: Page,
  loader: async ({ params }) => {
    const slugs = params._splat?.split('/') ?? [];
    const data = (await serverLoader({ data: slugs })) as PageLoaderData;
    await clientLoader.preload(data.path);
    return data;
  },
});

const serverLoader = createServerFn({
  method: 'GET',
})
  .inputValidator((slugs: string[]) => slugs)
  .handler(async ({ data: slugs }) => {
    const page = source.getPage(slugs);
    if (!page) throw notFound();

    const pageTree = source.getPageTree();
    const neighbours = findNeighbour(pageTree, page.url);
    const rawContent = await page.data.getText('raw');

    console.info(
      `[docs-page-load] ${JSON.stringify({
        timestamp: new Date().toISOString(),
        slugs,
        path: page.path,
        url: page.url,
        title: page.data.title,
      })}`,
    );

    return {
      path: page.path,
      url: page.url,
      pageTree: await source.serializePageTree(pageTree),
      frontmatter: {
        title: page.data.title,
        description: page.data.description,
      },
      toc: (page.data.toc ?? []).map((item: { title?: React.ReactNode; url: string; depth: number }) => ({
        title: extractTextFromReactNode(item.title),
        url: item.url,
        depth: item.depth,
      })) as TocItem[],
      rawContent,
      neighbours: {
        previous: neighbours.previous ? { url: neighbours.previous.url, name: extractTextFromReactNode(neighbours.previous.name) } : null,
        next: neighbours.next ? { url: neighbours.next.url, name: extractTextFromReactNode(neighbours.next.name) } : null,
      },
    };
  });

const clientLoader = browserCollections.docs.createClientLoader({
  component({ default: MDX }) {
    return (
      <div className="w-full flex-1">
        <MDX
          components={{
            ...defaultMdxComponents,
            ...mdxComponents,
            ComponentPreview,
            CopyCommandButton,
            Sandbox: DocsSandbox,
          }}
        />
      </div>
    );
  },
});

function Page() {
  const loaderData = Route.useLoaderData() as PageLoaderData;
  const data = useFumadocsLoader(loaderData);
  const content = clientLoader.useContent(loaderData.path, undefined);

  React.useEffect(() => {
    console.log('[docs-page-load:browser]', {
      path: loaderData.path,
      url: loaderData.url,
      title: loaderData.frontmatter.title,
    });
  }, [loaderData.frontmatter.title, loaderData.path, loaderData.url]);

  return (
    <DocsLayout loaderData={loaderData} pageTree={data.pageTree as any} sections={sidebarSections}>
      {content}
    </DocsLayout>
  );
}
