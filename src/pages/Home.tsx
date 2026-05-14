import { useState } from 'react';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { StatsPanel } from '../components/StatsPanel';

export const Home = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    // 🌙 dark:bg-gray-900 dark:text-white
    <main className="max-w-screen-xl mx-auto p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        {/* 🌙 dark:text-white */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">My Tasks</h2>
        {/* 🌙 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 */}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-amber-400 text-gray-600 dark:text-gray-300 transition-colors"
        >
          {showSidebar ? '← Hide panel' : '→ Show panel'}
        </button>
      </div>

      {showSidebar && (
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-4 items-stretch">
          <TaskForm />
          <StatsPanel />
        </div>
      )}

      <TaskList />
    </main>
  );
};