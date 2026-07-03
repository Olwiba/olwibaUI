'use client';

import * as React from 'react';

export interface FlowBracketProps {
  /**
   * Vertical anchor for the top connection as a percentage of the wrapper height (0–100).
   * Defaults to 8 (near the top of the first child).
   */
  anchorTop?: number;
  /** Per-side override for the top anchor of the left bracket. Falls back to anchorTop. */
  anchorTopLeft?: number;
  /** Per-side override for the top anchor of the right bracket. Falls back to anchorTop. */
  anchorTopRight?: number;
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
  /** Show open-chevron arrowhead at the destination end. Default: true. */
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

/**
 * Wraps children in a relative container and draws square bracket lines on the
 * left and/or right outside edges — connecting the top of the first child down
 * to the bottom of the last child (e.g. docs → SYNC direction).
 *
 * Arrowheads are rendered as absolutely-positioned SVGs (not SVG markers) so
 * they render at a consistent pixel size regardless of the bracket SVG's aspect
 * ratio (which spans the full section height with preserveAspectRatio="none").
 */
export function FlowBracket({
  anchorTop = 8,
  anchorTopLeft,
  anchorTopRight,
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
  const aTL = anchorTopLeft ?? anchorTop;
  const aTR = anchorTopRight ?? anchorTop;

  // Left bracket: bottom → top (arrowhead at top, pointing right into genesis)
  const leftD  = `M 0,${anchorBottom} L ${L},${anchorBottom} L ${L},${aTL} L 0,${aTL}`;
  // Right bracket: reversed = top → bottom (arrowhead at bottom, pointing left into sync)
  const rightD = reverseRight
    ? `M 1000,${aTR} L ${R},${aTR} L ${R},${anchorBottom} L 1000,${anchorBottom}`
    : `M 1000,${anchorBottom} L ${R},${anchorBottom} L ${R},${aTR} L 1000,${aTR}`;

  // CSS dot: extent as % of container width
  const ep = `${(extent / 10).toFixed(1)}%`;
  const dotKeyframes = animate ? `
@keyframes fb-dl{
  0%{top:${anchorBottom}%;left:0;opacity:0}
  6%{opacity:1}
  20%{top:${anchorBottom}%;left:-${ep}}
  80%{top:${aTL}%;left:-${ep};opacity:1}
  94%{top:${aTL}%;left:0;opacity:0}
  100%{top:${aTL}%;left:0;opacity:0}
}
@keyframes fb-dr{
  0%{top:${anchorBottom}%;left:100%;opacity:0}
  6%{opacity:1}
  20%{top:${anchorBottom}%;left:calc(100% + ${ep})}
  80%{top:${aTR}%;left:calc(100% + ${ep});opacity:1}
  94%{top:${aTR}%;left:100%;opacity:0}
  100%{top:${aTR}%;left:100%;opacity:0}
}
@keyframes fb-drr{
  0%{top:${aTR}%;left:100%;opacity:0}
  6%{opacity:1}
  20%{top:${aTR}%;left:calc(100% + ${ep})}
  80%{top:${anchorBottom}%;left:calc(100% + ${ep});opacity:1}
  94%{top:${anchorBottom}%;left:100%;opacity:0}
  100%{top:${anchorBottom}%;left:100%;opacity:0}
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

  // Shared arrowhead polyline props — same chevron shape as ecosystem connector markers
  const chevronProps = {
    fill: 'none',
    strokeWidth: '1.5',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  // Arrowhead SVG style — positioned in CSS space so it renders at a fixed pixel size
  // regardless of the bracket SVG's non-uniform scale (preserveAspectRatio="none")
  const arrowBase: React.CSSProperties = {
    position: 'absolute',
    width: 10,
    height: 8,
    overflow: 'visible',
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
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
        {left && (
          <path d={leftD} fill="none" style={{ stroke: cl }} strokeWidth={1.5} strokeDasharray="5,4"
            vectorEffect="non-scaling-stroke" />
        )}
        {right && (
          <path d={rightD} fill="none" style={{ stroke: cr }} strokeWidth={1.5} strokeDasharray="5,4"
            vectorEffect="non-scaling-stroke" />
        )}
      </svg>

      {/* Left bracket arrowhead — tip points right (→) into the genesis/docs tier */}
      {arrow && left && (
        <svg
          aria-hidden
          viewBox="0 0 10 8"
          style={{ ...arrowBase, top: `${aTL}%`, left: 0 }}
        >
          <polyline points="1,1 8,4 1,7" style={{ stroke: cl }} {...chevronProps} />
        </svg>
      )}

      {/* Right bracket arrowhead — tip points left (←) into the destination tier */}
      {arrow && right && (
        <svg
          aria-hidden
          viewBox="0 0 10 8"
          style={{
            ...arrowBase,
            top: reverseRight ? `${anchorBottom}%` : `${aTR}%`,
            left: '100%',
          }}
        >
          <polyline points="9,1 2,4 9,7" style={{ stroke: cr }} {...chevronProps} />
        </svg>
      )}

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
          style={{ ...dotBase, backgroundColor: cr, animation: `${reverseRight ? 'fb-drr' : 'fb-dr'} ${animateDur} ease-in-out 1.8s infinite` }}
        />
      )}
    </div>
  );
}
