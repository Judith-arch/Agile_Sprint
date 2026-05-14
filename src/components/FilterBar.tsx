import type { TaskStatus } from '../types/task';

type FilterType = TaskStatus | 'all' | 'archived';

interface FilterBarProps {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  search: string;
  setSearch: (s: string) => void;
  sortAsc: boolean;
  setSortAsc: (v: boolean) => void;
}

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'To-do', value: 'todo' },
  { label: 'Doing', value: 'doing' },
  { label: 'Review', value: 'review' },
  { label: 'Done', value: 'done' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'Archived', value: 'archived' },
];

export const FilterBar = ({ filter, setFilter, search, setSearch, sortAsc, setSortAsc }: FilterBarProps) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <input
        type="search"
        placeholder="Search tasks..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
      />
      <div className="flex flex-wrap gap-2">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3 py-1 text-sm rounded-lg border transition-colors ${
              filter === f.value
                ? 'bg-amber-400 border-amber-400 text-white'
                : 'bg-white border-gray-200 text-gray-700 hover:border-amber-400'
            }`}
          >
            {f.label}
          </button>
        ))}
        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="px-3 py-1 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 hover:border-amber-400 transition-colors"
        >
          {sortAsc ? '↑ Date' : '↓ Date'}
        </button>
      </div>
    </div>
  );
};