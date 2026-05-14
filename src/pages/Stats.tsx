  import { useMemo, useState } from 'react';
  import { useTasks } from '../context/TaskContext';

  // ── Helpers ──────────────────────────────────────────────────

  const today = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const parseDate = (s: string) => {
    const d = new Date(s);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const daysUntil = (deadline: string) =>
    Math.ceil((parseDate(deadline).getTime() - today().getTime()) / 86400000);

  // ── Calendar ─────────────────────────────────────────────────

  interface CalendarProps {
    tasksByDate: Record<string, { status: string }[]>;
  }

  const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const STATUS_DOT: Record<string, string> = {
    todo:      'bg-amber-400',
    doing:     'bg-blue-400',
    review:    'bg-purple-400',
    done:      'bg-green-400',
    cancelled: 'bg-red-400',
  };

  const Calendar = ({ tasksByDate }: CalendarProps) => {
    const [current, setCurrent] = useState(() => {
      const d = new Date();
      return { year: d.getFullYear(), month: d.getMonth() };
    });

    const { year, month } = current;

    const firstDay = new Date(year, month, 1);
    // Monday-based: 0=Mo … 6=Su
    const startOffset = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthLabel = new Date(year, month).toLocaleString('en', { month: 'long', year: 'numeric' });

    const todayStr = new Date().toISOString().slice(0, 10);

    const prev = () => setCurrent(c => {
      const m = c.month === 0 ? 11 : c.month - 1;
      const y = c.month === 0 ? c.year - 1 : c.year;
      return { year: y, month: m };
    });

    const next = () => setCurrent(c => {
      const m = c.month === 11 ? 0 : c.month + 1;
      const y = c.month === 11 ? c.year + 1 : c.year;
      return { year: y, month: m };
    });

    const cells: (number | null)[] = [
      ...Array(startOffset).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Calendar</h3>
          <div className="flex items-center gap-2">
            <button onClick={prev} className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs">&#8249;</button>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300 w-32 text-center">{monthLabel}</span>
            <button onClick={next} className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs">&#8250;</button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {WEEKDAYS.map(d => (
            <div key={d} className="text-center text-[10px] font-medium text-gray-400 dark:text-gray-500 py-1">{d}</div>
          ))}
          {cells.map((day, i) => {
            if (!day) return <div key={`e-${i}`} />;
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayTasks = tasksByDate[dateStr] ?? [];
            const isToday = dateStr === todayStr;

            return (
              <div
                key={dateStr}
                className={`relative flex flex-col items-center gap-0.5 rounded-lg py-1 px-0.5 ${
                  isToday ? 'bg-amber-50 dark:bg-amber-900/20 ring-1 ring-amber-400' : ''
                }`}
              >
                <span className={`text-[11px] ${isToday ? 'font-bold text-amber-500' : 'text-gray-600 dark:text-gray-400'}`}>
                  {day}
                </span>
                {dayTasks.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-0.5">
                    {dayTasks.slice(0, 3).map((t, j) => (
                      <div key={j} className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[t.status] ?? 'bg-gray-400'}`} />
                    ))}
                    {dayTasks.length > 3 && (
                      <span className="text-[8px] text-gray-400">+{dayTasks.length - 3}</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 pt-1 border-t border-gray-100 dark:border-gray-700">
          {Object.entries(STATUS_DOT).map(([status, cls]) => (
            <div key={status} className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${cls}`} />
              <span className="text-[10px] text-gray-400 dark:text-gray-500 capitalize">{status}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── Main component ────────────────────────────────────────────

  export const Stats = () => {
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
        return parseDate(t.deadline) < today() && t.status !== 'done' && t.status !== 'cancelled';
      }).length;

      // Upcoming deadlines — próximas 5 tareas activas ordenadas por fecha
      const upcoming = tasks
        .filter(t => t.deadline && t.status !== 'done' && t.status !== 'cancelled')
        .sort((a, b) => parseDate(a.deadline!).getTime() - parseDate(b.deadline!).getTime())
        .slice(0, 5);

      // Workload por assignee — solo tareas activas
      const workloadMap: Record<string, { active: number; done: number }> = {};
      tasks.forEach(t => {
        const name = t.assignee?.trim() || 'Unassigned';
        if (!workloadMap[name]) workloadMap[name] = { active: 0, done: 0 };
        if (t.status === 'done') workloadMap[name].done++;
        else if (t.status !== 'cancelled') workloadMap[name].active++;
      });
      const workload = Object.entries(workloadMap)
        .map(([name, v]) => ({ name, ...v, total: v.active + v.done }))
        .sort((a, b) => b.active - a.active);
      const maxActive = Math.max(...workload.map(w => w.active), 1);

      // Tasks by date para el calendario
      const tasksByDate: Record<string, { status: string }[]> = {};
      tasks.forEach(t => {
        if (!t.deadline) return;
        const key = t.deadline.slice(0, 10);
        if (!tasksByDate[key]) tasksByDate[key] = [];
        tasksByDate[key].push({ status: t.status });
      });

      // Critical
      const critical = tasks.filter(t => {
        if (!t.deadline) return false;
        const days = daysUntil(t.deadline);
        return days <= 5 && days >= 0 && t.status !== 'done' && t.status !== 'cancelled';
      });

      return { total, done, doing, review, todo, cancelled, pct, overdue, upcoming, workload, maxActive, tasksByDate, critical };
    }, [tasks]);

    return (
      <main className="max-w-screen-xl mx-auto p-6 pb-16 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Statistics</h2>

        {/* Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total tasks', value: stats.total, bg: 'bg-gray-50 dark:bg-gray-800', color: 'text-gray-800 dark:text-gray-100', border: 'border-gray-100 dark:border-gray-700' },
            { label: 'Completed',   value: stats.done,  bg: 'bg-green-50 dark:bg-green-900/20', color: 'text-green-600 dark:text-green-400', border: 'border-gray-100 dark:border-green-800/40' },
            { label: 'In progress', value: stats.doing + stats.review, bg: 'bg-blue-50 dark:bg-blue-900/20', color: 'text-blue-600 dark:text-blue-400', border: 'border-gray-100 dark:border-blue-800/40' },
            { label: 'Overdue',     value: stats.overdue, bg: 'bg-red-50 dark:bg-red-900/20', color: 'text-red-600 dark:text-red-400', border: 'border-gray-100 dark:border-red-800/40' },
          ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-xl p-4 flex flex-col items-center gap-1 border ${s.border}`}>
              <span className={`text-3xl font-bold ${s.color}`}>{s.value}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5 flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Completion progress</h3>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full transition-all duration-500" style={{ width: `${stats.pct}%` }} />
            </div>
            <span className="text-sm font-bold text-amber-500 w-12 text-right">{stats.pct}%</span>
          </div>
          <div className="grid grid-cols-5 gap-2 mt-1">
            {[
              { label: 'To-do',     value: stats.todo,      color: 'bg-amber-400' },
              { label: 'Doing',     value: stats.doing,     color: 'bg-blue-400' },
              { label: 'Review',    value: stats.review,    color: 'bg-purple-400' },
              { label: 'Done',      value: stats.done,      color: 'bg-green-400' },
              { label: 'Cancelled', value: stats.cancelled, color: 'bg-red-400' },
            ].map(s => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <div className={`w-3 h-3 rounded-full ${s.color}`} />
                <span className="text-xs font-bold text-gray-700 dark:text-gray-200">{s.value}</span>
                <span className="text-xs text-gray-400 dark:text-gray-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Workload + Upcoming — dos columnas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Assignee workload */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5 flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Workload by assignee</h3>
            {stats.workload.length === 0 ? (
              <p className="text-xs text-gray-400">No tasks yet.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {stats.workload.map(w => (
                  <div key={w.name} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate max-w-[140px]">{w.name}</span>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400">
                        <span className="text-blue-500 font-medium">{w.active} active</span>
                        <span>·</span>
                        <span className="text-green-500 font-medium">{w.done} done</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-400 rounded-full transition-all duration-500"
                        style={{ width: `${(w.active / stats.maxActive) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming deadlines */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5 flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Upcoming deadlines</h3>
            {stats.upcoming.length === 0 ? (
              <p className="text-xs text-gray-400">No upcoming deadlines.</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {stats.upcoming.map(t => {
                  const days = daysUntil(t.deadline!);
                  const urgency = days < 0
                    ? 'text-red-500 dark:text-red-400'
                    : days <= 2
                      ? 'text-orange-500 dark:text-orange-400'
                      : 'text-gray-400 dark:text-gray-500';
                  const label = days < 0
                    ? `${Math.abs(days)}d overdue`
                    : days === 0
                      ? 'Today'
                      : days === 1
                        ? 'Tomorrow'
                        : `${days}d left`;
                  return (
                    <li key={t.id} className="flex items-center justify-between gap-2">
                      <span className="text-xs text-gray-700 dark:text-gray-300 truncate flex-1">{t.title}</span>
                      <span className={`text-[11px] font-medium flex-shrink-0 ${urgency}`}>{label}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        {/* Calendar */}
        <Calendar tasksByDate={stats.tasksByDate} />

        {/* Critical tasks */}
        {stats.critical.length > 0 && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 rounded-xl p-5 flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-red-600 dark:text-red-400">Critical tasks — due in 5 days or less</h3>
            <ul className="flex flex-col gap-2">
              {stats.critical.map(t => (
                <li key={t.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300 truncate flex-1">{t.title}</span>
                  <span className="text-red-500 dark:text-red-400 text-xs flex-shrink-0 ml-4">
                    {new Date(t.deadline + 'T00:00:00').toLocaleDateString('en', { day: 'numeric', month: 'short' })}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    );
  };