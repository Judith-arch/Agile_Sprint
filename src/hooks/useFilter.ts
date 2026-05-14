import { useState, useMemo } from 'react';
import type { Task, TaskStatus } from '../types/task';

type FilterType = TaskStatus | 'all' | 'archived';

export const useFilter = (tasks: Task[]) => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = useMemo(() => {
    let result = tasks.filter(t => {
      if (filter === 'archived') return t.archived;
      if (filter === 'all') return !t.archived;
      return t.status === filter && !t.archived;
    });

    if (search) {
      result = result.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    result.sort((a, b) => {
      if (!a.deadline) return 1;
      if (!b.deadline) return -1;
      return sortAsc
        ? a.deadline.localeCompare(b.deadline)
        : b.deadline.localeCompare(a.deadline);
    });

    const pinned = result.filter(t => t.pinned);
    const unpinned = result.filter(t => !t.pinned);
    return [...pinned, ...unpinned];
  }, [tasks, filter, search, sortAsc]);

  return { filter, setFilter, search, setSearch, sortAsc, setSortAsc, filtered };
};