'use client';
import { usePagination } from '@olwiba/ui';
import { Button } from '@olwiba/cn';

const ALL_ITEMS = Array.from({ length: 23 }, (_, i) => `Item ${i + 1}`);

export default function Demo() {
  const { page, totalPages, offset, pageSize, hasPrev, hasNext, prev, next, goTo } = usePagination(ALL_ITEMS.length, 5);
  const pageItems = ALL_ITEMS.slice(offset, offset + pageSize);

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="space-y-1.5">
        {pageItems.map((item) => (
          <div key={item} className="rounded-xl border bg-card px-4 py-2.5 text-sm">{item}</div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-2">
        <Button variant="outline" size="sm" disabled={!hasPrev} onClick={prev}>Previous</Button>
        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => (
            <Button key={i} size="sm" variant={page === i + 1 ? 'default' : 'outline'} className="size-8 p-0" onClick={() => goTo(i + 1)}>
              {i + 1}
            </Button>
          ))}
        </div>
        <Button variant="outline" size="sm" disabled={!hasNext} onClick={next}>Next</Button>
      </div>
    </div>
  );
}
