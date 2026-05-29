import React from 'react'
import { cn } from '../lib/utils'

const paddingMap = {
  none: '',
  sm: 'py-4',
  md: 'py-8',
  lg: 'py-16',
}

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string
  description?: string
  padding?: keyof typeof paddingMap
}

export function Section({ title, description, padding = 'md', className, children, ...props }: SectionProps) {
  return (
    <section className={cn('w-full', paddingMap[padding], className)} {...props}>
      {(title || description) && (
        <div className="mb-6">
          {title && <h2 className="text-xl font-semibold text-foreground">{title}</h2>}
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      {children}
    </section>
  )
}
