export type MediaType = 'music' | 'podcast' | 'video';

export interface MediaItem {
  id: string;
  title: string;
  type: MediaType;
  show?: string;
  artist: string;
  duration: number;
  source: string;
  cover: string;
  tags: string[];
  description?: string;
  language?: string;
  category: string;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  items: string[]; // media ids
}

export const mediaItems: MediaItem[] = [
  {
    id: 'music-cp44-01',
    title: 'Night Coding Flow',
    type: 'music',
    artist: 'CP44 Collective',
    duration: 242,
    source: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_1a4ab9da32.mp3?filename=ambient-guitar-112191.mp3',
    cover: '/covers/night-coding.svg',
    tags: ['focus', 'instrumental', 'synthwave'],
    description: 'Laid-back synth pads with a steady beat, perfect for deep work.',
    category: 'Music',
    language: 'instrumental'
  },
  {
    id: 'music-cp44-02',
    title: 'Terminal Dreams',
    type: 'music',
    artist: 'Loop Hacker',
    duration: 198,
    source: 'https://cdn.pixabay.com/download/audio/2022/06/15/audio_8780dd71d4.mp3?filename=terminal-dreams-116199.mp3',
    cover: '/covers/terminal-dreams.svg',
    tags: ['lofi', 'coding', 'chill'],
    description: 'Lo-fi beat tape for late-night build sessions.',
    category: 'Music',
    language: 'instrumental'
  },
  {
    id: 'podcast-cp44-01',
    title: 'Security Foundations',
    type: 'podcast',
    artist: 'CP44 Talks',
    show: 'CP44 Security Talk',
    duration: 1800,
    source: 'https://samplelib.com/lib/preview/mp3/sample-6s.mp3',
    cover: '/covers/cp44-security.svg',
    tags: ['security', 'learning', 'de'],
    description: 'Einstieg in moderne AppSec-Praktiken.',
    category: 'Tech',
    language: 'de'
  },
  {
    id: 'podcast-cp44-02',
    title: 'Design for Devs',
    type: 'podcast',
    artist: 'UI Over Coffee',
    show: 'Design Systems Daily',
    duration: 2400,
    source: 'https://samplelib.com/lib/preview/mp3/sample-9s.mp3',
    cover: '/covers/design-devs.svg',
    tags: ['design', 'frontend', 'en'],
    description: 'Wie Design-Token Engineering-Teams helfen.',
    category: 'Education',
    language: 'en'
  },
  {
    id: 'podcast-cp44-03',
    title: 'Async for Breakfast',
    type: 'podcast',
    artist: 'CP44 Labs',
    show: 'Async Chronicles',
    duration: 2100,
    source: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
    cover: '/covers/async-breakfast.svg',
    tags: ['javascript', 'async', 'tech'],
    description: 'Promises, Streams und Worker im Deep-Dive.',
    category: 'Tech',
    language: 'en'
  },
  {
    id: 'video-cp44-01',
    title: 'Devlog Live #1',
    type: 'video',
    artist: 'CP44 Studio',
    duration: 960,
    source: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
    cover: '/covers/devlog-live.svg',
    tags: ['video', 'devlog', 'podcast'],
    description: 'Video-Podcast mit Code-Demo und Synthwave Beats.',
    category: 'Tech',
    language: 'en'
  },
  {
    id: 'video-cp44-02',
    title: 'Creator Roundtable',
    type: 'video',
    artist: 'Creators Sphere',
    duration: 1500,
    source: 'https://samplelib.com/lib/preview/mp4/sample-10s.mp4',
    cover: '/covers/roundtable.svg',
    tags: ['video', 'interview', 'creator'],
    description: 'Panel mit Audio- und Video-Creators aus der CP44 Community.',
    category: 'News',
    language: 'en'
  }
];

export const playlists: Playlist[] = [
  {
    id: 'playlist-night-coding',
    name: 'Night Coding',
    description: 'Synthwave und Lofi für Deep Work.',
    items: ['music-cp44-01', 'music-cp44-02', 'podcast-cp44-03']
  },
  {
    id: 'playlist-learn',
    name: 'Lern-Podcasts',
    description: 'Bleib auf dem Laufenden mit Tech-Themen.',
    items: ['podcast-cp44-01', 'podcast-cp44-02']
  },
  {
    id: 'playlist-favorites',
    name: 'CP44 Favorites',
    description: 'Kuratiert von der Community.',
    items: ['music-cp44-02', 'video-cp44-01', 'podcast-cp44-01']
  }
];

export const categories = ['Tech', 'Education', 'Music', 'News', 'Comedy'];
