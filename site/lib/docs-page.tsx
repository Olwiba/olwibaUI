import { notFound } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { source } from '~/lib/source';
import '~/lib/sandboxes';
import browserCollections from 'fumadocs-mdx:collections/browser';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { useFumadocsLoader } from 'fumadocs-core/source/client';
import * as React from 'react';
import {
  mdxComponents,
  CopyCommandButton,
  DocsLayout,
  Sandbox,
  extractTextFromReactNode,
  type PageLoaderData,
  type TocItem,
  type SidebarSection,
} from '@olwiba/docs';
import { ComponentPreview } from '~/components/ComponentPreview';
import { findNeighbour } from 'fumadocs-core/page-tree';

export const sidebarSections: SidebarSection[] = [
  { name: 'Get Started', href: '/docs' },
  { name: 'App UI', href: '/docs/app' },
  { name: 'Marketing', href: '/docs/marketing' },
  { name: 'Layering', href: '/docs/overlays' },
  { name: 'Motion', href: '/docs/motion' },
  { name: 'Components', href: '/docs/components' },
  { name: 'Hooks', href: '/docs/hooks' },
];

export function getDocsSlugsFromPath(pathname: string) {
  const docsPrefix = '/docs';
  if (pathname === docsPrefix || pathname === `${docsPrefix}/`) return [''];

  if (!pathname.startsWith(`${docsPrefix}/`)) return [''];

  const rest = pathname.slice(docsPrefix.length + 1);
  return rest ? rest.split('/').filter(Boolean) : [''];
}

export const serverLoader = createServerFn({
  method: 'GET',
})
  .inputValidator((slugs: string[]) => slugs)
  .handler(async ({ data: slugs }) => {
    const page = source.getPage(slugs);
    if (!page) throw notFound();

    const pageTree = source.getPageTree();
    const neighbours = findNeighbour(pageTree, page.url);
    const rawContent = await page.data.getText('raw');

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
    } satisfies PageLoaderData;
  });

export const clientLoader = browserCollections.docs.createClientLoader({
  component({ default: MDX }) {
    return (
      <div className="w-full flex-1">
        <MDX
          components={{
            ...defaultMdxComponents,
            ...mdxComponents,
            ComponentPreview,
            CopyCommandButton,
            Sandbox,
          }}
        />
      </div>
    );
  },
});

function DocsContent({
  path,
}: {
  path: string;
}) {
  const content = clientLoader.useContent(path, undefined);

  return <>{content}</>;
}

export function DocsPage({ loaderData }: { loaderData: PageLoaderData }) {
  const data = useFumadocsLoader(loaderData);

  return (
    <DocsLayout loaderData={loaderData} pageTree={data.pageTree as any} sections={sidebarSections}>
      <DocsContent path={data.path} />
    </DocsLayout>
  );
}
