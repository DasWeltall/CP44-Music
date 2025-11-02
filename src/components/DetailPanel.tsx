import { XMarkIcon, HeartIcon, PlusIcon, QueueListIcon, PlayIcon } from './icons';
import { usePlayer } from '../context/PlayerContext';
import type { MediaItem } from '../data/media';

interface DetailPanelProps {
  item?: MediaItem;
  onClose: () => void;
}

export const DetailPanel: React.FC<DetailPanelProps> = ({ item, onClose }) => {
  const { play } = usePlayer();

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-6 py-12 backdrop-blur">
      <div className="relative flex w-full max-w-4xl gap-8 rounded-3xl border border-slate-800 bg-slate-950/90 p-8 shadow-2xl shadow-cyber/30">
        <button
          type="button"
          className="absolute right-4 top-4 rounded-full border border-slate-700 p-2 text-slate-400 transition hover:text-cyber"
          onClick={onClose}
          aria-label="Close detail"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
        <img src={item.cover} alt={item.title} className="h-64 w-64 rounded-2xl border border-slate-800 object-cover" />
        <div className="flex flex-1 flex-col gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-cyber">{item.type}</span>
            <h2 className="mt-2 text-3xl font-semibold text-slate-100">{item.title}</h2>
            <p className="text-sm text-slate-400">
              {item.artist}
              {item.show ? ` · ${item.show}` : ''}
            </p>
          </div>
          <p className="text-sm leading-relaxed text-slate-300">{item.description}</p>
          <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-400">
            {item.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-slate-700 px-3 py-1">
                #{tag}
              </span>
            ))}
          </div>
          <div className="mt-auto flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-cyber/80 px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-cyber/30 transition hover:bg-cyber"
              onClick={() => {
                play(item);
                onClose();
              }}
            >
              <PlayIcon className="h-5 w-5" />
              Play now
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-5 py-3 text-sm text-slate-400 transition hover:text-neon" type="button">
              <HeartIcon className="h-5 w-5" />
              Like
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-5 py-3 text-sm text-slate-400 transition hover:text-cyber" type="button">
              <PlusIcon className="h-5 w-5" />
              Playlist
            </button>
          </div>
          {item.type !== 'music' && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-slate-300">
                <QueueListIcon className="h-4 w-4" />
                Episode breakdown coming soon.
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
                Add show notes, transcripts and chapters here to deepen the experience.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
