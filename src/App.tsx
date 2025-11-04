import { useMemo, useState } from 'react';
import { PlayerProvider, usePlayer } from './context/PlayerContext';
import { Layout } from './components/Layout';
import { StickyPlayer } from './components/StickyPlayer';
import { Home } from './pages/Home';
import { SearchPage } from './pages/SearchPage';
import { Library } from './pages/Library';
import { DetailPanel } from './components/DetailPanel';
import type { MediaItem } from './data/media';
import { mediaItems, playlists } from './data/media';

const AppShell: React.FC = () => {
  const { progressStore, play, loadQueue } = usePlayer();
  const [route, setRoute] = useState('home');
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MediaItem | undefined>();

  const focusPlaylistId = route.startsWith('playlist:') ? route.split(':')[1] : undefined;

  const continueListening = useMemo(() => {
    const entries = Object.entries(progressStore)
      .filter(([_, value]) => value > 10)
      .map(([mediaId]) => mediaItems.find((item) => item.id === mediaId))
      .filter(Boolean) as MediaItem[];
    return entries.slice(0, 6);
  }, [progressStore]);

  const handleSelect = (item: MediaItem) => {
    setSelectedItem(item);
  };

  const handlePlayCollection = (items: MediaItem[]) => {
    if (!items.length) return;
    loadQueue(items);
    play(items[0], items);
  };

  const content = (() => {
    if (route === 'home') {
      return <Home onSelect={handleSelect} continueListening={continueListening} />;
    }
    if (route === 'search') {
      return <SearchPage query={query} onSelect={handleSelect} />;
    }
    if (route === 'library' || route === 'playlists' || focusPlaylistId) {
      return (
        <Library
          onSelect={handleSelect}
          onPlayCollection={handlePlayCollection}
          focusPlaylistId={focusPlaylistId}
        />
      );
    }
    return <Home onSelect={handleSelect} continueListening={continueListening} />;
  })();

  return (
    <>
      <Layout
        current={route}
        onNavigate={(next) => setRoute(next)}
        playlists={playlists}
        query={query}
        onQueryChange={(value) => {
          setQuery(value);
          setRoute('search');
        }}
      >
        {content}
      </Layout>
      <StickyPlayer />
      <DetailPanel item={selectedItem} onClose={() => setSelectedItem(undefined)} />
    </>
  );
};

const App: React.FC = () => (
  <PlayerProvider>
    <AppShell />
  </PlayerProvider>
);

export default App;
