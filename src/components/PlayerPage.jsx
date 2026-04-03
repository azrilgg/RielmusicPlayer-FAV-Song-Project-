import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import LyricsDisplay from './LyricsDisplay';
import AudioControls from './AudioControls';
import './PlayerPage.css';

export default function PlayerPage({ song, onBack, audioState }) {
  if (!song) return null;

  return (
    <motion.div
      className="player-page"
      initial={{ opacity: 0, scale: 0.95, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 40 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="player-container">
        <button className="player-back-btn" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>BACK</span>
        </button>

        <div className="player-box">
          {/* Vinyl disc */}
          <div className="player-disc-wrap">
            <div className={`player-disc ${audioState.isPlaying ? 'player-disc--spinning' : ''}`}>
              <img src={song.albumArtUrl} alt={song.title} className="player-disc-art" />
              <div className="player-disc-hole" />
            </div>
            <div className="player-disc-glow" />
          </div>

          {/* Track info */}
          <div className="player-track-info">
            <h2 className="player-track-title">{song.title}</h2>
            <p className="player-track-artist">{song.artist}</p>
          </div>

          {/* Lyrics */}
          <LyricsDisplay
            lyrics={song.lyrics}
            currentTime={audioState.currentTime}
          />

          {/* Controls */}
          <AudioControls
            isPlaying={audioState.isPlaying}
            togglePlay={audioState.togglePlay}
            next={audioState.next}
            prev={audioState.prev}
            currentTime={audioState.currentTime}
            duration={audioState.duration}
            seek={audioState.seek}
            volume={audioState.volume}
            setVolume={audioState.setVolume}
            speed={audioState.speed}
            setSpeed={audioState.setSpeed}
            isShuffle={audioState.isShuffle}
            toggleShuffle={audioState.toggleShuffle}
            repeatMode={audioState.repeatMode}
            cycleRepeat={audioState.cycleRepeat}
          />

          <p className="player-credit">DESIGN BY AZRIEL | God Mode ON</p>
        </div>
      </div>
    </motion.div>
  );
}
