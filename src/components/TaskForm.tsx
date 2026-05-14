import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import type { TaskStatus, TaskPriority } from '../types/task';

export const TaskForm = () => {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState<TaskPriority>(1);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setError('Title is required.'); return; }
    setError('');
    await addTask({ title, deadline: deadline || null, status, assignee, priority, subtasks: [] });
    setTitle(''); setDeadline(''); setStatus('todo'); setAssignee(''); setPriority(1);
  };

  // 🌙 clases reutilizables para inputs y selects
  const inputCls = "px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100";

  return (
    // 🌙 dark:bg-gray-800 dark:border-gray-700
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <div className="flex flex-col gap-1">
        {/* 🌙 dark:text-gray-400 */}
        <label className="text-xs text-gray-500 dark:text-gray-400 font-medium">Title *</label>
        <input value={title} onChange={e => setTitle(e.target.value)}
          className={inputCls} placeholder="Task title..." />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 dark:text-gray-400 font-medium">Deadline</label>
        <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)}
          className={inputCls} />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 dark:text-gray-400 font-medium">Status</label>
        <select value={status} onChange={e => setStatus(e.target.value as TaskStatus)}
          className={inputCls}>
          <option value="todo">To-do</option>
          <option value="doing">Doing</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 dark:text-gray-400 font-medium">Assigned to</label>
        <input value={assignee} onChange={e => setAssignee(e.target.value)}
          className={inputCls} placeholder="Name..." />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 dark:text-gray-400 font-medium">Priority</label>
        <select value={priority} onChange={e => setPriority(Number(e.target.value) as TaskPriority)}
          className={inputCls}>
          <option value={1}>⭐ Low</option>
          <option value={2}>⭐⭐ Medium</option>
          <option value={3}>⭐⭐⭐ High</option>
          <option value={4}>⭐⭐⭐⭐ Very High</option>
          <option value={5}>⭐⭐⭐⭐⭐ Critical</option>
        </select>
      </div>
      <button type="submit"
        className="w-full py-2 bg-amber-400 text-white rounded-lg text-sm font-medium hover:bg-amber-500 transition-colors">
        Add Task
      </button>
    </form>
  );
};