'use client';

import * as React from 'react';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@olwiba/cn';

export interface SortableProps {
  /** Item ids in render order — one per child, same order as `children`. */
  items: string[];
  /** Fired with the new id order after a drag completes. */
  onReorder: (items: string[]) => void;
  /** One element per id — pairing is by position, so keep orders aligned. */
  children: React.ReactNode;
  /** Layout of the sortable collection. @default 'vertical' */
  direction?: 'vertical' | 'horizontal' | 'grid';
  disabled?: boolean;
  className?: string;
  itemClassName?: string;
}

const strategies = {
  vertical: verticalListSortingStrategy,
  horizontal: horizontalListSortingStrategy,
  grid: rectSortingStrategy,
} as const;

const containerClasses = {
  vertical: 'flex flex-col gap-2',
  horizontal: 'flex gap-2',
  grid: 'grid gap-2',
} as const;

function SortableItem({
  id,
  disabled,
  className,
  children,
}: {
  id: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id, disabled });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        'touch-none',
        !disabled && 'cursor-grab active:cursor-grabbing',
        isDragging && 'relative z-10 opacity-80',
        className,
      )}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}

/**
 * Drag-to-reorder behavior — wraps any children and makes them sortable by
 * pointer or keyboard. A mechanic, not a list component: feed it cards, rows,
 * or tiles. Controlled: pass `items` (ids in order) and apply the new order
 * in `onReorder`.
 */
export function Sortable({
  items,
  onReorder,
  children,
  direction = 'vertical',
  disabled,
  className,
  itemClassName,
}: SortableProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.indexOf(String(active.id));
    const newIndex = items.indexOf(String(over.id));
    if (oldIndex === -1 || newIndex === -1) return;
    onReorder(arrayMove(items, oldIndex, newIndex));
  };

  const childArray = React.Children.toArray(children);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={strategies[direction]}>
        <div className={cn(containerClasses[direction], className)}>
          {childArray.map((child, i) =>
            items[i] === undefined ? null : (
              <SortableItem key={items[i]} id={items[i]} disabled={disabled} className={itemClassName}>
                {child}
              </SortableItem>
            ),
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
}
