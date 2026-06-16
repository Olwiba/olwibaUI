'use client';

import * as React from 'react';
import { cn } from '@olwiba/cn';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(deadline: string): TimeLeft | null {
  const diff = new Date(deadline).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export interface CountdownTimerProps {
  deadline: string;
  label?: string;
  className?: string;
  /** Compact inline mode — renders as "29d · 11h · 22m", no seconds, no label. For use inside badges. */
  compact?: boolean;
}

export function CountdownTimer({
  deadline,
  label = 'Founding price closes in',
  className,
  compact = false,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = React.useState<TimeLeft | null>(() => getTimeLeft(deadline));

  React.useEffect(() => {
    setTimeLeft(getTimeLeft(deadline));
    const id = setInterval(() => setTimeLeft(getTimeLeft(deadline)), 1000);
    return () => clearInterval(id);
  }, [deadline]);

  if (!timeLeft) return null;

  if (compact) {
    return (
      <span className={cn('font-mono tabular-nums', className)}>
        {timeLeft.days}d · {String(timeLeft.hours).padStart(2, '0')}h · {String(timeLeft.minutes).padStart(2, '0')}m · {String(timeLeft.seconds).padStart(2, '0')}s
      </span>
    );
  }

  const units = [
    { value: timeLeft.days, unit: 'd' },
    { value: timeLeft.hours, unit: 'h' },
    { value: timeLeft.minutes, unit: 'm' },
    { value: timeLeft.seconds, unit: 's' },
  ];

  return (
    <div className={cn('flex items-center justify-center gap-2 text-sm', className)}>
      <span className="text-muted-foreground">{label}</span>
      <span className="flex items-center gap-1 font-mono font-semibold tabular-nums">
        {units.map(({ value, unit }, i) => (
          <React.Fragment key={unit}>
            <span>
              {String(value).padStart(2, '0')}
              <span className="font-normal text-muted-foreground">{unit}</span>
            </span>
            {i < units.length - 1 && (
              <span className="text-muted-foreground/50">·</span>
            )}
          </React.Fragment>
        ))}
      </span>
    </div>
  );
}
