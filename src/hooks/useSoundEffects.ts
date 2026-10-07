import { useCallback, useRef } from "react";

const SOUND_URLS: Record<string, string> = {
  correct: "https://cdn.pixabay.com/audio/2022/03/10/audio_c8b8702b02.mp3",
  wrong: "https://cdn.pixabay.com/audio/2022/03/15/audio_7625e92af0.mp3",
  victory: "https://cdn.pixabay.com/audio/2021/08/04/audio_0625c1539c.mp3",
  click: "https://cdn.pixabay.com/audio/2022/03/10/audio_2dde668d05.mp3",
  levelUp: "https://cdn.pixabay.com/audio/2024/11/10/audio_45e81e8502.mp3",
};

export const useSoundEffects = () => {
  const audioCache = useRef<Record<string, HTMLAudioElement>>({});

  const play = useCallback((sound: keyof typeof SOUND_URLS) => {
    try {
      const url = SOUND_URLS[sound];
      if (!url) return;

      if (!audioCache.current[sound]) {
        audioCache.current[sound] = new Audio(url);
        audioCache.current[sound].volume = 0.4;
      }

      const audio = audioCache.current[sound];
      audio.currentTime = 0;
      audio.play().catch(() => {});
    } catch {
      // Silently fail - sounds are non-critical
    }
  }, []);

  return { play };
};
