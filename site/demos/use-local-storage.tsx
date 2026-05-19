'use client';
import { useLocalStorage } from '@olwiba/ui';
import { Button } from '@olwiba/cn';

export default function Demo() {
  const [count, setCount] = useLocalStorage('demo-count', 0);

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <div className="w-40 rounded-2xl border bg-card p-6 text-center">
        <div className="text-4xl font-bold tabular-nums">{count}</div>
        <div className="mt-1 text-xs text-muted-foreground">persisted in localStorage</div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => setCount(count - 1)}>−</Button>
        <Button variant="outline" size="sm" onClick={() => setCount(0)}>Reset</Button>
        <Button size="sm" onClick={() => setCount(count + 1)}>+</Button>
      </div>
      <p className="text-xs text-muted-foreground">Value persists across page reloads.</p>
    </div>
  );
}
