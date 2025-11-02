import { HomeIcon, MagnifyingGlassIcon, MusicalNoteIcon, QueueListIcon } from './icons';
import clsx from 'clsx';
import type { Playlist } from '../data/media';

interface SidebarProps {
  current: string;
  onNavigate: (route: string) => void;
  playlists: Playlist[];
}

const navItems = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'search', label: 'Search', icon: MagnifyingGlassIcon },
  { id: 'library', label: 'Library', icon: MusicalNoteIcon },
  { id: 'playlists', label: 'Playlists', icon: QueueListIcon }
];

export const Sidebar: React.FC<SidebarProps> = ({ current, onNavigate, playlists }) => {
  return (
    <aside className="flex w-64 flex-col gap-8 border-r border-slate-800 bg-slate-950/80 p-6 backdrop-blur">
      <div>
        <span className="text-xs uppercase tracking-[0.3em] text-slate-500">Platform</span>
        <h1 className="mt-2 text-2xl font-semibold text-slate-100">CP44 Music</h1>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = current === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={clsx(
                'flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium transition-all',
                active
                  ? 'bg-slate-800 text-cyber'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="mt-auto space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Playlists</h2>
        <ul className="space-y-2 text-sm text-slate-400">
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              <button
                type="button"
                className="w-full text-left transition-colors hover:text-cyber"
                onClick={() => onNavigate(`playlist:${playlist.id}`)}
              >
                {playlist.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
