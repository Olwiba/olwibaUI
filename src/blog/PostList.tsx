'use client';

import * as React from 'react';
import { PostCard, type PostCardProps } from './PostCard';
import type { AppShellRenderLink } from '../app/AppShell';

export interface PostListProps {
  posts: PostCardProps[];
  renderLink?: AppShellRenderLink;
  emptyMessage?: string;
}

export function PostList({ posts, renderLink, emptyMessage = 'No posts published yet.' }: PostListProps) {
  if (posts.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic">{emptyMessage}</p>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {posts.map((post) => (
        <PostCard key={post.slug} {...post} renderLink={renderLink} />
      ))}
    </div>
  );
}
