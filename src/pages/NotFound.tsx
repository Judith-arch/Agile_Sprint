import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <main className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <span className="text-6xl">🔍</span>
      <h2 className="text-2xl font-bold text-gray-800">404 — Page not found</h2>
      <p className="text-gray-500 text-sm">The page you're looking for doesn't exist.</p>
      <Link to="/" className="px-4 py-2 bg-amber-400 text-white rounded-lg text-sm hover:bg-amber-500 transition-colors">
        Go home
      </Link>
    </main>
  );
};