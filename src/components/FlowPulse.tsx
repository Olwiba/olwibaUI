'use client';

import { useId } from 'react';

export interface FlowPulseProps {
  d: string;
  color: string;
  duration: string;
  delay?: string;
  dashArray?: string;
}

/** A highlight that travels across a dashed SVG path. Render over the base stroke. */
export function FlowPulse({ d, color, duration, delay = '0s', dashArray = '3 5' }: FlowPulseProps) {
  const maskId = useId();

  return (
    <g aria-hidden="true" className="motion-reduce:hidden" data-flow-pulse>
      <mask id={maskId} maskUnits="userSpaceOnUse" x="-10%" y="-10%" width="120%" height="120%">
        {/* Normalize the mask path so one highlight can travel along any route. */}
        <path
          d={d}
          pathLength={100}
          fill="none"
          stroke="white"
          strokeWidth={16}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          strokeDasharray="22 140"
          strokeDashoffset={30}
          style={{ filter: 'blur(3px)' }}
        >
          <animate
            attributeName="stroke-dashoffset"
            values="30;-108;-108"
            keyTimes="0;0.78;1"
            dur={duration}
            begin={delay}
            repeatCount="indefinite"
          />
        </path>
      </mask>
      <path
        d={d}
        fill="none"
        style={{ stroke: color }}
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray={dashArray}
        vectorEffect="non-scaling-stroke"
        mask={`url(#${maskId})`}
      />
    </g>
  );
}
