import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { songs } from './data/songs';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import VideoBackground from './components/VideoBackground';
import HomePage from './components/HomePage';
import PlayerPage from './components/PlayerPage';
import './App.css';

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'player'
  const [hoverVideoSrc, setHoverVideoSrc] = useState(null);

  const audio = useAudioPlayer(songs);

  const handlePlaySong = useCallback((index) => {
    audio.playSong(index);
    audio.play();
    setCurrentPage('player');
    setHoverVideoSrc(null);
  }, [audio]);

  const handleBack = useCallback(() => {
    audio.pause();
    setCurrentPage('home');
    setHoverVideoSrc(null);
  }, [audio]);

  const handleHoverSong = useCallback((index) => {
    if (window.innerWidth > 768) {
      setHoverVideoSrc(songs[index]?.videoBgSrc || null);
    }
  }, []);

  const handleLeaveSong = useCallback(() => {
    setHoverVideoSrc(null);
  }, []);

  const isPlayerActive = currentPage === 'player';
  const activeVideoSrc = isPlayerActive
    ? audio.currentSong?.videoBgSrc
    : hoverVideoSrc;

  return (
    <div className="app">
      {/* Preloader */}
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}

      {/* Video Background */}
      <VideoBackground
        src={activeVideoSrc}
        isActive={!!activeVideoSrc}
      />

      {/* Navbar */}
      <Navbar />

      {/* Pages */}
      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <HomePage
            key="home"
            songs={songs}
            onPlaySong={handlePlaySong}
            onHoverSong={handleHoverSong}
            onLeaveSong={handleLeaveSong}
          />
        )}
        {currentPage === 'player' && (
          <PlayerPage
            key="player"
            song={audio.currentSong}
            onBack={handleBack}
            audioState={audio}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
