'use client';

import * as React from 'react';

export interface FlowBracketProps {
  /**
   * Vertical anchor for the top connection as a percentage of the wrapper height (0–100).
   * Defaults to 8 (near the top of the first child).
   */
  anchorTop?: number;
  /**
   * Vertical anchor for the bottom connection as a percentage of the wrapper height (0–100).
   * Defaults to 92 (near the bottom of the last child).
   */
  anchorBottom?: number;
  /**
   * How far outside the wrapper the bracket extends, in SVG units (viewBox width = 1000).
   * Defaults to 22.
   */
  extent?: number;
  /** Show open-chevron arrowhead at the top (destination) end. Default: true. */
  arrow?: boolean;
  /** CSS color for both bracket lines and animated dots. Defaults to muted slate. */
  color?: string;
  /** Override color for the left bracket only. */
  colorLeft?: string;
  /** Override color for the right bracket only. */
  colorRight?: string;
  /** Show left bracket. Default: true. */
  left?: boolean;
  /** Show right bracket. Default: true. */
  right?: boolean;
  /**
   * Animate a dot traveling the L-path from the bottom anchor up to the top anchor
   * (sync → genesis/docs direction).
   * Dots are placed after {children} in DOM so positive-z-index card stacking contexts
   * naturally render above them.
   */
  animate?: boolean;
  /** Duration of one full dot journey. Default: '4s'. */
  animateDur?: string;
  /** Reverse the right bracket path direction so its arrowhead points DOWN (into sync). Default: false. */
  reverseRight?: boolean;
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
}

const MARKER_L = 'fb-ml';
const MARKER_R = 'fb-mr';

/**
 * Wraps children in a relative container and draws square bracket lines on the
 * left and/or right outside edges — connecting the top of the first child down
 * to the bottom of the last child (e.g. docs → SYNC direction).
 *
 * Bracket lines use `overflow: visible` on the SVG to draw into the parent's padding.
 * Ensure the parent section/container has enough horizontal padding for `extent`.
 */
export function FlowBracket({
  anchorTop = 8,
  anchorBottom = 92,
  extent = 22,
  arrow = true,
  color = 'rgba(148,163,184,0.4)',
  colorLeft,
  colorRight,
  left = true,
  right = true,
  animate = false,
  animateDur = '4s',
  reverseRight = false,
  style,
  className,
  children,
}: FlowBracketProps) {
  const L = -extent;
  const R = 1000 + extent;

  const cl = colorLeft ?? color;
  const cr = colorRight ?? color;

  // Left bracket: bottom → top (arrowhead at top, pointing into genesis)
  const leftD  = `M 0,${anchorBottom} L ${L},${anchorBottom} L ${L},${anchorTop} L 0,${anchorTop}`;
  // Right bracket: reversed = top → bottom (arrowhead at bottom, pointing into sync)
  const rightD = reverseRight
    ? `M 1000,${anchorTop} L ${R},${anchorTop} L ${R},${anchorBottom} L 1000,${anchorBottom}`
    : `M 1000,${anchorBottom} L ${R},${anchorBottom} L ${R},${anchorTop} L 1000,${anchorTop}`;

  // CSS dot: extent as % of container width
  const ep = `${(extent / 10).toFixed(1)}%`;
  // Dots travel bottom → top (sync → genesis/docs direction), fade in/out at card edges
  const dotKeyframes = animate ? `
@keyframes fb-dl{
  0%{top:${anchorBottom}%;left:0;opacity:0}
  6%{opacity:1}
  20%{top:${anchorBottom}%;left:-${ep}}
  80%{top:${anchorTop}%;left:-${ep};opacity:1}
  94%{top:${anchorTop}%;left:0;opacity:0}
  100%{top:${anchorTop}%;left:0;opacity:0}
}
@keyframes fb-dr{
  0%{top:${anchorBottom}%;left:100%;opacity:0}
  6%{opacity:1}
  20%{top:${anchorBottom}%;left:calc(100% + ${ep})}
  80%{top:${anchorTop}%;left:calc(100% + ${ep});opacity:1}
  94%{top:${anchorTop}%;left:100%;opacity:0}
  100%{top:${anchorTop}%;left:100%;opacity:0}
}` : '';

  const dotBase: React.CSSProperties = {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    opacity: 0,
  };

  return (
    <div className={className} style={{ position: 'relative', ...style }}>
      {animate && <style>{dotKeyframes}</style>}
      <svg
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <defs>
          <marker id={MARKER_L} markerWidth="10" markerHeight="8" refX="8" refY="4" orient="auto">
            <polyline points="1,1 8,4 1,7" fill="none" stroke={cl} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
          <marker id={MARKER_R} markerWidth="10" markerHeight="8" refX="8" refY="4" orient="auto">
            <polyline points="1,1 8,4 1,7" fill="none" stroke={cr} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        {left  && (
          <path d={leftD}  fill="none" stroke={cl} strokeWidth={1.5} strokeDasharray="5,4"
            vectorEffect="non-scaling-stroke" {...(arrow ? { markerEnd: `url(#${MARKER_L})` } : {})} />
        )}
        {right && (
          <path d={rightD} fill="none" stroke={cr} strokeWidth={1.5} strokeDasharray="5,4"
            vectorEffect="non-scaling-stroke" {...(arrow ? { markerEnd: `url(#${MARKER_R})` } : {})} />
        )}
      </svg>

      {children}

      {/* Dots placed after children so card stacking contexts (z-index ≥ 1) render above */}
      {animate && left && (
        <div
          aria-hidden
          style={{ ...dotBase, backgroundColor: cl, animation: `fb-dl ${animateDur} ease-in-out 0s infinite` }}
        />
      )}
      {animate && right && (
        <div
          aria-hidden
          style={{ ...dotBase, backgroundColor: cr, animation: `fb-dr ${animateDur} ease-in-out 1.8s infinite` }}
        />
      )}
    </div>
  );
}
