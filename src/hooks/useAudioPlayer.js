import { useState, useRef, useCallback, useEffect } from 'react';

export function useAudioPlayer(songs) {
  const audioRef = useRef(new Audio());
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [speed, setSpeedState] = useState(1.0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: one, 2: all

  const currentSong = songs[currentSongIndex] || null;

  useEffect(() => {
    const audio = audioRef.current;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => {
      if (repeatMode === 1) {
        audio.currentTime = 0;
        audio.play();
      } else if (isShuffle) {
        playRandom();
      } else {
        const nextIdx = currentSongIndex + 1;
        if (nextIdx >= songs.length) {
          if (repeatMode === 2) {
            setCurrentSongIndex(0);
          } else {
            setIsPlaying(false);
            return;
          }
        } else {
          setCurrentSongIndex(nextIdx);
        }
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [currentSongIndex, repeatMode, isShuffle, songs.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (currentSong) {
      audio.src = currentSong.audioSrc;
      audio.load();
      audio.volume = volume;
      audio.playbackRate = speed;
      if (isPlaying) {
        audio.play().catch(() => {});
      }
    }
  }, [currentSongIndex, currentSong]);

  const play = useCallback(() => {
    audioRef.current.play().catch(() => {});
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const seek = useCallback((time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  const setVolume = useCallback((v) => {
    audioRef.current.volume = v;
    setVolumeState(v);
  }, []);

  const setSpeed = useCallback((s) => {
    audioRef.current.playbackRate = s;
    setSpeedState(s);
  }, []);

  const playRandom = useCallback(() => {
    if (songs.length <= 1) return;
    let r;
    do { r = Math.floor(Math.random() * songs.length); } while (r === currentSongIndex);
    setCurrentSongIndex(r);
  }, [songs.length, currentSongIndex]);

  const next = useCallback(() => {
    if (isShuffle) { playRandom(); return; }
    setCurrentSongIndex(i => (i + 1) % songs.length);
  }, [isShuffle, playRandom, songs.length]);

  const prev = useCallback(() => {
    if (isShuffle) { playRandom(); return; }
    setCurrentSongIndex(i => (i - 1 + songs.length) % songs.length);
  }, [isShuffle, playRandom, songs.length]);

  const playSong = useCallback((index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  }, []);

  const toggleShuffle = useCallback(() => setIsShuffle(s => !s), []);
  const cycleRepeat = useCallback(() => setRepeatMode(m => (m + 1) % 3), []);

  return {
    audioRef, currentSong, currentSongIndex, isPlaying, currentTime, duration,
    volume, speed, isShuffle, repeatMode,
    play, pause, togglePlay, seek, setVolume, setSpeed,
    next, prev, playSong, toggleShuffle, cycleRepeat
  };
}
