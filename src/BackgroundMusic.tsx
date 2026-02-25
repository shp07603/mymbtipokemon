import React, { useState, useRef, useEffect } from 'react';

const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Autoplay prevented:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    // Attempt to play on mount if possible (usually restricted)
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
    }
  }, []);

  return (
    <div className="music-toggle-container">
      <audio
        ref={audioRef}
        src="/music.mp3"
        loop
      />
      <button 
        className={`music-toggle-btn ${isPlaying ? 'playing' : 'paused'}`}
        onClick={toggleMusic}
        aria-label="Toggle Background Music"
      >
        <span className="material-symbols-outlined">
          {isPlaying ? 'volume_up' : 'volume_off'}
        </span>
        <div className="music-waves">
          <span className="wave"></span>
          <span className="wave"></span>
          <span className="wave"></span>
        </div>
      </button>
    </div>
  );
};

export default BackgroundMusic;
