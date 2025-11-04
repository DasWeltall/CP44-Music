import { useState } from 'react';
import { FunnelIcon, MagnifyingGlassIcon, XMarkIcon } from '../components/icons';
import { MediaCard } from '../components/MediaCard';
import type { MediaItem, MediaType } from '../data/media';
import { categories, mediaItems } from '../data/media';
import { useSearch, type SearchFilters } from '../hooks/useSearch';

const typeFilters: Array<{ id: MediaType | 'all'; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'music', label: 'Music' },
  { id: 'podcast', label: 'Podcasts' },
  { id: 'video', label: 'Video Pods' }
];

const lengthFilters = [
  { id: 'any', label: 'Any' },
  { id: 'short', label: '< 15m' },
  { id: 'medium', label: '15-45m' },
  { id: 'long', label: '> 45m' }
];

interface SearchPageProps {
  query: string;
  onSelect: (item: MediaItem) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ query, onSelect }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    type: 'all',
    length: 'any',
    language: 'all',
    category: 'all'
  });
  const results = useSearch(query, filters);

  const languages = Array.from(new Set(mediaItems.map((item) => item.language).filter(Boolean))) as string[];

  const updateFilter = <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const suggestions = mediaItems.slice(0, 6);
  const recentSearches = ['lo-fi', 'indie', 'sad girl country', 'study', 'k-pop', 'true crime'];

  return (
    <div className="space-y-10 px-8 py-10">
      {query ? (
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            {results.length} results for “{query}”
          </h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {results.map(({ item }) => (
              <MediaCard key={item.id} item={item} onSelect={onSelect} />
            ))}
          </div>
          {results.length === 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-10 text-center text-sm text-slate-400">
              No exact matches. Try a broader search or explore categories.
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Recent Searches</h2>
              <button
                type="button"
                className="text-[10px] uppercase tracking-[0.3em] text-slate-500 transition hover:text-cyber"
              >
                Clear
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {recentSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-800/80 px-4 py-2 text-xs text-slate-300 transition hover:bg-slate-800"
                >
                  <MagnifyingGlassIcon className="h-4 w-4 text-slate-500" />
                  {term}
                  <XMarkIcon className="h-4 w-4 text-slate-500" />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Suggestions</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {suggestions.map((item) => (
                <MediaCard key={item.id} item={item} onSelect={onSelect} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
