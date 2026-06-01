import React from 'react'
import { cn } from '../lib/utils'

const surfaceMap = {
  default: 'bg-background',
  muted: 'bg-muted/50',
}

const spacingMap = {
  sm: 'gap-4 p-4',
  md: 'gap-5 p-4 sm:gap-6 sm:p-6',
  lg: 'gap-6 p-4 sm:gap-8 sm:p-6',
}

const maxWidthMap = {
  none: '',
  'screen-xl': 'mx-auto max-w-screen-xl',
  'screen-2xl': 'mx-auto max-w-screen-2xl',
}

export interface PublicPageFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  surface?: keyof typeof surfaceMap
  spacing?: keyof typeof spacingMap
  maxWidth?: keyof typeof maxWidthMap
}

export function PublicPageFrame({
  surface = 'muted',
  spacing = 'md',
  maxWidth = 'none',
  className,
  children,
  ...props
}: PublicPageFrameProps) {
  return (
    <div className={cn('min-h-screen', surfaceMap[surface], className)} {...props}>
      <div className={cn('flex flex-col', spacingMap[spacing], maxWidthMap[maxWidth])}>
        {children}
      </div>
    </div>
  )
}
