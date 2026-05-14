import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { useFilter } from '../hooks/useFilter';
import { TaskCard } from './TaskCard';
import { DroppableColumn } from './DroppableColumn';
import type { Task, TaskStatus } from '../types/task';

const COLUMNS: { label: string; value: TaskStatus }[] = [
  { label: '📋 To-do',     value: 'todo' },
  { label: '🔄 Doing',     value: 'doing' },
  { label: '✅ Done',      value: 'done' },
  { label: '🔍 Review',    value: 'review' },
  { label: '❌ Cancelled', value: 'cancelled' },
];

const COLUMN_COLORS: Record<TaskStatus, string> = {
  todo:      'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800/40',
  doing:     'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/40',
  done:      'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800/40',
  review:    'bg-purple-50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-800/40',
  cancelled: 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800/40',
};

export const TaskList = () => {
  const { tasks, loading, error, editTask } = useTasks();
  const { search, setSearch, sortAsc, setSortAsc, filtered } = useFilter(tasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragStart = ({ active }: any) => {
    setActiveTask(tasks.find(t => t.id === active.id) ?? null);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveTask(null);
    if (!over) return;

    const taskId = active.id as string;
    const overId = over.id as string;

    // over puede ser una columna o una task — resolvemos el status destino
    const targetStatus =
      COLUMNS.find(c => c.value === overId)?.value ??
      tasks.find(t => t.id === overId)?.status;

    if (!targetStatus) return;

    const task = tasks.find(t => t.id === taskId);
    if (task && task.status !== targetStatus) {
      editTask(taskId, { status: targetStatus });
    }
  };

  if (loading) return <p className="text-gray-400 text-sm">Loading tasks...</p>;
  if (error)   return <p className="text-red-500 text-sm">{error}</p>;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 items-center">
          <input
            type="search"
            placeholder="Search tasks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          />
          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-amber-400 transition-colors"
          >
            {sortAsc ? '↑ Date' : '↓ Date'}
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {COLUMNS.map(col => (
            <DroppableColumn
              key={col.value}
              col={col}
              tasks={filtered.filter(t => t.status === col.value)}
              colorClass={COLUMN_COLORS[col.value]}
            />
          ))}
        </div>
      </div>

      {/* card fantasma que se ve mientras arrastras */}
            <DragOverlay dropAnimation={null}>
            {activeTask && (
                <div className="rotate-1 scale-105 opacity-90 shadow-lg">
                <TaskCard task={activeTask} />
                </div>
            )}
            </DragOverlay>
    </DndContext>
  );
};