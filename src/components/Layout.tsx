import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Playlist } from '../data/media';

interface LayoutProps {
  children: React.ReactNode;
  current: string;
  onNavigate: (route: string) => void;
  playlists: Playlist[];
  query: string;
  onQueryChange: (value: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, current, onNavigate, playlists, query, onQueryChange }) => {
  return (
    <div className="flex h-screen bg-slate-950 text-slate-100">
      <Sidebar current={current} onNavigate={onNavigate} playlists={playlists} />
      <div className="flex flex-1 flex-col">
        <Topbar query={query} onQueryChange={onQueryChange} />
        <main className="flex-1 overflow-y-auto pb-32">{children}</main>
      </div>
    </div>
  );
};
