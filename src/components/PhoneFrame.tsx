import * as React from 'react';
import { cn } from '../lib/utils';

const sizes = {
  sm: { outer: 'w-44', height: 'h-80', notch: 'w-16 h-4', border: 'rounded-[2rem]', screen: 'rounded-[1.75rem]' },
  md: { outer: 'w-56', height: 'h-[26rem]', notch: 'w-20 h-5', border: 'rounded-[2.5rem]', screen: 'rounded-[2.25rem]' },
  lg: { outer: 'w-72', height: 'h-[34rem]', notch: 'w-24 h-6', border: 'rounded-[3rem]', screen: 'rounded-[2.75rem]' },
} as const;

export interface PhoneFrameProps {
  children?: React.ReactNode;
  size?: keyof typeof sizes;
  className?: string;
  float?: boolean;
}

export function PhoneFrame({ children, size = 'md', className, float = true }: PhoneFrameProps) {
  const s = sizes[size];
  return (
    <>
      {float && (
        <style>{`
          @keyframes olwiba-phone-float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          .olwiba-phone-float { animation: olwiba-phone-float 5s ease-in-out infinite; }
        `}</style>
      )}
      <div
        className={cn(
          'relative mx-auto',
          s.outer,
          float && 'olwiba-phone-float',
          className,
        )}
      >
        {/* Device body */}
        <div
          className={cn(
            'relative flex w-full flex-col overflow-hidden border-[3px] border-foreground/15 bg-muted shadow-2xl',
            s.border,
            s.height,
          )}
        >
          {/* Status bar / notch area */}
          <div className="relative flex justify-center pt-3 pb-1 shrink-0">
            <div className={cn('rounded-full bg-foreground/10', s.notch)} />
          </div>

          {/* Screen */}
          <div className={cn('mx-1.5 mb-1.5 flex-1 overflow-hidden bg-background', s.screen)}>
            {children}
          </div>
        </div>

        {/* Side buttons */}
        <div className="absolute right-[-5px] top-24 h-12 w-[3px] rounded-l-sm bg-foreground/15" />
        <div className="absolute left-[-5px] top-20 h-8 w-[3px] rounded-r-sm bg-foreground/15" />
        <div className="absolute left-[-5px] top-32 h-8 w-[3px] rounded-r-sm bg-foreground/15" />
        <div className="absolute left-[-5px] top-44 h-8 w-[3px] rounded-r-sm bg-foreground/15" />
      </div>
    </>
  );
}
