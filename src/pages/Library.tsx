import { useMemo } from 'react';
import { AdjustmentsHorizontalIcon, PencilIcon, PlayIcon, TrashIcon } from '../components/icons';
import { MediaCard } from '../components/MediaCard';
import type { MediaItem } from '../data/media';
import { categories, mediaItems, playlists, type Playlist } from '../data/media';

interface LibraryProps {
  onSelect: (item: MediaItem) => void;
  onPlayCollection: (items: MediaItem[]) => void;
  focusPlaylistId?: string;
}

export const Library: React.FC<LibraryProps> = ({ onSelect, onPlayCollection, focusPlaylistId }) => {
  const playlistMap = useMemo(() => new Map(playlists.map((playlist) => [playlist.id, playlist])), []);
  const focused = focusPlaylistId ? playlistMap.get(focusPlaylistId) : undefined;

  const resolveItems = (collection: Playlist) => collection.items.map((id) => mediaItems.find((item) => item.id === id)).filter(Boolean) as MediaItem[];

  const categorized = categories.map((category) => ({
    category,
    items: mediaItems.filter((item) => item.category === category)
  }));

  return (
    <div className="space-y-10 px-8 py-10">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Your playlists</h2>
          <button type="button" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-500 transition hover:text-cyber">
            <AdjustmentsHorizontalIcon className="h-4 w-4" /> Manage
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {playlists.map((playlist) => {
            const items = resolveItems(playlist);
            return (
              <div key={playlist.id} className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-100">{playlist.name}</h3>
                    <p className="text-xs text-slate-400">{playlist.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <button type="button" className="rounded-full border border-slate-700 p-2 hover:text-cyber">
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button type="button" className="rounded-full border border-slate-700 p-2 hover:text-neon">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  <span>{items.length} items</span>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-cyber/40 px-3 py-1 text-xs text-cyber hover:border-cyber"
                    onClick={() => onPlayCollection(items)}
                  >
                    <PlayIcon className="h-4 w-4" /> Play all
                  </button>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {items.slice(0, 4).map((item) => (
                    <MediaCard key={item.id} item={item} variant="list" onSelect={onSelect} showActions={false} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {focused && (
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Focus: {focused.name}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {resolveItems(focused).map((item) => (
              <MediaCard key={item.id} item={item} onSelect={onSelect} />
            ))}
          </div>
        </section>
      )}
      <section className="space-y-6">
        <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Browse by category</h2>
        <div className="space-y-8">
          {categorized.map(({ category, items }) => (
            <div key={category} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs uppercase tracking-[0.3em] text-slate-500">{category}</h3>
                <button type="button" className="text-[10px] uppercase tracking-[0.3em] text-slate-500 transition hover:text-cyber">
                  See all
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {items.slice(0, 4).map((item) => (
                  <MediaCard key={item.id} item={item} onSelect={onSelect} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
