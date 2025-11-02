# CP44 Music

A dark, monospace-first media platform for music, podcasts, and video podcasts. Built with React, Vite, and Tailwind CSS.

## Features

- Home dashboard with "Continue Listening", trending music, new podcasts, and video pods
- Global search across all media with type, length, language, and category filters
- Sticky global player that switches between audio and video, keeps queue state, and remembers podcast progress
- Detail drawer with track, show, and episode metadata
- Playlist-centric library view with quick play and category browsing
- Dummy data sets for tracks, podcast shows, episodes (audio/video), and playlists

## Tech Stack

- React + TypeScript (Vite)
- Tailwind CSS for terminal-inspired dark styling
- Context-driven player state with persistent progress and queue

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173 to explore CP44 Music.

## Project Structure

```
src/
├── App.tsx               # Layout shell, navigation, routing
├── components/           # Sidebar, Topbar, MediaCard, players, detail panel
├── context/              # PlayerContext (queue, playback, persistence)
├── data/                 # media.ts with dummy data + playlists + categories
├── hooks/                # useSearch for ranked filtering
├── pages/                # Home, Search, Library views
└── styles/               # Tailwind entry point and global styling
public/
└── covers/               # Monospace SVG artwork used as placeholders
```

## Media Sources

The dummy catalogue references openly available sample media URLs (audio + video) so playback works out of the box. Replace them with your own assets under `public/media/` when you are ready.

## Extensibility Ideas

- Authentication, user profiles, and personalized recommendations
- Creator upload pipeline with RSS ingestion for podcasts
- Chapter markers with transcripts for long-form episodes
- Keyboard shortcuts (Space, J/K, +/- volume) and waveform visualizers
- Smart playlist generation (e.g., "For Coding" mood mixes)

Enjoy building the future of developer-grade media streaming with **CP44 Music**!
