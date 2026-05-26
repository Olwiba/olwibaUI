import * as React from 'react';
import { useMDXComponent } from '@content-collections/mdx/react';
import { cn } from '../lib/utils';

const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={cn('mt-8 scroll-m-20 text-3xl font-bold tracking-tight text-foreground first:mt-0', className)} {...props} />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className={cn('mt-10 scroll-m-20 text-2xl font-semibold tracking-tight text-foreground first:mt-0', className)} {...props} />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={cn('mt-8 scroll-m-20 text-xl font-semibold tracking-tight text-foreground', className)} {...props} />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className={cn('mt-6 scroll-m-20 text-lg font-semibold tracking-tight text-foreground', className)} {...props} />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn('leading-7 text-muted-foreground [&:not(:first-child)]:mt-6', className)} {...props} />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn('my-6 ml-6 list-disc text-muted-foreground', className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn('my-6 ml-6 list-decimal text-muted-foreground', className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn('mt-2', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className={cn('mt-6 rounded-r-lg border-l-4 border-primary bg-muted py-4 pl-6 pr-4 italic text-muted-foreground', className)} {...props} />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-border" {...props} />
  ),
  img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img className={cn('rounded-lg border shadow-sm', className)} alt={alt} {...props} />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className={cn('mt-6 mb-4 overflow-x-auto rounded-lg bg-muted p-4 text-sm', className)} {...props} />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code className={cn('relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm text-foreground', className)} {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto rounded-lg border border-border">
      <table className={cn('w-full', className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn('m-0 border-t border-border p-0 even:bg-muted', className)} {...props} />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className={cn('border border-border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right', className)} {...props} />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className={cn('border border-border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right', className)} {...props} />
  ),
  a: ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className={cn('font-medium text-primary underline underline-offset-4 hover:text-primary/80', className)} {...props} />
  ),
};

export interface MdxContentProps {
  code: string;
}

export function MdxContent({ code }: MdxContentProps) {
  const MDXComponent = useMDXComponent(code);
  return <MDXComponent components={components} />;
}
