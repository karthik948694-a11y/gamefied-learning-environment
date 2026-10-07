import { useState, useEffect, useRef, useCallback } from "react";

const BG_MUSIC_URL = "https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3";

export const useBackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(() => {
    return localStorage.getItem("bg-music") === "true";
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(BG_MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.15;
    audioRef.current = audio;

    if (isPlaying) {
      audio.play().catch(() => {});
    }

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("bg-music", String(isPlaying));
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const toggle = useCallback(() => setIsPlaying((p) => !p), []);

  return { isPlaying, toggle };
};
