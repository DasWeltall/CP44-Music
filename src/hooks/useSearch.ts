import { useMemo } from 'react';
import type { MediaItem, MediaType } from '../data/media';
import { mediaItems } from '../data/media';

export type LengthFilter = 'short' | 'medium' | 'long' | 'any';

export interface SearchFilters {
  type: MediaType | 'all';
  length: LengthFilter;
  language: 'all' | string;
  category: 'all' | string;
}

export interface SearchResult {
  item: MediaItem;
  score: number;
}

const lengthPredicate = (item: MediaItem, length: LengthFilter) => {
  if (length === 'any') return true;
  const minutes = item.duration / 60;
  if (length === 'short') return minutes < 15;
  if (length === 'medium') return minutes >= 15 && minutes <= 45;
  if (length === 'long') return minutes > 45;
  return true;
};

const computeScore = (item: MediaItem, query: string) => {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) return 0;
  const haystack = [item.title, item.artist, item.show, item.description, item.tags.join(' ')].join(' ').toLowerCase();
  let score = 0;
  for (const token of tokens) {
    if (haystack.includes(token)) {
      score += 1;
      if (item.title.toLowerCase().startsWith(token)) score += 1;
      if (item.tags.some((tag) => tag.toLowerCase() === token)) score += 1.5;
    }
  }
  return score;
};

export const useSearch = (query: string, filters: SearchFilters) => {
  return useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    const results = mediaItems
      .filter((item) => {
        if (filters.type !== 'all' && item.type !== filters.type) return false;
        if (filters.language !== 'all' && item.language !== filters.language) return false;
        if (filters.category !== 'all' && item.category !== filters.category) return false;
        if (!lengthPredicate(item, filters.length)) return false;
        if (!trimmed) return true;
        return computeScore(item, trimmed) > 0;
      })
      .map((item) => ({ item, score: trimmed ? computeScore(item, trimmed) : 1 }));

    results.sort((a, b) => b.score - a.score);
    return results;
  }, [query, filters]);
};
