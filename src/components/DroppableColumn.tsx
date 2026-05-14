import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableTaskCard } from './SortableTaskCard';
import type { Task, TaskStatus } from '../types/task';

interface Props {
  col: { label: string; value: TaskStatus };
  tasks: Task[];
  colorClass: string;
}

export const DroppableColumn = ({ col, tasks, colorClass }: Props) => {
  const { setNodeRef, isOver } = useDroppable({ id: col.value });

  return (
    <div className={`flex flex-col gap-2 p-3 rounded-xl border w-[300px] flex-shrink-0 transition-colors ${colorClass} ${isOver ? 'ring-2 ring-amber-400 ring-offset-1' : ''}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">{col.label}</span>
        <span className="text-xs bg-white dark:bg-gray-700 rounded-full px-2 py-0.5 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600">
          {tasks.length}
        </span>
      </div>
      <div ref={setNodeRef} className="flex flex-col gap-2 min-h-[60px]">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.length === 0
            ? <p className="text-xs text-gray-400 dark:text-gray-600 text-center py-4">Empty</p>
            : tasks.map(task => <SortableTaskCard key={task.id} task={task} />)
          }
        </SortableContext>
      </div>
    </div>
  );
};