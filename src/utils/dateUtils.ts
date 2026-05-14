import { differenceInDays, parseISO, isValid } from 'date-fns';

export const getDaysUntilDeadline = (deadline: string | null): number | null => {
  if (!deadline) return null;
  const date = parseISO(deadline);
  if (!isValid(date)) return null;
  return differenceInDays(date, new Date());
};

export const formatDeadline = (deadline: string | null): string => {
  if (!deadline) return '—';
  return deadline;
};

export const getDeadlineBadge = (deadline: string | null): { label: string; color: string } | null => {
  const days = getDaysUntilDeadline(deadline);
  if (days === null) return null;
  if (days < 0) return { label: `${Math.abs(days)}d overdue`, color: 'text-red-500' };
  if (days <= 7) return { label: `${days}d left`, color: 'text-amber-500' };
  return null;
};