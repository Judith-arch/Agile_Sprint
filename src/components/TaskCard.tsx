import type { Task, TaskStatus } from '../types/task';
import { getDeadlineBadge } from '../utils/dateUtils';
import { useTasks } from '../context/TaskContext';



const STATUS_COLORS: Record<TaskStatus, string> = {
  todo:      'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800/40',
  doing:     'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/40',
  review:    'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800/40',
  done:      'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/40',
  cancelled: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/40',
};

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const { editTask, removeTask } = useTasks();
  const badge = getDeadlineBadge(task.deadline);
  const stars = '⭐'.repeat(task.priority);

  return (
    <li className={`flex flex-col gap-2 p-3 rounded-lg border overflow-hidden ${STATUS_COLORS[task.status]} shadow-sm`}>
      
      {/* fila 1: checkbox + título + botones */}
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          checked={task.status === 'done'}
          onChange={e => editTask(task.id, { status: e.target.checked ? 'done' : 'todo' })}
          className="mt-0.5 w-4 h-4 flex-shrink-0 cursor-pointer accent-amber-400"
        />
        {/* título ocupa todo el espacio disponible y trunca */}
        <span className="font-medium text-gray-800 dark:text-gray-100 text-sm truncate flex-1 min-w-0">
          {task.title}
        </span>
        <div className="flex gap-1 flex-shrink-0">
        <button
        onClick={() => editTask(task.id, { pinned: !task.pinned })}
        className={`bg-transparent border-none p-0.5 text-sm leading-none transition-opacity ${task.pinned ? 'opacity-100' : 'opacity-25 hover:opacity-60'}`}
        aria-label="Pin task"
        >📌</button>
          <button
            onClick={() => removeTask(task.id)}
            className="text-gray-400 hover:text-red-500 bg-transparent border-none p-0.5 text-sm leading-none"
            aria-label="Delete task"
          >🗑</button>
        </div>
      </div>

      {/* fila 2: badge de deadline + pin indicator */}
        {badge && (
        <div className="flex items-center gap-2 pl-6">
            <span className={`text-xs font-medium ${badge.color}`}>{badge.label}</span>
        </div>
        )}
      {/* fila 3: stars + assignee + deadline — todos truncados */}
      <div className="flex items-center gap-2 pl-6 text-xs text-gray-500 dark:text-gray-400 min-w-0">
        <span className="flex-shrink-0">{stars}</span>
        {task.assignee && (
          <span className="truncate min-w-0">👤 {task.assignee}</span>
        )}
        {task.deadline && (
          <span className="flex-shrink-0 ml-auto">📅 {task.deadline}</span>
        )}
      </div>

    </li>
  );
};