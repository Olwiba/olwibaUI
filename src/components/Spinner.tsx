import { Spinner } from '@olwiba/cn';

interface FullPageSpinnerProps {
  message?: string;
}

export function FullPageSpinner({ message }: FullPageSpinnerProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <Spinner className="size-8" />
      {message && <p className="text-muted-foreground text-sm">{message}</p>}
    </div>
  );
}
