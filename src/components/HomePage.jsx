import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Headphones, AudioWaveform } from 'lucide-react';
import SongCard from './SongCard';
import './HomePage.css';

export default function HomePage({ songs, onPlaySong, onHoverSong, onLeaveSong }) {
  return (
    <motion.div
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <div className="home-container">
        <header className="home-header">
          <motion.h1
            className="home-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Azriel <span className="home-title-accent">Music</span>
          </motion.h1>
          <motion.p
            className="home-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Select Your Vibe
          </motion.p>
        </header>

        <div className="home-song-grid">
          {songs.map((song, i) => (
            <SongCard
              key={song.id}
              song={song}
              index={i}
              onPlay={onPlaySong}
              onHover={onHoverSong}
              onLeave={onLeaveSong}
            />
          ))}
        </div>

        <div className="home-features">
          <motion.div
            className="home-feature-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <AudioWaveform size={28} className="home-feature-icon" />
            <h3>Visualizer</h3>
            <p>Immersive 3D Experience</p>
          </motion.div>
          <motion.div
            className="home-feature-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <Headphones size={28} className="home-feature-icon" />
            <h3>High Res</h3>
            <p>Crystal Clear Audio</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
