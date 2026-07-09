'use client';

import * as React from 'react';
import { Check, Loader2 } from 'lucide-react';
import { cn } from '@olwiba/cn';
import { Button } from '../primitives/Button';

export interface OnboardingStep {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
  /** Runs before advancing past this step. Return `false`/an error string to block. */
  onNext?: () => boolean | string | Promise<boolean | string>;
}

export interface OnboardingWizardProps {
  steps: OnboardingStep[];
  /** Called after the last step's `onNext` succeeds. */
  onComplete?: () => void;
  onStepChange?: (index: number) => void;
  /** Controlled current step index — omit to let the component manage it internally. */
  step?: number;
  onStepIndexChange?: (index: number) => void;
  completeLabel?: string;
  className?: string;
}

/**
 * Stateful multi-step onboarding flow. One component driven by a `steps`
 * prop — swap the array to reshape the flow rather than hand-building a
 * new wizard per feature.
 */
export function OnboardingWizard({
  steps,
  onComplete,
  onStepChange,
  step: stepProp,
  onStepIndexChange,
  completeLabel = 'Finish',
  className,
}: OnboardingWizardProps) {
  const [internalStep, setInternalStep] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);
  const [pending, setPending] = React.useState(false);
  const index = stepProp ?? internalStep;
  const current = steps[index];
  const isLast = index === steps.length - 1;

  const goTo = (next: number) => {
    setError(null);
    if (stepProp === undefined) setInternalStep(next);
    onStepIndexChange?.(next);
    onStepChange?.(next);
  };

  const handleNext = async () => {
    if (current.onNext) {
      setPending(true);
      let result: boolean | string;
      try {
        result = await current.onNext();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
        return;
      } finally {
        setPending(false);
      }
      if (result === false) { setError('Please complete this step before continuing.'); return; }
      if (typeof result === 'string') { setError(result); return; }
    }
    if (isLast) {
      onComplete?.();
    } else {
      goTo(index + 1);
    }
  };

  const handleBack = () => {
    if (index > 0) goTo(index - 1);
  };

  return (
    <div className={cn('w-full max-w-lg space-y-8', className)}>
      <ol className="flex items-center" aria-label="Progress">
        {steps.map((step, i) => (
          <li
            key={step.id}
            aria-current={i === index ? 'step' : undefined}
            className={cn('flex items-center', i !== steps.length - 1 && 'flex-1')}
          >
            <div
              className={cn(
                'flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-medium',
                i < index ? 'border-primary bg-primary text-primary-foreground' : i === index ? 'border-primary text-primary' : 'border-border text-muted-foreground',
              )}
            >
              {i < index ? <Check className="size-4" /> : i + 1}
              <span className="sr-only">{step.title}{i < index ? ' (completed)' : ''}</span>
            </div>
            {i !== steps.length - 1 && (
              <div className={cn('mx-2 h-px flex-1', i < index ? 'bg-primary' : 'bg-border')} />
            )}
          </li>
        ))}
      </ol>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">{current.title}</h2>
          {current.description && <p className="mt-1 text-sm text-muted-foreground">{current.description}</p>}
        </div>
        <div>{current.content}</div>
        {error && <p role="alert" className="text-sm font-medium text-destructive">{error}</p>}
      </div>

      <div className="flex items-center justify-between">
        <Button type="button" variant="ghost" onClick={handleBack} disabled={index === 0 || pending}>
          Back
        </Button>
        <Button type="button" onClick={handleNext} disabled={pending}>
          {pending && <Loader2 className="size-4 animate-spin" />}
          {pending ? 'Please wait…' : isLast ? completeLabel : 'Continue'}
        </Button>
      </div>
    </div>
  );
}
