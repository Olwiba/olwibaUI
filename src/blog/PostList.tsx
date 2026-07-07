'use client';

import * as React from 'react';
import { cn } from '@olwiba/cn';
import { PostCard, type PostCardProps } from './PostCard';
import type { AppShellRenderLink } from '../app/AppShell';

export interface PostListProps {
  posts: PostCardProps[];
  renderLink?: AppShellRenderLink;
  emptyMessage?: string;
  /** Max columns at the widest breakpoint. */
  columns?: 2 | 3;
  className?: string;
}

export function PostList({
  posts,
  renderLink,
  emptyMessage = 'No posts published yet.',
  columns = 3,
  className,
}: PostListProps) {
  if (posts.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic">{emptyMessage}</p>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2',
        columns === 3 && 'lg:grid-cols-3',
        className,
      )}
    >
      {posts.map((post) => (
        <PostCard key={post.slug} {...post} renderLink={renderLink} />
      ))}
    </div>
  );
}
