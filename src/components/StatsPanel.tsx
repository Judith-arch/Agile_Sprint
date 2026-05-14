import { useMemo } from 'react';
import { useTasks } from '../context/TaskContext';

const CircularProgress = ({ pct }: { pct: number }) => {
  const r = 32;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="relative flex items-center justify-center w-20 h-20 flex-shrink-0">
      <svg className="rotate-[-90deg]" width="80" height="80">
        <circle cx="40" cy="40" r={r} fill="none" stroke="currentColor" strokeWidth="7" className="text-gray-200 dark:text-gray-700" />
        <circle
          cx="40" cy="40" r={r} fill="none"
          stroke="#f59e0b" strokeWidth="7"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <span className="absolute text-sm font-medium text-gray-800">{pct}%</span>
    </div>
  );
};

export const StatsPanel = () => {
  const { tasks } = useTasks();

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter(t => t.status === 'done').length;
    const doing = tasks.filter(t => t.status === 'doing').length;
    const review = tasks.filter(t => t.status === 'review').length;
    const todo = tasks.filter(t => t.status === 'todo').length;
    const cancelled = tasks.filter(t => t.status === 'cancelled').length;
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);
    const overdue = tasks.filter(t => {
      if (!t.deadline) return false;
      return new Date(t.deadline) < new Date() && t.status !== 'done' && t.status !== 'cancelled';
    }).length;
    return { total, done, doing, review, todo, cancelled, pct, overdue };
  }, [tasks]);

  const dotItems = [
    { label: 'Total',     value: stats.total,     color: 'text-gray-700',   dot: 'bg-gray-400' },
    { label: 'To-do',     value: stats.todo,      color: 'text-amber-500',  dot: 'bg-amber-400' },
    { label: 'Doing',     value: stats.doing,     color: 'text-blue-500',   dot: 'bg-blue-400' },
    { label: 'Review',    value: stats.review,    color: 'text-purple-500', dot: 'bg-purple-400' },
    { label: 'Done',      value: stats.done,      color: 'text-green-500',  dot: 'bg-green-400' },
    { label: 'Cancelled', value: stats.cancelled, color: 'text-red-400',    dot: 'bg-red-400' },
    { label: 'Overdue',   value: stats.overdue,   color: 'text-red-600',    dot: 'bg-red-600' },
  ];

  const barItems = [
    { label: 'To-do',   value: stats.todo,    bar: 'bg-amber-400' },
    { label: 'Doing',   value: stats.doing,   bar: 'bg-blue-400' },
    { label: 'Review',  value: stats.review,  bar: 'bg-purple-400' },
    { label: 'Done',    value: stats.done,    bar: 'bg-green-400' },
    { label: 'Overdue', value: stats.overdue, bar: 'bg-red-500' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-4 h-full">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Overview</span>

      {/* Circular + dot legend */}
      <div className="flex gap-5 items-center">
        <CircularProgress pct={stats.pct} />
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 flex-1">
          {dotItems.map(s => (
          <div key={s.label} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
            <span className="text-xs text-gray-400">{s.label}</span>
            <span className={`text-xs font-medium ${s.color}`}>{s.value}</span>
          </div>
          ))}
        </div>
      </div>

      {/* Bar chart */}
      <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex flex-col gap-2 flex-1 justify-center">
        <span className="text-[11px] font-medium text-gray-400">Distribution</span>
        <div className="flex flex-col gap-2">
          {barItems.map(s => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="text-[11px] text-gray-400 w-14 text-right flex-shrink-0">{s.label}</span>
              <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${s.bar}`}
                  style={{
                    width: stats.total === 0 ? '0%' : `${(s.value / stats.total) * 100}%`,
                    transition: 'width 0.5s ease',
                  }}
                />
              </div>
              <span className="text-[11px] text-gray-400 w-4 text-right">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};