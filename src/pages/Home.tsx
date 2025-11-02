import { Fragment } from 'react';
import { MediaCard } from '../components/MediaCard';
import type { MediaItem } from '../data/media';
import { mediaItems } from '../data/media';

interface HomeProps {
  onSelect: (item: MediaItem) => void;
  continueListening: MediaItem[];
}

const Section: React.FC<{ title: string; items: MediaItem[]; onSelect: (item: MediaItem) => void }> = ({ title, items, onSelect }) => (
  <section className="space-y-4">
    <div className="flex items-center justify-between">
      <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">{title}</h2>
      <button type="button" className="text-xs uppercase tracking-[0.3em] text-slate-500 transition hover:text-cyber">
        View all
      </button>
    </div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {items.map((item) => (
        <MediaCard key={item.id} item={item} onSelect={onSelect} />
      ))}
    </div>
  </section>
);

export const Home: React.FC<HomeProps> = ({ onSelect, continueListening }) => {
  const trending = mediaItems.slice(0, 4);
  const newPodcasts = mediaItems.filter((item) => item.type === 'podcast').slice(0, 4);
  const videoPodcasts = mediaItems.filter((item) => item.type === 'video');
  const musicPicks = mediaItems.filter((item) => item.type === 'music');

  const sections: { title: string; items: MediaItem[] }[] = [
    { title: 'Continue Listening', items: continueListening.length ? continueListening : trending },
    { title: 'Trending now', items: trending },
    { title: 'New podcasts', items: newPodcasts },
    { title: 'Video podcasts', items: videoPodcasts },
    { title: 'Soundtracks to code', items: musicPicks }
  ];

  return (
    <div className="space-y-12 px-8 py-10">
      {sections.map(({ title, items }) => (
        <Fragment key={title}>
          <Section title={title} items={items} onSelect={onSelect} />
        </Fragment>
      ))}
    </div>
  );
};
