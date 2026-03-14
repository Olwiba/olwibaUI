import * as React from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Root } from 'fumadocs-core/page-tree';
import {
  DocsCopyPage,
  DocsMobileNav,
  DocsToc,
  type PageLoaderData,
  type SidebarSection,
} from '@olwiba/docs';
import { Button, SidebarProvider } from '@olwiba/cn';
import { DocsSidebar } from '~/components/DocsSidebar';

export interface LocalDocsLayoutProps {
  loaderData: PageLoaderData;
  pageTree: Root;
  sections?: SidebarSection[];
  children: React.ReactNode;
}

export function DocsLayout({
  loaderData,
  pageTree,
  sections,
  children,
}: LocalDocsLayoutProps) {
  return (
    <div className="flex flex-1 flex-col lg:px-2">
      <SidebarProvider className="min-h-min flex-1 items-start px-0 [--sidebar-width:220px] [--top-spacing:1.5rem] lg:[--sidebar-width:240px] lg:[--top-spacing:2rem]">
        <DocsSidebar currentPath={loaderData.url} sections={sections} tree={pageTree} />
        <div
          aria-hidden="true"
          className="hidden w-4 self-stretch border-x border-dashed blueprint-pattern lg:block"
        />
        <div className="min-w-0 flex-1">
          <DocsMobileNav sections={sections} tree={pageTree} />
          <div className="flex items-stretch xl:w-full">
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="h-[var(--top-spacing)] shrink-0" />
              <div className="flex w-full min-w-0 flex-1 flex-col gap-8 px-4 pb-6 text-neutral-800 md:px-6 lg:pb-8 dark:text-neutral-300">
                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
                      {loaderData.frontmatter.title}
                    </h1>
                    <div className="flex items-center gap-2 sm:gap-2">
                      <div className="hidden sm:block">
                        <DocsCopyPage
                          page={loaderData.rawContent}
                          url={
                            typeof window !== 'undefined'
                              ? window.location.href
                              : loaderData.url
                          }
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        {loaderData.neighbours.previous && (
                          <Button asChild className="size-8" size="icon" variant="secondary">
                            <Link to={loaderData.neighbours.previous.url}>
                              <ArrowLeft className="size-4" />
                              <span className="sr-only">Previous</span>
                            </Link>
                          </Button>
                        )}
                        {loaderData.neighbours.next && (
                          <Button asChild className="size-8" size="icon" variant="secondary">
                            <Link to={loaderData.neighbours.next.url}>
                              <ArrowRight className="size-4" />
                              <span className="sr-only">Next</span>
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-fit sm:hidden">
                    <DocsCopyPage
                      page={loaderData.rawContent}
                      url={
                        typeof window !== 'undefined'
                          ? window.location.href
                          : loaderData.url
                      }
                    />
                  </div>
                  {loaderData.frontmatter.description && (
                    <p className="text-balance text-muted-foreground">
                      {loaderData.frontmatter.description}
                    </p>
                  )}
                </div>
                {loaderData.toc?.length > 0 && (
                  <div className="xl:hidden">
                    <DocsToc toc={loaderData.toc} variant="dropdown" />
                  </div>
                )}
                {children}
              </div>
              <div className="hidden h-16 w-full items-center gap-2 px-4 sm:flex md:px-6">
                {loaderData.neighbours.previous && (
                  <Button asChild size="sm" variant="secondary">
                    <Link to={loaderData.neighbours.previous.url}>
                      <ArrowLeft className="size-4" /> {loaderData.neighbours.previous.name}
                    </Link>
                  </Button>
                )}
                {loaderData.neighbours.next && (
                  <Button asChild className="ml-auto" size="sm" variant="secondary">
                    <Link to={loaderData.neighbours.next.url}>
                      {loaderData.neighbours.next.name} <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            {loaderData.toc?.length > 0 && (
              <>
                <div
                  aria-hidden="true"
                  className="hidden w-4 self-stretch border-x border-dashed blueprint-pattern xl:block"
                />
                <div className="hidden w-72 shrink-0 flex-col pb-4 lg:pb-6 xl:flex">
                  <div className="h-[var(--top-spacing)] shrink-0" />
                  <div className="sticky top-[calc(var(--header-height)+13px)] z-30 max-h-[calc(100svh-var(--header-height)-1px)] overflow-hidden overscroll-none">
                    <div className="no-scrollbar overflow-y-auto px-8 pb-2">
                      <DocsToc toc={loaderData.toc} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
