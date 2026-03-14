'use client';

import * as React from 'react';
import { Link } from '@tanstack/react-router';
import type { Root, Node, Item } from 'fumadocs-core/page-tree';
import {
  ScrollArea,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@olwiba/cn';
import { cn } from '@olwiba/docs';

export interface SidebarSection {
  name: string;
  href: string;
}

export interface DocsSidebarProps extends React.ComponentProps<typeof Sidebar> {
  tree: Root;
  sections?: SidebarSection[];
  currentPath: string;
}

export function DocsSidebar({ tree, sections, currentPath, ...props }: DocsSidebarProps) {
  const navSections = sections ?? [];

  const logNavClick = React.useCallback(
    (to: string, label: string, kind: 'section' | 'group-index' | 'page') => {
      const payload = {
        from: currentPath,
        to,
        label,
        kind,
      };
      const params = new URLSearchParams({
        from: payload.from,
        to: payload.to,
        label: payload.label,
        kind: payload.kind,
      });

      console.log('[docs-nav-click:browser]', payload);

      void fetch(`/api/debug/nav/?${params.toString()}`, {
        method: 'GET',
        keepalive: true,
      }).catch((error) => {
        console.error('[docs-nav-click:error]', error);
      });
    },
    [currentPath],
  );

  const itemClass =
    'block h-[30px] w-fit rounded-md border border-transparent px-2 py-1.5 text-[0.8rem] font-medium';

  return (
    <Sidebar
      className="sticky top-[calc(var(--header-height)+1px)] z-30 hidden h-[calc(100svh-var(--header-height)-1px)] w-[220px] self-start overscroll-none bg-transparent lg:flex lg:w-[240px]"
      collapsible="none"
      {...props}
    >
      <SidebarContent className="relative no-scrollbar overflow-x-hidden">
        <div className="pointer-events-none absolute top-0 right-0 left-0 z-10 h-8 bg-gradient-to-b from-background to-transparent" />
        <ScrollArea className="h-full w-full">
          <div className="h-[var(--top-spacing)] shrink-0" />
          <div className="px-2 pb-12">
            {navSections.length > 0 && (
              <SidebarGroup>
                <SidebarGroupLabel className="font-medium text-muted-foreground">
                  Sections
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <div className="flex flex-col gap-1">
                    {navSections.map(({ name, href }) => (
                      <Link
                        className={cn(
                          itemClass,
                          href === '/docs'
                            ? currentPath === href
                              ? 'border-accent bg-accent'
                              : ''
                            : currentPath.startsWith(href)
                              ? 'border-accent bg-accent'
                              : ''
                        )}
                        key={name}
                        onClick={() => logNavClick(href, name, 'section')}
                        preload={false}
                        to={href}
                      >
                        {name}
                      </Link>
                    ))}
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
            )}

            {tree.children.map((item: Node) => {
              if (item.$id === 'root:index.mdx') return null;
              if (item.$id === 'root:themes.mdx') return null;

              return (
                <SidebarGroup key={item.$id}>
                  <SidebarGroupLabel className="font-medium text-muted-foreground">
                    {item.type === 'folder' && item.index ? (
                      <Link
                        className="transition-colors hover:text-foreground"
                        onClick={() => logNavClick(item.index!.url, String(item.name ?? ''), 'group-index')}
                        preload={false}
                        to={item.index.url}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      item.name
                    )}
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    {item.type === 'folder' && (
                      <div className="flex flex-col gap-0.5">
                        {item.children
                          .filter((childItem: Node) => {
                            if (childItem.type !== 'page') return false;
                            if (childItem.url === '/docs') return false;
                            if (childItem.$id?.endsWith('index.mdx')) return false;
                            return true;
                          })
                          .map((childItem: Node) => {
                            const page = childItem as Item;
                            return (
                              <Link
                                className={cn(
                                  itemClass,
                                  page.url === currentPath ? 'border-accent bg-accent' : ''
                                )}
                                key={page.url}
                                onClick={() => logNavClick(page.url, String(page.name ?? ''), 'page')}
                                preload={false}
                                to={page.url}
                              >
                                {page.name}
                              </Link>
                            );
                          })}
                      </div>
                    )}
                  </SidebarGroupContent>
                </SidebarGroup>
              );
            })}
          </div>
        </ScrollArea>
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-12 bg-gradient-to-t from-background to-transparent" />
      </SidebarContent>
    </Sidebar>
  );
}
