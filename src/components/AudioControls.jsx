import { Play, Pause, SkipBack, SkipForward, Repeat, Repeat1, Shuffle, Volume1, Volume2 } from 'lucide-react';
import './AudioControls.css';

export default function AudioControls({
  isPlaying, togglePlay, next, prev, currentTime, duration, seek,
  volume, setVolume, speed, setSpeed, isShuffle, toggleShuffle,
  repeatMode, cycleRepeat
}) {
  const progress = duration ? (currentTime / duration) * 100 : 0;

  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    seek(ratio * duration);
  };

  return (
    <div className="audio-controls">
      {/* Progress */}
      <div className="ac-progress-section">
        <div className="ac-progress-bar-wrap" onClick={handleProgressClick}>
          <div className="ac-progress-track">
            <div className="ac-progress-fill" style={{ width: `${progress}%` }}>
              <div className="ac-progress-glow" />
            </div>
          </div>
        </div>
        <div className="ac-time-row">
          <span>{fmt(currentTime)}</span>
          <span>{fmt(duration)}</span>
        </div>
      </div>

      {/* Main buttons */}
      <div className="ac-main-btns">
        <button className="ac-btn ac-btn--sm" onClick={prev} aria-label="Previous">
          <SkipBack size={20} />
        </button>
        <button className="ac-btn ac-btn--play" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? <Pause size={28} /> : <Play size={28} fill="#000" />}
        </button>
        <button className="ac-btn ac-btn--sm" onClick={next} aria-label="Next">
          <SkipForward size={20} />
        </button>
      </div>

      {/* Secondary */}
      <div className="ac-secondary">
        <button
          className={`ac-btn ac-btn--tiny ${repeatMode > 0 ? 'ac-btn--active' : ''}`}
          onClick={cycleRepeat}
          aria-label="Repeat"
        >
          {repeatMode === 1 ? <Repeat1 size={16} /> : <Repeat size={16} />}
        </button>

        <button
          className={`ac-btn ac-btn--tiny ${isShuffle ? 'ac-btn--active' : ''}`}
          onClick={toggleShuffle}
          aria-label="Shuffle"
        >
          <Shuffle size={16} />
        </button>

        <div className="ac-slider-group">
          <Volume1 size={14} className="ac-slider-icon" />
          <input
            type="range" min="0" max="1" step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="ac-slider ac-slider--blue"
            style={{ background: `linear-gradient(90deg, var(--neon-blue) ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%)` }}
          />
          <Volume2 size={14} className="ac-slider-icon" />
        </div>

        <div className="ac-slider-group">
          <span className="ac-speed-label">SPD</span>
          <input
            type="range" min="0.5" max="2" step="0.25"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="ac-slider ac-slider--pink"
            style={{ background: `linear-gradient(90deg, var(--neon-pink) ${((speed - 0.5) / 1.5) * 100}%, rgba(255,255,255,0.1) ${((speed - 0.5) / 1.5) * 100}%)` }}
          />
          <span className="ac-speed-val">{speed.toFixed(1)}x</span>
        </div>
      </div>
    </div>
  );
}
