'use client';

import * as React from 'react';
import type { AppShellRenderLink } from '../app/AppShell';

export interface PostAuthor {
  name: string;
  role?: string;
  avatar?: string;
}

export interface PostCardProps {
  title: string;
  description?: string;
  date: string;
  slug: string;
  image?: string;
  tags?: string[];
  author?: PostAuthor;
  hrefPrefix?: string;
  tagHrefPrefix?: string;
  renderLink?: AppShellRenderLink;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function PostCard({
  title,
  description,
  date,
  slug,
  image,
  tags,
  author,
  hrefPrefix = '/blog',
  tagHrefPrefix = '/blog/tag',
  renderLink,
}: PostCardProps) {
  const href = `${hrefPrefix}/${slug}`;

  const LinkWrapper = ({
    href: linkHref,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) =>
    renderLink ? (
      renderLink({ href: linkHref, children, className })
    ) : (
      <a href={linkHref} className={className}>
        {children}
      </a>
    );

  return (
    <article className="group relative flex flex-col items-start">
      <div className="relative w-full overflow-hidden rounded-2xl bg-muted">
        {image ? (
          <img
            src={image}
            alt={title}
            className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden
            className="aspect-video w-full bg-gradient-to-br from-primary/15 via-muted to-muted"
          />
        )}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/10" />
      </div>

      <div className="flex w-full grow flex-col">
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
          <time dateTime={date} className="text-muted-foreground">
            {formatDate(date)}
          </time>
          {tags?.map((tag) => (
            <LinkWrapper
              key={tag}
              href={`${tagHrefPrefix}/${encodeURIComponent(tag)}`}
              className="relative z-10 rounded-full bg-muted px-3 py-1.5 font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {tag}
            </LinkWrapper>
          ))}
        </div>

        <div className="grow">
          <h2 className="mt-3 text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary">
            <LinkWrapper href={href}>
              <span className="absolute inset-0" aria-hidden />
              {title}
            </LinkWrapper>
          </h2>
          {description && (
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        {author && (
          <div className="mt-6 flex items-center gap-x-3">
            {author.avatar ? (
              <img
                src={author.avatar}
                alt={author.name}
                className="size-9 rounded-full bg-muted object-cover"
              />
            ) : (
              <span
                aria-hidden
                className="flex size-9 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground"
              >
                {author.name.charAt(0).toUpperCase()}
              </span>
            )}
            <div className="text-sm leading-tight">
              <p className="font-semibold">{author.name}</p>
              {author.role && <p className="text-muted-foreground">{author.role}</p>}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
