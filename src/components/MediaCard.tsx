import { PlayIcon, ClockIcon, HeartIcon, PlusCircleIcon } from './icons';
import clsx from 'clsx';
import { usePlayer } from '../context/PlayerContext';
import type { MediaItem } from '../data/media';

interface MediaCardProps {
  item: MediaItem;
  onSelect?: (item: MediaItem) => void;
  variant?: 'grid' | 'list';
  showActions?: boolean;
}

const badgeColor: Record<MediaItem['type'], string> = {
  music: 'bg-cyan-500/20 text-cyan-300',
  podcast: 'bg-purple-500/20 text-purple-300',
  video: 'bg-emerald-500/20 text-emerald-300'
};

export const MediaCard: React.FC<MediaCardProps> = ({ item, onSelect, variant = 'grid', showActions = true }) => {
  const { play, queue } = usePlayer();
  const inQueue = queue.some((q) => q.id === item.id);

  const handlePlay = () => {
    const restOfQueue = [item, ...queue.filter((q) => q.id !== item.id)];
    play(item, restOfQueue);
  };

  return (
    <article
      className={clsx(
        'group relative flex cursor-pointer flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg shadow-cyan-900/10 transition-all duration-300 hover:-translate-y-1 hover:border-cyber/40 hover:bg-slate-900/90',
        variant === 'list' && 'flex-row items-center'
      )}
      onClick={() => onSelect?.(item)}
    >
      <div className={clsx('relative aspect-square w-full overflow-hidden rounded-xl bg-slate-800', variant === 'list' && 'h-24 w-24 flex-none')}>
        <img
          src={item.cover || '/covers/placeholder.svg'}
          alt={item.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className={clsx('absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold tracking-wide', badgeColor[item.type])}>
          {item.type.toUpperCase()}
        </span>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handlePlay();
          }}
          className="absolute bottom-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyber/80 text-slate-900 opacity-0 shadow-lg shadow-cyber/40 transition-opacity group-hover:opacity-100"
          aria-label={`Play ${item.title}`}
        >
          <PlayIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-slate-50">{item.title}</h3>
          <p className="text-sm text-slate-400">
            {item.artist}
            {item.show ? ` · ${item.show}` : ''}
          </p>
        </div>
        <p className="line-clamp-3 text-sm text-slate-400">{item.description}</p>
        <div className="mt-auto flex items-center justify-between text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <ClockIcon className="h-4 w-4" />
            {Math.floor(item.duration / 60)}:{`${item.duration % 60}`.padStart(2, '0')}
          </span>
          {showActions && (
            <div className="flex items-center gap-4">
              <button
                type="button"
                className={clsx('inline-flex items-center gap-1 transition-colors hover:text-cyber', inQueue && 'text-cyber')}
                onClick={(event) => {
                  event.stopPropagation();
                  handlePlay();
                }}
              >
                <PlayIcon className="h-4 w-4" />
                {inQueue ? 'In Queue' : 'Play'}
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1 transition-colors hover:text-neon"
                onClick={(event) => event.stopPropagation()}
              >
                <HeartIcon className="h-4 w-4" />
                Like
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1 transition-colors hover:text-cyan-300"
                onClick={(event) => event.stopPropagation()}
              >
                <PlusCircleIcon className="h-4 w-4" />
                Queue
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
