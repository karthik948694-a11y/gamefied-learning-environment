import { motion, AnimatePresence } from "framer-motion";
import {
  animalGuides,
  getGuideMessage,
  type AnimalId,
  type GuideMood,
} from "@/lib/animalGuides";

const toneClass: Record<string, string> = {
  sky: "kid-tile-sky",
  peach: "kid-tile-peach",
  mint: "kid-tile-mint",
  lilac: "kid-tile-lilac",
  sun: "kid-tile-sun",
};

const sizeMap = {
  sm: { emoji: "text-4xl", pad: "px-3 py-2", text: "text-sm" },
  md: { emoji: "text-6xl", pad: "px-4 py-3", text: "text-base" },
  lg: { emoji: "text-7xl sm:text-8xl", pad: "px-5 py-4", text: "text-lg" },
};

export interface AnimalGuideProps {
  animal?: AnimalId;
  mood?: GuideMood;
  /** overrides the personality message */
  message?: string;
  /** varies which stock line is picked (e.g. question index) */
  seed?: number;
  size?: keyof typeof sizeMap;
  /** place the speech bubble above the animal instead of beside it */
  vertical?: boolean;
  showName?: boolean;
  className?: string;
}

const AnimalGuide = ({
  animal = "lion",
  mood = "greet",
  message,
  seed = 0,
  size = "md",
  vertical = false,
  showName = true,
  className = "",
}: AnimalGuideProps) => {
  const guide = animalGuides[animal];
  const s = sizeMap[size];
  const text = message ?? getGuideMessage(animal, mood, seed);

  const bounce =
    mood === "correct" || mood === "celebrate"
      ? { y: [0, -14, 0], rotate: [0, -6, 6, 0] }
      : mood === "wrong"
      ? { x: [0, -6, 6, 0] }
      : { y: [0, -6, 0] };

  return (
    <div
      className={`flex ${vertical ? "flex-col" : "flex-row"} items-center justify-center gap-3 ${className}`}
    >
      <motion.div
        className={`${s.emoji} leading-none select-none`}
        animate={bounce}
        transition={{ duration: mood === "greet" ? 2.4 : 0.8, repeat: mood === "greet" ? Infinity : 0 }}
        aria-hidden="true"
      >
        {guide.emoji}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={text}
          initial={{ opacity: 0, scale: 0.85, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className={`kid-tile ${toneClass[guide.tone]} rounded-3xl ${s.pad} max-w-xs text-center`}
        >
          {showName && (
            <p className="font-display text-xs font-bold uppercase tracking-wide text-muted-foreground">
              {guide.name} · {guide.title}
            </p>
          )}
          <p className={`font-body font-semibold text-foreground ${s.text}`}>{text}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnimalGuide;
