import '~/lib/sandboxes';
import browserCollections from 'fumadocs-mdx:collections/browser';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { useFumadocsLoader } from 'fumadocs-core/source/client';
import {
  mdxComponents,
  CopyCommandButton,
  DocsLayout,
  FeedbackSidebarItem,
  Sandbox,
  type PageLoaderData,
  type SidebarSection,
} from '@olwiba/docs';
import { ComponentPreview } from '~/components/ComponentPreview';
import { getFeedbackConfig, submitFeedback } from '~/lib/feedback-server';

export { serverLoader } from '~/lib/docs-loader';

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
    <DocsLayout
      loaderData={loaderData}
      pageTree={data.pageTree as any}
      sections={sidebarSections}
      sidebarBottomSlot={
        <FeedbackSidebarItem
          getConfig={() => getFeedbackConfig()}
          submit={(payload) => submitFeedback({ data: payload })}
        />
      }
    >
      <DocsContent path={data.path} />
    </DocsLayout>
  );
}
