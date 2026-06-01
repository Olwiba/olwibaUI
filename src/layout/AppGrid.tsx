import React from 'react'
import { cn } from '../lib/utils'

const columnsMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4',
}

const gapMap = {
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
}

const spanMap = {
  1: 'md:col-span-1',
  2: 'md:col-span-2',
  3: 'xl:col-span-3',
  4: 'xl:col-span-4',
  full: 'col-span-full',
}

export interface AppGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: keyof typeof columnsMap
  gap?: keyof typeof gapMap
}

export function AppGrid({ columns = 3, gap = 'md', className, children, ...props }: AppGridProps) {
  return (
    <div className={cn('grid', columnsMap[columns], gapMap[gap], className)} {...props}>
      {children}
    </div>
  )
}

export interface AppGridCellProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: keyof typeof spanMap
}

export function AppGridCell({ span = 1, className, children, ...props }: AppGridCellProps) {
  return (
    <div className={cn(spanMap[span], className)} {...props}>
      {children}
    </div>
  )
}
