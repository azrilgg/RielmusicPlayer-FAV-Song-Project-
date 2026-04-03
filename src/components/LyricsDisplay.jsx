import { useRef, useEffect } from 'react';
import './LyricsDisplay.css';

export default function LyricsDisplay({ lyrics, currentTime }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const active = containerRef.current.querySelector('.lyric-line--active');
    if (active) {
      const cRect = containerRef.current.getBoundingClientRect();
      const aRect = active.getBoundingClientRect();
      if (aRect.top < cRect.top || aRect.bottom > cRect.bottom) {
        active.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentTime]);

  if (!lyrics || lyrics.length === 0) {
    return (
      <div className="lyrics-display" ref={containerRef}>
        <p className="lyrics-empty">No lyrics available</p>
      </div>
    );
  }

  // Find active line index
  let activeIdx = -1;
  for (let i = lyrics.length - 1; i >= 0; i--) {
    if (currentTime >= parseFloat(lyrics[i].time)) {
      activeIdx = i;
      break;
    }
  }

  return (
    <div className="lyrics-display" ref={containerRef}>
      {lyrics.map((line, i) => {
        const isActive = i === activeIdx;
        const isPast = i < activeIdx;
        return (
          <span
            key={i}
            className={`lyric-line ${isActive ? 'lyric-line--active' : ''} ${isPast ? 'lyric-line--past' : ''}`}
          >
            {line.text}
          </span>
        );
      })}
    </div>
  );
}
