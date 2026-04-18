'use client';

import * as React from 'react';
import { Badge, cn } from '@olwiba/cn';
import type { AppShellRenderLink } from '../app/AppShell';

export interface PostCardProps {
  title: string;
  description?: string;
  date: string;
  slug: string;
  image?: string;
  tags?: string[];
  renderLink?: AppShellRenderLink;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function PostCard({ title, description, date, slug, image, tags, renderLink }: PostCardProps) {
  const href = `/blog/${slug}`;

  const LinkWrapper = ({ children, className }: { children: React.ReactNode; className?: string }) =>
    renderLink ? renderLink({ href, children, className }) : <a href={href} className={className}>{children}</a>;

  return (
    <article className="group flex flex-col gap-3">
      {image && (
        <LinkWrapper className="block overflow-hidden rounded-xl">
          <img
            src={image}
            alt={title}
            className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </LinkWrapper>
      )}
      <div className="flex flex-col gap-2">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <h2 className="text-lg font-semibold leading-snug tracking-tight">
          <LinkWrapper className="hover:text-primary transition-colors">
            {title}
          </LinkWrapper>
        </h2>
        {description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>
        )}
        <time dateTime={date} className="text-xs text-muted-foreground">
          {formatDate(date)}
        </time>
      </div>
    </article>
  );
}
