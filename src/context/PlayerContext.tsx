import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import type { MediaItem } from '../data/media';

const PROGRESS_STORE_KEY = 'cp44-progress';
const QUEUE_STORE_KEY = 'cp44-queue';

interface ProgressStore {
  [mediaId: string]: number;
}

export interface PlayerContextValue {
  current?: MediaItem;
  queue: MediaItem[];
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  repeat: boolean;
  progressStore: ProgressStore;
  play: (item: MediaItem, queue?: MediaItem[]) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrev: () => void;
  seek: (value: number) => void;
  setVolume: (value: number) => void;
  setRepeat: (value: boolean) => void;
  updateProgress: (value: number) => void;
  updateDuration: (value: number) => void;
  rememberProgress: (mediaId: string, value: number) => void;
  loadQueue: (items: MediaItem[]) => void;
}

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [current, setCurrent] = useState<MediaItem | undefined>();
  const [queue, setQueue] = useState<MediaItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = window.localStorage.getItem(QUEUE_STORE_KEY);
      if (!stored) return [];
      return JSON.parse(stored) as MediaItem[];
    } catch (error) {
      console.warn('Failed to parse queue', error);
      return [];
    }
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.9);
  const [repeat, setRepeat] = useState(false);
  const progressStoreRef = useRef<ProgressStore>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(PROGRESS_STORE_KEY);
      if (raw) {
        progressStoreRef.current = JSON.parse(raw) as ProgressStore;
      }
    } catch (error) {
      console.warn('Failed to read progress store', error);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(QUEUE_STORE_KEY, JSON.stringify(queue));
  }, [queue]);

  const rememberProgress = useCallback((mediaId: string, value: number) => {
    progressStoreRef.current = {
      ...progressStoreRef.current,
      [mediaId]: value
    };
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(PROGRESS_STORE_KEY, JSON.stringify(progressStoreRef.current));
    }
  }, []);

  const play = useCallback(
    (item: MediaItem, nextQueue?: MediaItem[]) => {
      setCurrent(item);
      setIsPlaying(true);
      setDuration(item.duration ?? 0);
      const resume = progressStoreRef.current[item.id];
      setProgress(resume ?? 0);
      if (nextQueue) {
        setQueue(nextQueue);
      } else {
        setQueue((prev) => {
          if (prev.length === 0 || prev[0].id !== item.id) {
            return [item, ...prev.filter((x) => x.id !== item.id)];
          }
          return prev;
        });
      }
    },
    []
  );

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const playNext = useCallback(() => {
    if (!current) return;
    const index = queue.findIndex((item) => item.id === current.id);
    const next = queue[index + 1];
    if (next) {
      play(next);
    } else if (repeat && queue.length > 0) {
      play(queue[0]);
    } else {
      setIsPlaying(false);
      setProgress(0);
    }
  }, [current, queue, repeat, play]);

  const playPrev = useCallback(() => {
    if (!current) return;
    const index = queue.findIndex((item) => item.id === current.id);
    const prevItem = queue[index - 1];
    if (prevItem) {
      play(prevItem);
    } else {
      setProgress(0);
    }
  }, [current, queue, play]);

  const seek = useCallback(
    (value: number) => {
      setProgress(value);
      if (current) {
        rememberProgress(current.id, value);
      }
    },
    [current, rememberProgress]
  );

  const setVolume = useCallback((value: number) => {
    setVolumeState(value);
  }, []);

  const updateProgress = useCallback(
    (value: number) => {
      setProgress(value);
      if (current) {
        rememberProgress(current.id, value);
      }
    },
    [current, rememberProgress]
  );

  const updateDuration = useCallback((value: number) => {
    setDuration(value);
  }, []);

  const loadQueue = useCallback((items: MediaItem[]) => {
    setQueue(items);
  }, []);

  const value: PlayerContextValue = useMemo(
    () => ({
      current,
      queue,
      isPlaying,
      progress,
      duration,
      volume,
      repeat,
      progressStore: progressStoreRef.current,
      play,
      togglePlay,
      playNext,
      playPrev,
      seek,
      setVolume,
      setRepeat,
      updateProgress,
      updateDuration,
      rememberProgress,
      loadQueue
    }),
    [current, queue, isPlaying, progress, duration, volume, repeat, play, togglePlay, playNext, playPrev, seek, setVolume, setRepeat, updateProgress, updateDuration, rememberProgress, loadQueue]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within PlayerProvider');
  }
  return context;
};
