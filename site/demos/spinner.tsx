import { Spinner } from '@olwiba/ui';

export default function SpinnerDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <Spinner size="sm" />
          <span className="text-xs text-muted-foreground">sm</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Spinner size="md" />
          <span className="text-xs text-muted-foreground">md</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Spinner size="lg" />
          <span className="text-xs text-muted-foreground">lg</span>
        </div>
      </div>
    </div>
  );
}
