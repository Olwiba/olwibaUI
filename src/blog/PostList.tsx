'use client';

import * as React from 'react';
import { cn } from '@olwiba/cn';
import { PostCard, type PostCardProps } from './PostCard';
import type { AppShellRenderLink } from '../app/AppShell';

export interface PostListProps {
  posts: PostCardProps[];
  renderLink?: AppShellRenderLink;
  emptyMessage?: string;
  /**
   * Max columns at the widest breakpoint. When omitted, one- and two-post
   * collections are balanced automatically instead of leaving an empty third
   * column.
   */
  columns?: 2 | 3;
  className?: string;
}

export function PostList({
  posts,
  renderLink,
  emptyMessage = 'No posts published yet.',
  columns,
  className,
}: PostListProps) {
  if (posts.length === 0) {
    return <p className="text-sm text-muted-foreground italic">{emptyMessage}</p>;
  }

  const resolvedColumns = columns ?? (posts.length < 3 ? 2 : 3);
  const balancedShortListClassName =
    columns === undefined
      ? posts.length === 1
        ? 'mx-auto w-full max-w-md sm:grid-cols-1'
        : posts.length === 2
          ? 'mx-auto w-full max-w-3xl'
          : undefined
      : undefined;

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2',
        resolvedColumns === 3 && 'lg:grid-cols-3',
        balancedShortListClassName,
        className,
      )}
    >
      {posts.map((post) => (
        <PostCard key={post.slug} {...post} renderLink={renderLink} />
      ))}
    </div>
  );
}
