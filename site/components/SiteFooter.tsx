export function SiteFooter() {
  return (
    <footer className="flex h-14 shrink-0 items-center gap-2 border-t border-dashed">
      <div className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between gap-2 border-r border-l border-dashed px-4 lg:px-6">
        <p className="text-muted-foreground text-xs md:text-sm">
          Built with 💖 by{' '}
          <a
            className="underline"
            href="https://github.com/Olwiba"
            target="_blank"
            rel="noopener noreferrer"
          >
            Olwiba
          </a>
        </p>
        <a
          className="text-muted-foreground text-xs underline md:text-sm"
          href="https://github.com/Olwiba/olwibaUI/blob/master/CHANGELOG.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          Changelog
        </a>
      </div>
    </footer>
  );
}
