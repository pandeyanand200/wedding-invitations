'use client';

import { useEffect, useRef, useState } from 'react';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
  const audio = new Audio('/music/wedding-song.mp4');

  audio.loop = true;
  audio.volume = 0.35;

  audioRef.current = audio;

  audio.addEventListener('canplaythrough', () => {
    setIsLoaded(true);

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.log('Autoplay blocked:', err);
      });
  });

  return () => {
    audio.pause();
    audio.src = '';
   };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
    setShowTooltip(false);
  };

  return (
    <>
      <style>{`
        @keyframes music-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(180, 130, 90, 0.5); }
          50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(180, 130, 90, 0); }
        }
        @keyframes bar1 {
          0%, 100% { height: 6px; }
          50% { height: 18px; }
        }
        @keyframes bar2 {
          0%, 100% { height: 16px; }
          50% { height: 6px; }
        }
        @keyframes bar3 {
          0%, 100% { height: 10px; }
          50% { height: 20px; }
        }
        @keyframes bar4 {
          0%, 100% { height: 18px; }
          50% { height: 8px; }
        }
        @keyframes tooltip-in {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .music-btn {
          position: fixed;
          bottom: 32px;
          right: 32px;
          z-index: 1000;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, #c9a96e 0%, #8b5e3c 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(140, 94, 60, 0.45);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          outline: none;
        }
        .music-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 28px rgba(140, 94, 60, 0.6);
        }
        .music-btn.playing {
          animation: music-pulse 2s ease-in-out infinite;
        }
        .music-btn::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 2px solid rgba(201, 169, 110, 0.5);
          animation: music-pulse 2s ease-in-out infinite;
          pointer-events: none;
        }
        .music-btn.paused::before {
          animation: none;
          opacity: 0;
        }
        .bars-container {
          display: flex;
          align-items: center;
          gap: 3px;
          height: 24px;
        }
        .bar {
          width: 3px;
          border-radius: 2px;
          background: #fff;
          transition: height 0.3s ease;
        }
        .bar-1 { height: 6px; }
        .bar-2 { height: 16px; }
        .bar-3 { height: 10px; }
        .bar-4 { height: 18px; }
        .playing .bar-1 { animation: bar1 0.8s ease-in-out infinite; }
        .playing .bar-2 { animation: bar2 0.8s ease-in-out infinite 0.15s; }
        .playing .bar-3 { animation: bar3 0.8s ease-in-out infinite 0.3s; }
        .playing .bar-4 { animation: bar4 0.8s ease-in-out infinite 0.45s; }
        .music-tooltip {
          position: fixed;
          bottom: 40px;
          right: 96px;
          background: rgba(30, 20, 10, 0.88);
          color: #f5e6d0;
          font-family: var(--font-lato, sans-serif);
          font-size: 13px;
          letter-spacing: 0.03em;
          padding: 8px 14px;
          border-radius: 8px;
          white-space: nowrap;
          pointer-events: none;
          z-index: 999;
          animation: tooltip-in 0.4s ease;
          border: 1px solid rgba(201, 169, 110, 0.3);
        }
        .music-tooltip::after {
          content: '';
          position: absolute;
          right: -7px;
          top: 50%;
          transform: translateY(-50%);
          border: 7px solid transparent;
          border-left-color: rgba(30, 20, 10, 0.88);
          border-right: none;
        }
      `}</style>

      {showTooltip && !isPlaying && (
        <div className="music-tooltip">🎵 Play wedding music</div>
      )}

      <button
        id="music-toggle-btn"
        className={`music-btn ${isPlaying ? 'playing' : 'paused'}`}
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        title={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <div className="bars-container">
            <div className="bar bar-1" />
            <div className="bar bar-2" />
            <div className="bar bar-3" />
            <div className="bar bar-4" />
          </div>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        )}
      </button>
    </>
  );
}
