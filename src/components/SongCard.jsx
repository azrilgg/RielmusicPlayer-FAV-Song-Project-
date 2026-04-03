import { motion } from 'framer-motion';
import { Play, Music2 } from 'lucide-react';
import './SongCard.css';

export default function SongCard({ song, index, onPlay, onHover, onLeave }) {
  return (
    <motion.div
      className="song-card"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onPlay(index)}
      onMouseEnter={() => onHover && onHover(index)}
      onMouseLeave={() => onLeave && onLeave()}
    >
      <div className="song-card-shimmer" />
      <div className="song-card-number">
        <span>{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="song-card-art-wrap">
        <img src={song.albumArtUrl} alt={song.title} className="song-card-art" loading="lazy" />
        <div className="song-card-art-overlay">
          <Play size={24} fill="#fff" />
        </div>
      </div>
      <div className="song-card-info">
        <h3 className="song-card-title">{song.title}</h3>
        <p className="song-card-artist">{song.artist}</p>
        <span className="song-card-album">
          <Music2 size={10} />
          {song.album}
        </span>
      </div>
      <div className="song-card-glow" />
    </motion.div>
  );
}
