import React from 'react'
import { cn } from '../lib/utils'

const spacingMap = {
  sm: 'space-y-4',
  md: 'space-y-6',
  lg: 'space-y-8',
}

const maxWidthMap = {
  none: '',
  'screen-lg': 'mx-auto max-w-screen-lg',
  'screen-xl': 'mx-auto max-w-screen-xl',
  'screen-2xl': 'mx-auto max-w-screen-2xl',
}

export interface AppContentProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: keyof typeof spacingMap
  maxWidth?: keyof typeof maxWidthMap
}

export function AppContent({
  spacing = 'md',
  maxWidth = 'none',
  className,
  children,
  ...props
}: AppContentProps) {
  return (
    <div className={cn('p-6', maxWidthMap[maxWidth], spacingMap[spacing], className)} {...props}>
      {children}
    </div>
  )
}
