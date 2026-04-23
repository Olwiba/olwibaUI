import { notFound, useLocation } from '@tanstack/react-router';
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

function getBrowserPathname() {
  return typeof window === 'undefined' ? '' : window.location.pathname;
}

function debugBrowserEvent(kind: string, payload: Record<string, string>) {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams({
    timestamp: new Date().toISOString(),
    kind,
  });

  for (const [key, value] of Object.entries(payload)) {
    if (value) params.set(key, value);
  }

  const data = Object.fromEntries(params.entries());
  console.log(`[docs-debug:${kind}]`, data);

  void fetch(`/api/debug/nav/?${params.toString()}`, {
    method: 'GET',
    keepalive: true,
  }).catch(() => {});
}

export function logDocsLoader(route: string, cause: string, splat: string | undefined, slugs: string[]) {
  console.log(`[docs-loader] route=${route} cause=${cause} splat="${splat}" slugs=`, slugs);
}

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
  loaderData,
  routerPath,
}: {
  path: string;
  loaderData: PageLoaderData;
  routerPath: string;
}) {
  const content = clientLoader.useContent(path, undefined);

  React.useEffect(() => {
    debugBrowserEvent('content-commit', {
      browserUrl: getBrowserPathname(),
      routerPath,
      contentPath: path,
      loaderPath: loaderData.path,
      loaderUrl: loaderData.url,
      title: loaderData.frontmatter.title ?? '',
    });
  }, [loaderData.frontmatter.title, loaderData.path, loaderData.url, path, routerPath]);

  return <>{content}</>;
}

export function DocsPage({ loaderData }: { loaderData: PageLoaderData }) {
  const data = useFumadocsLoader(loaderData);
  const location = useLocation();
  const previousPathRef = React.useRef<string | null>(null);
  const routerPath = location.pathname ?? '';
  const pageTitle = loaderData.frontmatter.title ?? '';

  React.useEffect(() => {
    debugBrowserEvent('snapshot', {
      browserUrl: getBrowserPathname(),
      routerPath,
      loaderPath: loaderData.path,
      loaderUrl: loaderData.url,
      title: pageTitle,
    });
  }, [loaderData.path, loaderData.url, pageTitle, routerPath]);

  React.useEffect(() => {
    if (previousPathRef.current && previousPathRef.current !== routerPath) {
      debugBrowserEvent('route-change', {
        from: previousPathRef.current,
        to: routerPath,
        browserUrl: getBrowserPathname(),
        loaderPath: loaderData.path,
        loaderUrl: loaderData.url,
        title: pageTitle,
      });
    }

    previousPathRef.current = routerPath;
  }, [loaderData.path, loaderData.url, pageTitle, routerPath]);

  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest('a[href]');
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.getAttribute('href') ?? '';
      if (!href.startsWith('/docs')) return;

      debugBrowserEvent('click', {
        from: getBrowserPathname(),
        to: href,
        label: anchor.textContent?.trim().slice(0, 80) ?? '',
        loaderPath: loaderData.path,
        loaderUrl: loaderData.url,
        title: pageTitle,
      });
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [loaderData.path, loaderData.url, pageTitle]);

  React.useEffect(() => {
    const handlePopState = () => {
      debugBrowserEvent('popstate', {
        browserUrl: getBrowserPathname(),
        routerPath,
        loaderPath: loaderData.path,
        loaderUrl: loaderData.url,
        title: pageTitle,
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [loaderData.path, loaderData.url, pageTitle, routerPath]);

  return (
    <DocsLayout loaderData={loaderData} pageTree={data.pageTree as any} sections={sidebarSections}>
      <DocsContent path={data.path} loaderData={loaderData} routerPath={routerPath} />
    </DocsLayout>
  );
}
