import { BackwardIcon, ForwardIcon, PauseIcon, PlayIcon, SpeakerWaveIcon, ArrowPathIcon } from './icons';
import clsx from 'clsx';
import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';
import { useMemo, useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { AudioPlayer } from './AudioPlayer';
import { VideoPlayer } from './VideoPlayer';

dayjs.extend(durationPlugin);

const formatSeconds = (value: number) => {
  const dur = dayjs.duration(value, 'seconds');
  const minutes = Math.floor(dur.asMinutes());
  const seconds = dur.seconds().toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

export const StickyPlayer: React.FC = () => {
  const {
    current,
    isPlaying,
    progress,
    duration,
    volume,
    repeat,
    queue,
    togglePlay,
    playNext,
    playPrev,
    seek,
    setVolume,
    setRepeat,
    updateProgress,
    updateDuration,
    play
  } = usePlayer();
  const [isExpanded, setExpanded] = useState(false);

  const displayDuration = duration || current?.duration || 0;
  const percent = displayDuration ? Math.min(100, (progress / displayDuration) * 100) : 0;

  const waveformGradient = useMemo(
    () => ({
      background: `linear-gradient(90deg, rgba(56,189,248,0.8) ${percent}%, rgba(148,163,184,0.2) ${percent}%)`
    }),
    [percent]
  );

  if (!current) return null;

  return (
    <div className={clsx('fixed inset-x-0 bottom-0 border-t border-slate-800 bg-slate-950/95 backdrop-blur-lg transition-all', isExpanded ? 'h-80' : 'h-28')}>
      <div className="flex h-full w-full flex-col">
        <div className="flex flex-1 items-center gap-6 px-8 py-4">
          <div className="flex items-center gap-4">
            <img src={current.cover} alt={current.title} className="h-16 w-16 rounded-xl border border-slate-800 object-cover" />
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-100">{current.title}</h3>
              <p className="text-xs text-slate-400">
                {current.artist}
                {current.show ? ` · ${current.show}` : ''}
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <div className="flex items-center justify-center gap-4">
              <button type="button" className="rounded-lg p-2 text-slate-400 transition hover:text-cyber" onClick={playPrev}>
                <BackwardIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-cyber/80 text-slate-900 shadow-lg shadow-cyber/30 transition hover:bg-cyber"
                onClick={togglePlay}
              >
                {isPlaying ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
              </button>
              <button type="button" className="rounded-lg p-2 text-slate-400 transition hover:text-cyber" onClick={playNext}>
                <ForwardIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                className={clsx('rounded-lg p-2 transition', repeat ? 'text-neon' : 'text-slate-500 hover:text-neon')}
                onClick={() => setRepeat(!repeat)}
              >
                <ArrowPathIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <span className="w-12 text-right font-semibold text-slate-300">{formatSeconds(progress)}</span>
              <div className="relative h-2 flex-1 cursor-pointer overflow-hidden rounded-full bg-slate-800" onClick={(event) => {
                const rect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
                const ratio = (event.clientX - rect.left) / rect.width;
                const value = ratio * displayDuration;
                seek(Math.max(0, Math.min(displayDuration, value)));
              }}>
                <div className="absolute inset-0 rounded-full" style={waveformGradient} />
              </div>
              <span className="w-12 text-left font-semibold text-slate-300">{formatSeconds(displayDuration)}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <SpeakerWaveIcon className="h-5 w-5 text-slate-500" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              className="h-1 w-28 cursor-pointer appearance-none rounded-full bg-slate-700 accent-cyber"
            />
            <button
              type="button"
              className="rounded-xl border border-slate-800 px-3 py-1 text-xs text-slate-400 transition hover:text-cyber"
              onClick={() => setExpanded((prev) => !prev)}
            >
              {isExpanded ? 'Mini' : 'Expand'}
            </button>
          </div>
        </div>
        <div className={clsx('grid flex-1 gap-4 border-t border-slate-900 px-8 py-4', current.type === 'video' ? 'grid-cols-[2fr_1fr]' : 'grid-cols-3')}>
          <div className="space-y-4">
            {current.type === 'video' ? (
              <VideoPlayer
                item={current}
                isPlaying={isPlaying}
                progress={progress}
                volume={volume}
                onPlay={() => undefined}
                onPause={() => updateProgress(progress)}
                onTimeUpdate={(time) => updateProgress(time)}
                onEnded={playNext}
                onLoadedMetadata={updateDuration}
              />
            ) : (
              <AudioPlayer
                item={current}
                isPlaying={isPlaying}
                progress={progress}
                volume={volume}
                onPlay={() => undefined}
                onPause={() => updateProgress(progress)}
                onTimeUpdate={(time) => updateProgress(time)}
                onEnded={playNext}
                onLoadedMetadata={updateDuration}
              />
            )}
            <p className="text-xs text-slate-400">
              Continue listening is automatic – we save your latest timestamp for podcasts.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Up Next</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {queue
                .filter((item) => item.id !== current.id)
                .slice(0, 4)
                .map((item) => (
                  <li key={item.id} className="flex items-center justify-between rounded-lg border border-slate-800/60 bg-slate-900/50 px-3 py-2">
                    <div>
                      <p className="font-semibold text-slate-200">{item.title}</p>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">{item.type}</p>
                    </div>
                    <button
                      type="button"
                      className="rounded-full border border-slate-700 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-400 transition hover:text-cyber"
                      onClick={() => play(item)}
                    >
                      Play
                    </button>
                  </li>
                ))}
            </ul>
          </div>
          {current.type !== 'video' && (
            <div className="hidden flex-col gap-3 lg:flex">
              <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Context</h4>
              <p className="text-xs leading-relaxed text-slate-400">{current.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
