declare module '@olwiba/cn' {
  import * as React from 'react';

  export const Button: React.ComponentType<any>;
  export const AsciiText: React.ComponentType<any>;
  export function useIsMobile(): boolean;

  export interface ConfettiOptions {
    [key: string]: unknown;
  }
  export function fireConfetti(options?: ConfettiOptions): void;
}

declare module '@olwiba/docs' {
  import * as React from 'react';

  export const Theme: {
    Purple: string;
    [key: string]: string;
  };

  export function createDocsRoot(config: Record<string, unknown>): unknown;
  export const DocsHeader: React.ComponentType<any>;
  export const DocsLayout: React.ComponentType<any>;
  export const CopyCommandButton: React.ComponentType<any>;
  export const mdxComponents: Record<string, React.ComponentType<any>>;
  export function extractTextFromReactNode(node: React.ReactNode): string;

  export interface SidebarSection {
    name: string;
    href: string;
  }

  export interface TocItem {
    title: string;
    url: string;
    depth: number;
  }

  export interface PageLoaderData {
    path: string;
    url: string;
    pageTree: unknown;
    frontmatter: { title?: string; description?: string };
    toc: TocItem[];
    rawContent: string;
    neighbours: {
      previous: { url: string; name: string } | null;
      next: { url: string; name: string } | null;
    };
  }
}

declare module '@olwiba/docs/server' {
  export function createServer(): unknown;
}
