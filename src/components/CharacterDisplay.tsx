import { motion } from "framer-motion";

export type CostumeSlot = "head" | "body" | "legs" | "accessory";

export interface EquippedCostume {
  head: string;
  body: string;
  legs: string;
  accessory: string;
}

interface CharacterDisplayProps {
  equipped: EquippedCostume;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

const sizeClasses = {
  sm: { wrap: "w-28 h-44", head: "text-3xl", body: "text-4xl", legs: "text-3xl", acc: "text-xl" },
  md: { wrap: "w-44 h-64", head: "text-5xl", body: "text-6xl", legs: "text-5xl", acc: "text-3xl" },
  lg: { wrap: "w-56 h-80", head: "text-6xl", body: "text-7xl", legs: "text-6xl", acc: "text-4xl" },
};

const show = (c: string) => c && c !== "none" && c !== "❓";

const CharacterDisplay = ({ equipped, size = "md", animate = true }: CharacterDisplayProps) => {
  const s = sizeClasses[size];

  return (
    <motion.div
      className={`${s.wrap} relative flex flex-col items-center justify-center select-none`}
      animate={animate ? { y: [0, -6, 0] } : undefined}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    >
      {show(equipped.accessory) && (
        <span className={`${s.acc} absolute right-2 top-2`}>{equipped.accessory}</span>
      )}
      <span className={s.head}>{show(equipped.head) ? equipped.head : "🙂"}</span>
      <span className={s.body}>{show(equipped.body) ? equipped.body : "👕"}</span>
      <span className={s.legs}>{show(equipped.legs) ? equipped.legs : "👖"}</span>
    </motion.div>
  );
};

export default CharacterDisplay;
