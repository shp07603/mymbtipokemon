import React, { useState, useRef, useEffect } from 'react';

const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
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
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          // Most browsers block autoplay without user interaction
          console.log("Autoplay blocked by browser. Music will start after user interaction.", error);
          // Keep isPlaying as true so the UI shows it's "on", 
          // but it will actually play when the user clicks something.
        });
      }
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
