'use client';
import { StaggerChildren } from '@olwiba/ui';

const items = ['Dashboard', 'Analytics', 'Projects', 'Team', 'Settings'];

export default function Demo() {
  return (
    <StaggerChildren className="flex flex-col gap-2 p-6" stagger={80}>
      {items.map((item) => (
        <div key={item} className="rounded-xl border bg-card px-4 py-3 text-sm font-medium">
          {item}
        </div>
      ))}
    </StaggerChildren>
  );
}
