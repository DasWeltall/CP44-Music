import { useEffect } from 'react';
import { CommandLineIcon } from './icons';

interface TopbarProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export const Topbar: React.FC<TopbarProps> = ({ query, onQueryChange }) => {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === '/') {
        event.preventDefault();
        const input = document.getElementById('cp44-search-input');
        input?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-8 py-5">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative flex-1">
          <input
            id="cp44-search-input"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search music, podcasts, creators..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:border-cyber focus:outline-none focus:ring-2 focus:ring-cyber/40"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-lg border border-slate-700 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-500">
            /
          </span>
        </div>
      </div>
      <div className="ml-6 inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2 text-xs text-slate-400">
        <CommandLineIcon className="h-4 w-4" />
        <span>Keyboard shortcuts soon</span>
      </div>
    </header>
  );
};
