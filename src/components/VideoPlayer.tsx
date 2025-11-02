import { useEffect, useRef } from 'react';
import type { MediaItem } from '../data/media';

interface VideoPlayerProps {
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

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
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
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (Math.abs(videoRef.current.currentTime - progress) > 0.25) {
      videoRef.current.currentTime = progress;
    }
  }, [progress]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      void videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying, item.source]);

  return (
    <video
      ref={videoRef}
      src={item.source}
      controls
      className="max-h-72 w-full rounded-xl border border-slate-800 bg-black"
      onPlay={onPlay}
      onPause={onPause}
      onTimeUpdate={(event) => onTimeUpdate((event.target as HTMLVideoElement).currentTime)}
      onEnded={onEnded}
      onLoadedMetadata={(event) => onLoadedMetadata?.((event.target as HTMLVideoElement).duration)}
    />
  );
};
