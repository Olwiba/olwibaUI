declare module '@olwiba/docs' {
  import * as React from 'react';

  export const Theme: {
    Purple: string;
    [key: string]: string;
  };

  export function createDocsRoot(config: Record<string, unknown>): unknown;
  export const DocsHeader: React.ComponentType<any>;
  export const DocsFooter: React.ComponentType<any>;
  export const DocsLayout: React.ComponentType<any>;
  export const DocsCopyPage: React.ComponentType<any>;
  export const DocsMobileNav: React.ComponentType<any>;
  export const DocsToc: React.ComponentType<any>;
  export const CopyCommandButton: React.ComponentType<any>;
  export const CopyButton: React.ComponentType<any>;
  export const mdxComponents: Record<string, React.ComponentType<any>>;
  export function extractTextFromReactNode(node: React.ReactNode): string;
  export function cn(...inputs: any[]): string;
  export const Sandbox: React.ComponentType<any>;
  export const CodeFence: React.ComponentType<any>;

  export interface SandboxDefinition {
    id: string;
    defaultViewport?: 'desktop' | 'tablet' | 'mobile' | 'custom';
    files: Array<{ path: string; language: string; code: string }>;
    preview: React.LazyExoticComponent<React.FC>;
  }

  export type SandboxRegistryInput =
    | SandboxDefinition[]
    | Record<string, SandboxDefinition>;

  export function registerSandboxes(input: SandboxRegistryInput): void;
  export function getSandboxDefinition(id: string): SandboxDefinition | undefined;

  export interface UIModeOption {
    value: string;
    label: string;
  }
  export interface UIModeDropdownProps {
    modes: UIModeOption[];
  }
  export const UIModeDropdown: React.ComponentType<UIModeDropdownProps>;
  export function getUIMode(): string;
  export function setUIMode(mode: string): void;
  export function subscribeUIMode(fn: (mode: string) => void): () => void;

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


