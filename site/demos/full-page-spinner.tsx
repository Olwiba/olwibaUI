import { FullPageSpinner } from '@olwiba/ui';

export default function FullPageSpinnerDemo() {
  return (
    <div className="relative h-40 w-full max-w-sm rounded-lg border border-dashed overflow-hidden">
      <FullPageSpinner message="Loading..." />
    </div>
  );
}
