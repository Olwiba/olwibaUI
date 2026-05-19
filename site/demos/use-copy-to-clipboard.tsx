'use client';
import { useCopyToClipboard } from '@olwiba/ui';
import { Button } from '@olwiba/cn';
import { Check, Copy } from 'lucide-react';

const snippet = 'bun add @olwiba/ui @olwiba/cn';

export default function Demo() {
  const [copied, copy] = useCopyToClipboard();

  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex items-center gap-2 rounded-xl border bg-muted px-4 py-2">
        <code className="font-mono text-sm">{snippet}</code>
        <Button size="icon" variant="ghost" className="size-7 shrink-0" onClick={() => copy(snippet)}>
          {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
        </Button>
      </div>
    </div>
  );
}
