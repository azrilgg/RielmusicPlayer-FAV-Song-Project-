import { useRef, useEffect, useState } from 'react';
import './VideoBackground.css';

export default function VideoBackground({ src, isActive }) {
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive && src) {
      video.src = src;
      video.load();
      video.play().catch(() => {});
      setLoaded(true);
    } else {
      video.pause();
      video.removeAttribute('src');
      video.load();
      setLoaded(false);
    }
  }, [src, isActive]);

  return (
    <div className={`video-bg ${isActive && loaded ? 'video-bg--active' : ''}`}>
      <video
        ref={videoRef}
        className="video-bg-el"
        muted
        loop
        playsInline
        preload="none"
      />
      <div className="video-bg-overlay" />
    </div>
  );
}
