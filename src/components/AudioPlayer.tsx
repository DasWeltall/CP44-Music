import { useEffect, useRef } from 'react';
import type { MediaItem } from '../data/media';

interface AudioPlayerProps {
  item: MediaItem;
  isPlaying: boolean;
  progress: number;
  volume: number;
  onPlay: () => void;
  onPause: () => void;
  onTimeUpdate: (time: number) => void;
  onEnded: () => void;
  onLoadedMetadata?: (duration: number) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  item,
  isPlaying,
  progress,
  volume,
  onPlay,
  onPause,
  onTimeUpdate,
  onEnded,
  onLoadedMetadata
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (Math.abs(audioRef.current.currentTime - progress) > 0.25) {
      audioRef.current.currentTime = progress;
    }
  }, [progress]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      void audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, item.source]);

  return (
    <audio
      ref={audioRef}
      src={item.source}
      preload="metadata"
      onPlay={onPlay}
      onPause={onPause}
      onTimeUpdate={(event) => onTimeUpdate((event.target as HTMLAudioElement).currentTime)}
      onEnded={onEnded}
      onLoadedMetadata={(event) => onLoadedMetadata?.((event.target as HTMLAudioElement).duration)}
      className="hidden"
    />
  );
};
