import { useState } from 'react';
import { FunnelIcon } from '../components/icons';
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

  return (
    <div className="space-y-10 px-8 py-10">
      <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500">
          <FunnelIcon className="h-4 w-4" /> Filters
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          <div className="space-y-2">
            <p className="text-xs text-slate-400">Type</p>
            <div className="flex flex-wrap gap-2">
              {typeFilters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => updateFilter('type', filter.id)}
                  className={`rounded-full border px-3 py-1 text-xs transition ${
                    filters.type === filter.id
                      ? 'border-cyber text-cyber'
                      : 'border-slate-700 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-slate-400">Length</p>
            <div className="flex flex-wrap gap-2">
              {lengthFilters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => updateFilter('length', filter.id as SearchFilters['length'])}
                  className={`rounded-full border px-3 py-1 text-xs transition ${
                    filters.length === filter.id
                      ? 'border-cyber text-cyber'
                      : 'border-slate-700 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-slate-400">Language</p>
            <select
              value={filters.language}
              onChange={(event) => updateFilter('language', event.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-xs text-slate-200"
            >
              <option value="all">All</option>
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-slate-400">Category</p>
            <select
              value={filters.category}
              onChange={(event) => updateFilter('category', event.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-xs text-slate-200"
            >
              <option value="all">All</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
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
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Suggestions</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {suggestions.map((item) => (
              <MediaCard key={item.id} item={item} onSelect={onSelect} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
