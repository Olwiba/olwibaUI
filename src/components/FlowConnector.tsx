'use client';

import * as React from 'react';
import { cn } from '@olwiba/cn';

export interface FlowConnectorProps {
  /** Line axis. Default: 'vertical'. */
  direction?: 'vertical' | 'horizontal';
  /**
   * CSS color string for the line and arrowhead.
   * Falls back to currentColor at reduced opacity when omitted.
   */
  color?: string;
  /** Show an open-chevron arrowhead at the destination end. Default: false. */
  arrow?: boolean;
  /** Show a traveling dot animation along the connector. Default: false. */
  animate?: boolean;
  /** Duration of the traveling dot animation. Default: '1.4s'. */
  animateDur?: string;
  /** CSS delay before the traveling dot animation starts. Default: '0s'. */
  animateDelay?: string;
  className?: string;
  style?: React.CSSProperties;
}

const DASH_ON = '5px';
const DASH_OFF = '4px';

/**
 * Dashed connecting line between diagram nodes.
 * Control size via className (e.g. `h-10` for vertical, `w-16` for horizontal).
 * Pass `style` for fade/entrance animations — the wrapper inherits it.
 */
export function FlowConnector({
  direction = 'vertical',
  color,
  arrow = false,
  animate = false,
  animateDur = '1.4s',
  animateDelay = '0s',
  className,
  style,
}: FlowConnectorProps) {
  const stroke = color ?? 'currentColor';
  const opacity = color ? 0.75 : 0.4;

  if (direction === 'vertical') {
    return (
      <div
        className={cn('relative flex flex-col items-center', className)}
        style={style}
        aria-hidden
      >
        {animate && (
          <style>{`@keyframes fc-dot-v{0%{top:-4px;opacity:0}8%{opacity:1}88%{opacity:1}100%{top:calc(100% + 4px);opacity:0}}`}</style>
        )}
        <div
          className="flex-1"
          style={{
            width: 2,
            opacity,
            background: `repeating-linear-gradient(to bottom, ${stroke} 0, ${stroke} ${DASH_ON}, transparent ${DASH_ON}, transparent calc(${DASH_ON} + ${DASH_OFF}))`,
          }}
        />
        {animate && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 5,
              height: 5,
              borderRadius: '50%',
              backgroundColor: stroke,
              animation: `fc-dot-v ${animateDur} ease-in-out ${animateDelay} infinite both`,
            }}
          />
        )}
        {arrow && (
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            style={{ display: 'block', opacity }}
            aria-hidden
          >
            <polyline
              points="1,1 6,6 11,1"
              fill="none"
              stroke={stroke}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn('flex items-center', className)}
      style={style}
      aria-hidden
    >
      <div
        className="flex-1"
        style={{
          height: 2,
          opacity,
          background: `repeating-linear-gradient(to right, ${stroke} 0, ${stroke} ${DASH_ON}, transparent ${DASH_ON}, transparent calc(${DASH_ON} + ${DASH_OFF}))`,
        }}
      />
      {arrow && (
        <svg
          width="7"
          height="12"
          viewBox="0 0 7 12"
          style={{ display: 'block', opacity }}
          aria-hidden
        >
          <polyline
            points="1,1 6,6 1,11"
            fill="none"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}
